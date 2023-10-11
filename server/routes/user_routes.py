from flask import Blueprint
from controllers.user_controller import UserController

user_bp = Blueprint('user', __name__)


@user_bp.route('/register', methods=['POST', 'GET'])
def register_user():
    return UserController.register_user()


@user_bp.route('/signin', methods=['GET', 'POST'])
def sign_in_user():
    return UserController.log_in_user()


@user_bp.route('/verify', methods=['GET', 'POST'])
def verify_user():
    return UserController.verfiy_user()


@user_bp.route('/forgotpassword', methods=['GET', 'POST'])
def forgot_password():
    return UserController.forgot_password()

@user_bp.route('/updatepassword', methods=['GET', 'POST'])
def update_password():
    return UserController.update_password()