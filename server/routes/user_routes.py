from flask import Blueprint
from controllers.user_controller import UserController

user_bp = Blueprint('user', __name__)


@user_bp.route('/register', methods=['POST', 'GET'])
def register_user():
    return UserController.register_user()


@user_bp.route('/signin', methods=['GET', 'POST'])
def sign_in_user():
    return UserController.log_in_user()
