from flask import jsonify, request

from models.story import Story
from models.image import Image


class ThemeController:
    # Get story by theme
    @staticmethod
    def get_all_theme_story(theme):
        try:
            print(theme)

            # get all stories which have common theme in theme column
            stories = Story.query.filter(Story.theme == theme).all()

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
