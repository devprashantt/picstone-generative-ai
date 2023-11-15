from flask import Blueprint
from controllers.user_controller import UserController
from utils import session_tools

user_bp = Blueprint('user', __name__)


@user_bp.route('/register', methods=['POST'])
def register_user():
    return UserController.register_user()


@user_bp.route('/signin', methods=['POST'])
def sign_in_user():
    return UserController.log_in_user()


@user_bp.route('/user-data', methods=['GET'])
@session_tools.requires_user_session
def get_user(validated_user):
    return UserController.get_user(validated_user)


@user_bp.route('/verify', methods=['GET', 'POST'])
def verify_user():
    return UserController.verfiy_user()


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
