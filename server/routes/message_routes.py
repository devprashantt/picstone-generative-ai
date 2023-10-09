from flask import Blueprint, request, jsonify
from controllers.message_controller import MessageController

message_bp = Blueprint('send-message', __name__)


@message_bp.route('/send-message', methods=['POST', 'GET'])
def send_sms():
    return MessageController.send_message()
