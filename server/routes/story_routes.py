from flask import Blueprint, request, jsonify
from controllers.story_controller import StoryController
from utils import session_tools

story_bp = Blueprint('generate-story', __name__)


@story_bp.route('/generate-story', methods=['POST'])
def generate_story():
    return StoryController.generate_story_from_image()


@story_bp.route('/generate-story', methods=['GET'])
def generate_story_get():
    return StoryController.get_all_stories()


@story_bp.route('/generate-story/<story_id>', methods=['GET'])
def get_story(story_id):
    return StoryController.get_story(story_id)

@story_bp.route('/story-ids', methods=['GET'])
def get_story_ids():
    return StoryController.get_all_story_ids()

@story_bp.route('/user-stories', methods=['GET'])
@session_tools.requires_user_session
def get_user_stories(validated_user):
    return StoryController.get_user_stories()
