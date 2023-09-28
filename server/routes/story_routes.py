from flask import Blueprint, request, jsonify
from controllers.story_controller import StoryController

story_bp = Blueprint('generate-story', __name__)


@story_bp.route('/generate-story', methods=['POST'])
def generate_story():
    return StoryController.generate_story_from_image()


@story_bp.route('/generate-story', methods=['GET'])
def generate_story_get():
    return StoryController.get_all_stories()
