from flask import Blueprint
from controllers.theme_controller import ThemeController

theme_bp = Blueprint('theme', __name__)


@theme_bp.route('/stories/<theme>', methods=['GET'])
def get_theme_story(theme):
    return ThemeController.get_all_theme_story(theme)
