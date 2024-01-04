from flask import jsonify, request
import random

# UTILS
from utils.themed_story import generate_themed_story

# MODELS
from models.story import Story
from models.image import Image

# CONFIG
from config.database import db


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

    # generate story from theme
    @staticmethod
    def generate_story_from_theme(theme):
        # Get images link from payload
        images_link = request.get_json()['images_link']

        # Get any random link from images link
        image_link = random.choice(images_link)

        # Generate story
        story = generate_themed_story(theme)

        # Store image in database
        new_image = Image(
            user_id=1080002,
            image_path=image_link,
        )

        try:
            db.session.add(new_image)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

        # Store story in database
        new_story = Story(
            user_id=1080002,
            image_id=new_image.id,
            story_content=story,
            story_title=theme.capitalize(),
            theme=theme,
            ai_content=theme,
            user_email="picstoneai@gmail.com"
        )

        try:
            db.session.add(new_story)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

        return jsonify({
            'story': story,
            'cloudinary_data': {
                'secure_url': image_link,
                'tags': [theme]
            }
        })
