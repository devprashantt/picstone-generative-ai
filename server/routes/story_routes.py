from flask import Blueprint, request, jsonify
from controllers.story_controller import StoryController
from utils.session_tools import requires_user_session

story_bp = Blueprint('generate-story', __name__)


@story_bp.route('/generate-story', methods=['POST'])
def generate_story():
    return StoryController.generate_story_from_image()


@story_bp.route('/generate-story/theme/<theme>', methods=['POST'])
def generate_story_from_theme(theme):
    return StoryController.generate_story_from_theme(theme)


@story_bp.route('/generate-story', methods=['GET'])
def get_all_stories():
    return StoryController.get_all_stories()


@story_bp.route('/generate-story/story/<story_id>', methods=['GET'])
def get_story(story_id):
    return StoryController.get_story(story_id)


@story_bp.route('/story-ids', methods=['GET'])
def get_story_ids():
    return StoryController.get_all_story_ids()


@story_bp.route('/generate-story/<int:page>', methods=['GET'])
def get_story_page(page):
    return StoryController.get_story_page(page)


@story_bp.route('/generate-story/search/<search_term>', methods=['GET'])
def search_story(search_term):
    return StoryController.search_story(search_term)


@story_bp.route('/user-stories', methods=['GET'])
@requires_user_session
def get_user_stories(validated_user):
    return StoryController.get_user_stories(validated_user)


@story_bp.route('/user-stories/public/<story_id>', methods=['GET'])
def get_public_user_stories(story_id):
    return StoryController.get_public_user_stories(story_id)
