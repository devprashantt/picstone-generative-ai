from flask import Blueprint
from controllers.tags_controller import TagsController

tags_bp = Blueprint('tags', __name__)


@tags_bp.route('/tags', methods=['GET'])
def get_all_tags():
    return TagsController.get_all_tags()


@tags_bp.route('/tags/<tag_name>', methods=['GET'])
def get_story_by_tag(tag_name):
    return TagsController.get_story_by_tag(tag_name)


@tags_bp.route('/tags/search/<search_term>', methods=['GET'])
def get_tags_by_search(search_term):
    return TagsController.get_tags_by_search(search_term)
