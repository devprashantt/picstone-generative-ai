import random
from flask import request, jsonify
import requests
from io import BytesIO
import PIL.Image
import pytesseract
from utils.story_utils import check_keywords, extract_ai_content, extract_payload_data, extract_text_data, get_user_info, save_image, save_story, save_tags

# UTILS
from utils.upload_img import upload_image_to_cloudinary
from utils.generate_story import generate_story
from utils.analyze_tags import analyze_tags
from utils.themed_story import generate_themed_story
from utils.exceptions import *

# CONFIG
from config.database import db

# MODELS
from models.story import Story
from models.image import Image
from models.tags import Tags

# CONSTANTS
from constants.response_data import response_data
import constants.constant_data as CONSTANTS


class StoryController:
    # generate story from image old
    @staticmethod
    def generate_story_from_image():
        try:
            raw_payload = request.get_json()

            payload = extract_payload_data(raw_payload)

            # Get session token from cookie
            session_token = request.cookies.get('session_token')

            # Get user from session
            user_email = payload["user_email"]

            # Get the base64 image from the request body
            file = payload['file']

            # Create an array of themes where the value is true
            selected_themes = payload["selected_themes"]

            # Get the desc from the request body
            desc = payload['description']

            # Get the title from the request body
            title = payload['title']

            # Get the genre from the request body
            genre: str = payload["genre"]

            # Verify user session
            user_id, user_email = get_user_info(
                session_token=session_token,
                email=user_email,
            )

            # Extracted text to be updated after ocr
            image_text = ""

            # Extract ai content from image
            ai_content = ""

            # Analyze the tags
            tag_analysis = analyze_tags(
                # tags,
            )

            # Upload the image to Cloudinary
            cloudinary_data = upload_image_to_cloudinary(file)

            # Get the secure link from cloudinary
            cloudinary_link = cloudinary_data['secure_url']

            # Extract tags from the Cloudinary metadata
            cloudinary_tags = cloudinary_data['tags']

            ai_content = extract_ai_content(
                cloudinary_data=cloudinary_data,
            )

            # Extracted text from the image
            image_text = extract_text_data(
                cloudinary_data=cloudinary_data,
            )

            if not cloudinary_tags:
                raise INTERNAL_SERVER_ERROR_EXCEPTION(
                    message='No Cloudinary-generated tags found')

            # check keywords
            check_keywords(
                title=title,
                desc=desc,
                tags=cloudinary_data,
                genre=genre,
            )

            # Generate a story based on the Cloudinary-generated tags
            story = generate_story(
                tags=cloudinary_tags,
                tag_analysis=tag_analysis,
                image_text=image_text,
                story_title=title,
                ai_content=ai_content,
                desc=desc,
                theme=selected_themes,
            )

            new_image = Image(
                user_id=user_id,
                image_path=cloudinary_data["secure_url"],
            )

            # Save the image in the "images" table
            save_image(
                new_image
            )

            # Retrieve the ID of the newly saved image
            image_id = new_image.id

            # Create a new Story instance and set its attributes
            new_story = Story(
                user_id=user_id,
                user_email=user_email,
                image_id=image_id,
                story_content=story,
                story_title=title,
                ai_content=ai_content,
                theme=','.join(selected_themes),
                genre=genre
            )

            save_story(new_story)

            # Retrieve the ID of the newly saved story
            story_id = new_story.id

            # Join the tags into a string
            tags_string = ','.join(cloudinary_tags)

            # Store tags_string in the database
            new_tags = Tags(
                story_id=story_id,
                image_id=image_id,
                tags_string=tags_string,
            )

            save_tags(new_tags)

            return jsonify({
                'story': story,
                'img_text': image_text,
                'ai_content': ai_content,
                'cloudinary_data': {
                    'secure_url': cloudinary_link,
                    'tags': cloudinary_tags
                }
            }), 200

        except INTERNAL_SERVER_ERROR_EXCEPTION as e:
            return jsonify({"error": e.message}), e.error

        except BAD_REQUEST_EXCEPTION as e:
            return jsonify({"error": e.message}), e.error

        except Exception as e:
            # Handle exceptions and return an error response
            # get all stories
            return jsonify({'Error during story generation': str(e)}), 500

     # get all stories
    @staticmethod
    def get_all_stories():
        try:
            # Retrieve all stories from the database
            stories = Story.query.all()

            # Convert the stories into the format we want
            stories_list = []
            for story in stories:
                # Retrieve the associated image for each story
                image = Image.query.get(story.image_id)
                if image:
                    image_url = image.image_path
                else:
                    image_url = None

                stories_list.append({
                    'id': story.id,
                    'user_id': story.user_id,
                    'story_title': story.story_title,
                    'image_url': image_url,
                    'story_content': story.story_content,
                    'created_at': story.created_at
                })

            return jsonify({'stories': stories_list, "message": "Stories data fetched successfully"})

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})

    # get story page
    @staticmethod
    def get_story_page(page):
        try:
            # Retrieve all stories from the database in desc by date
            stories = Story.query.order_by(
                Story.created_at.desc()).paginate(page=page, per_page=12).items

            # Convert the stories into the format we want
            stories_list = []
            for story in stories:
                # Retrieve the associated image for each story
                image = Image.query.get(story.image_id)
                if image:
                    image_url = image.image_path
                else:
                    image_url = None

                stories_list.append({
                    'id': story.id,
                    'user_id': story.user_id,
                    'story_title': story.story_title,
                    'image_url': image_url,
                    'story_content': story.story_content,
                    'created_at': story.created_at
                })

            return jsonify({'stories': stories_list, "message": "Stories data fetched successfully"})

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})

    # search story
    @staticmethod
    def search_story(search_term):
        try:
            # Retrieve all stories from the database in desc by date
            stories = Story.query.filter(
                Story.story_title.ilike(f'%{search_term}%')).all()

            # Convert the stories into the format we want
            stories_list = []
            for story in stories:
                # Retrieve the associated image for each story
                image = Image.query.get(story.image_id)
                if image:
                    image_url = image.image_path
                else:
                    image_url = None

                stories_list.append({
                    'id': story.id,
                    'user_id': story.user_id,
                    'story_title': story.story_title,
                    'image_url': image_url,
                    'story_content': story.story_content,
                    'created_at': story.created_at
                })

            return jsonify({'stories': stories_list, "message": "Stories data fetched successfully"})

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})

    # Get story by id
    @staticmethod
    def get_story(story_id):
        print("Getting story with id: ", story_id)
        try:
            # Retrieve the story from the database
            story = Story.query.get(story_id)

            # Check if the story exists
            if not story:
                return jsonify({'error': 'Story not found'})

            # Retrieve the associated image for the story
            image = Image.query.get(story.image_id)
            if image:
                image_url = image.image_path
            else:
                image_url = None

            # Retrieve the associated tags for the story as a single string
            tags_string = db.session.query(Tags.tags_string).filter(
                Tags.story_id == story_id).first()

            # Split the tags string into individual tags using comma as the delimiter
            if tags_string:
                tag_list = [tag.strip() for tag in tags_string[0].split(',')]
            else:
                tag_list = []

            # Convert the story into the format we want, including tags
            story_data = {
                'id': story.id,
                'user_id': story.user_id,
                'image_url': image_url,
                'story_content': story.story_content,
                'story_title': story.story_title,
                'created_at': story.created_at,
                'tags': tag_list
            }

            return jsonify({'story': story_data})

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})

    # get number of stories
    @staticmethod
    def get_all_story_ids():
        query = "SELECT id FROM story ORDER BY created_at DESC;"
        return db.engine.execute(query).fetchall()

    # get user stories
    @staticmethod
    def get_user_stories(validated_user):
        # EDIT: The validated user is passed through the authentication decorator in router
        user_email = validated_user

        # Get user id from user table through email
        query = "SELECT id FROM users WHERE email = %s;"
        user_id = db.engine.execute(query, (user_email)).fetchone().id

        # Get stories from story table using id of user
        query = "SELECT * FROM story WHERE user_id = %s;"
        stories = db.engine.execute(query, (user_id)).fetchall()

        # Convert the stories into the format we want
        stories_list = []

        for story in stories:
            # Retrieve the associated image for each story
            image = Image.query.get(story.image_id)
            if image:
                image_url = image.image_path
            else:
                image_url = None

            stories_list.append({
                'id': story.id,
                'user_id': story.user_id,
                'story_title': story.story_title,
                'image_url': image_url,
                'story_content': story.story_content,
                'created_at': story.created_at
            })

        return jsonify({'stories': stories_list})

    # get public stories
    @staticmethod
    def get_public_user_stories(story_id):
        # Get user id from story table using story id
        query = "SELECT user_id FROM story WHERE id = %s;"
        user_id = db.engine.execute(query, (story_id)).fetchone().user_id

        # Get user details from user table using user id
        query = "SELECT name, email FROM users WHERE id = %s;"
        user = db.engine.execute(query, (user_id)).fetchone()

        # Get stories from story table using user id and limit to 3
        query = "SELECT * FROM story WHERE user_id = %s;"
        # limit stories to 3 and send it in descending order after story creation
        stories = db.engine.execute(query, (user_id)).fetchall()[:4]

        # Send user name, email and number of stories to frontend
        user_details = {
            'name': user.name,
            'email': user.email,
        }

        # Convert the stories into the format we want
        stories_list = []

        for story in stories:
            # Retrieve the associated image for each story
            image = Image.query.get(story.image_id)
            if image:
                image_url = image.image_path
            else:
                image_url = None

            stories_list.append({
                'id': story.id,
                'user_id': story.user_id,
                'story_title': story.story_title,
                'image_url': image_url,
                'story_content': story.story_content,
                'created_at': story.created_at
            })

        return jsonify({'stories': stories_list, 'user_details': user_details})

    # delete a story
    @staticmethod
    def delete_story(story_id):
        try:
            # Retrieve the story from the database
            story = Story.query.get(story_id)

            # Check if the story exists
            if not story:
                return jsonify({'error': 'Story not found'})

            # Delete the story
            db.session.delete(story)
            db.session.commit()

            return jsonify({'message': 'Story deleted successfully'})

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})

    # update a story
    @staticmethod
    def update_story(story_id):
        try:
            # Retrieve the story from the database
            story = Story.query.get(story_id)

            # Check if the story exists
            if not story:
                return jsonify({'error': 'Story not found'})

            # Get the new story content from the request body
            new_story_content = request.get_json()['story_content']

            # Update the story content
            story.story_content = new_story_content

            # Commit the changes to the database
            db.session.commit()

            return jsonify({'message': 'Story updated successfully'})

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})
