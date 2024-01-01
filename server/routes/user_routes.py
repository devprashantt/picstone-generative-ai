from flask import Blueprint
from controllers.user_controller import UserController
from utils import session_tools

user_bp = Blueprint('user', __name__)


@user_bp.route('/register', methods=['POST'])
def register_user():
    return UserController.register_user()


@user_bp.route('/logout-user', methods=['POST'])
def logout_user():
    return UserController.logout_user()


@user_bp.route('/signin', methods=['POST'])
def sign_in_user():
    return UserController.log_in_user()


@user_bp.route('/user-data', methods=['GET'])
@session_tools.requires_user_session
def get_user(validated_user):
    return UserController.get_user(validated_user)


@user_bp.route('/verify', methods=['GET', 'POST'])
def verify_user():
    return UserController.verify_user()


@user_bp.route('/forgotpassword', methods=['GET', 'POST'])
def forgot_password():
    return UserController.forgot_password()


@user_bp.route('/updatepassword', methods=['POST'])
def update_password():
    return UserController.update_password()


@user_bp.route('/userstatus', methods=['POST', 'GET'])
@session_tools.requires_user_session
def user_access(validated_user):
    return UserController.user_access(validated_user)


@user_bp.route('/get_google_oauth_link', methods=['GET'])
def get_google_oauth_link():
    return UserController.get_google_oauth_link()


@user_bp.route('/handle_google_login_and_signup', methods=['POST'])
def handle_google_login_and_signup():
    return UserController.handle_google_login_and_signup()
