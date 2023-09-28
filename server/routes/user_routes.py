from flask import Blueprint
from controllers.user_controller import UserController

user_bp = Blueprint('user', __name__)


@user_bp.route('/users', methods=['POST'])
def create_users():
    return UserController.create_user()
