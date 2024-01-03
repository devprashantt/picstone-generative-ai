from flask import jsonify, request

from models.story import Story


class ThemeController:
    # Get story by theme
    @staticmethod
    def get_all_theme_story(theme):
        try:
            stories = Story.query.filter_by(theme=theme)
            story_list = []
            for story in stories:
                story_list.append(story.to_dict())
            return jsonify({'stories': story_list, 'msg': "Successfully fetched all data!!"}), 200
        except Exception as e:
            return f'invalid: {e}', 400
