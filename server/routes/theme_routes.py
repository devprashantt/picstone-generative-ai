from flask import Blueprint
from controllers.theme_controller import ThemeController

theme_bp = Blueprint('theme', __name__)


@theme_bp.route('/stories/<theme>', methods=['GET'])
def get_theme_story(theme):
    return ThemeController.get_all_theme_story(theme)


@theme_bp.route('/stories/<theme>', methods=['POST'])
def generate_story_from_theme(theme):
    return ThemeController.generate_story_from_theme(theme)
