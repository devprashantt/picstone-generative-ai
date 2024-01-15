import random
from flask import request, jsonify
from utils.story_utils import save_image, save_story

# UTILS
from utils.themed_story import generate_themed_story
from utils.exceptions import *

# CONFIG
from config.database import db

# MODELS
from models.story import Story
from models.image import Image

# CONSTANTS
import constants.constant_data as CONSTANTS


class ThemeController:
    # Get story by theme
    @staticmethod
    def get_all_theme_story(theme):
        try:
            # get all stories which have common theme in theme column in reverse order
            stories = Story.query.filter(Story.theme.like(
                f'%{theme}%')).order_by(Story.created_at.desc()).all()

            # save all stories
            stories_list = []

            # loop through all stories
            for story in stories:
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

            return jsonify(
                {
                    'status': 'success',
                    'stories': stories_list
                }
            ), 200

        except Exception as e:
            return f'invalid: {e}', 400

    # Generate story from theme
    @staticmethod
    def generate_story_from_theme(theme):
        try:

            payload = request.get_json()

            genre = payload.get("genre", CONSTANTS.DEFAULT_GENRE)

            # Get images link from payload
            images_link = payload['images_link']

            # Get any random link from images link
            image_link = random.choice(images_link)

            # Generate story
            story = generate_themed_story(theme)

            # Store image in database
            new_image = Image(
                user_id=CONSTANTS.DEFAULT_USER_ID_IMAGE,
                image_path=image_link,
            )

            save_image(new_image=new_image)

            # Store story in database
            new_story = Story(
                user_id=CONSTANTS.DEFAULT_USER_ID_IMAGE,
                image_id=new_image.id,
                story_content=story,
                story_title=theme,
                theme=theme,
                ai_content=CONSTANTS.DEFAULT_AI_CONTENT,
                user_email=CONSTANTS.DEFAULT_USER_EMAIL,
                genre=genre,
            )

            save_story(new_story)

            return jsonify({
                'story': story,
                'cloudinary_data': {
                    'secure_url': images_link,
                    'tags': [theme]
                }
            })

        except INTERNAL_SERVER_ERROR_EXCEPTION as e:
            return jsonify({"error": e.message}), e.error

        except BAD_REQUEST_EXCEPTION as e:
            return jsonify({"error": e.message}), e.error

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error during story generation': str(e)}), 500
