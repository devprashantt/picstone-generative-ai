import random
from flask import request, jsonify
import requests
from io import BytesIO
import PIL.Image
import pytesseract

# UTILS
from utils.upload_img import upload_image_to_cloudinary
from utils.generate_story import generate_story
from utils.analyze_tags import analyze_tags
from utils.themed_story import generate_themed_story

# CONFIG
from config.database import db


# MODELS
from models.story import Story
from models.image import Image
from models.tags import Tags

# CONSTANTS
from constants.response_data import response_data


class StoryController:
    # generate story from image old
    @staticmethod
    def generate_story_from_image():
        try:
            payload = request.get_json()

            # Get session token from cookie
            session_token = request.cookies.get('session_token')

            # Verify user session
            if session_token:
                # Get email from session
                query = "SELECT email FROM sessions WHERE session_token = %s;"
                user_email = db.engine.execute(
                    query, (session_token)).fetchone().email

                # Get user_id from email
                query = "SELECT id FROM users WHERE email = %s;"
                user_id = db.engine.execute(query, (user_email)).fetchone().id
            else:
                # Get user email when its is not logged in
                user_email = payload['email']
                # Set user id
                user_id = 1080002

            # Get the base64 image from the request body
            file = payload['file']

            # Get theme from the request body: themes {romance: true, horror: false, comedy: false}
            themes = payload['themes']

            # Create an array of themes where the value is true
            selected_themes = [theme for theme,
                               value in themes.items() if value]

            # Get the desc from the request body
            desc = payload['description']

            # Get the title from the request body
            title = payload['title']

            # Extracted text to be updated after ocr
            image_text = ""

            # Extract ai content from image
            ai_content = ""

            # If sex word found in title return
            if 'sex' in title.lower():
                return jsonify({'error': f"Found '{title}' in title. Can't generate using this title"}), 500

            # Tags for analysis
            tags = ['happy', 'sad', 'calm', 'exciting', 'positive',
                    'negative', 'neutral', 'uplifting', 'romantic', 'mysterious']

            # Analyze the tags
            tag_analysis = analyze_tags(tags)

            # Upload the image to Cloudinary
            cloudinary_data = upload_image_to_cloudinary(file)

            # Get the secure link from cloudinary
            cloudinary_link = cloudinary_data['secure_url']

            # Extract tags from the Cloudinary metadata
            cloudinary_tags = cloudinary_data['tags']

            try:
                # Extract ai analysis from image
                if cloudinary_data["info"]["detection"]["captioning"]["status"] == "complete":
                    # Get ai content from data
                    ai_content = cloudinary_data["info"]["detection"]["captioning"]["data"]["caption"]
            except Exception as e:
                print("Exception occurs during ai content analysis:", e)

            # Extracted text from the image
            try:
                if cloudinary_data["info"]["ocr"]["adv_ocr"]["status"] == "complete":
                    # Get text data from data
                    image_text = cloudinary_data["info"]["ocr"]["adv_ocr"]["data"][0]["fullTextAnnotation"]["text"]
            except Exception as e:
                print("Exception occurs during text data extraction:", e)

            # List of keywords to check
            keywords_to_check = ['Sex', 'Brassiere', 'Porn', 'Rape']

            # Check if any of the keywords are present in the title
            for keyword in keywords_to_check:
                if keyword.lower() in title.lower():
                    # Handle the case when the keyword is found in the title
                    print(
                        f"Warning: Found '{keyword}' in title. Handle accordingly.")
                    # You can add your logic here to handle the specific keyword found
                    # For example, you can return an error response
                    return jsonify({'error': f"Found '{keyword}' in title. Can't proceed with this title"}), 400

            # Check if any of the keywords are present in the description
            for keyword in keywords_to_check:
                if keyword.lower() in desc.lower():
                    # Handle the case when the keyword is found in the description
                    print(
                        f"Warning: Found '{keyword}' in description. Handle accordingly.")
                    # You can add your logic here to handle the specific keyword found
                    # For example, you can return an error response
                    return jsonify({'error': f"Found '{keyword}' in description. Can't proceed with this description"}), 400

            # Check if any of the keywords are present in the tags
            for keyword in keywords_to_check:
                if keyword.lower() in [tag.lower() for tag in cloudinary_tags]:
                    # Handle the case when the keyword is found
                    print(
                        f"Warning: Found '{keyword}' in tags. Handle accordingly.")
                    # You can add your logic here to handle the specific keyword found
                    return jsonify({'error': f"Found '{keyword}' in tags. Can't generate using these tags"}), 400

            # Join the tags into a string
            tags_string = ','.join(cloudinary_tags)

            if not cloudinary_tags:
                return jsonify({'error': 'No Cloudinary-generated tags found'})

            # Generate a story based on the Cloudinary-generated tags
            story = generate_story(
                tags=cloudinary_tags,
                tag_analysis=tag_analysis,
                image_text=image_text,
                story_title=title,
                ai_content=ai_content,
                desc=desc,
                themes=selected_themes,
            )

            # Save the image in the "images" table
            new_image = Image(
                user_id=user_id,
                image_path=cloudinary_data['secure_url'],
            )

            try:
                db.session.add(new_image)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return jsonify({'error during saving image in database': str(e)}), 500

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
                theme=','.join(selected_themes)
            )

            try:
                # Add the new story to the database
                db.session.add(new_story)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return jsonify({'error during saving story on database': str(e)}), 500

            # Retrieve the ID of the newly saved story
            story_id = new_story.id

            # Store tags_string in the database
            new_tags = Tags(
                story_id=story_id,
                image_id=image_id,
                tags_string=tags_string
            )

            try:
                db.session.add(new_tags)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return jsonify({'error during saving tags in database': str(e)}), 500

            return jsonify({
                'story': story,
                'img_text': image_text,
                'ai_content': ai_content,
                'cloudinary_data': {
                    'secure_url': cloudinary_link,
                    'tags': cloudinary_tags
                }
            }), 200

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error during story generation': str(e)}), 500

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
