from flask import request, jsonify, current_app

# FLASK_MAIL
from flask_mail import Message


# CONFIG
from config.database import db


class MessageController:
    @staticmethod
    def send_message():
        # Get data from the request body
        data = request.get_json()

        # Get email from data
        sender_email = data.get('email')

        # Get name from data
        sender_name = data.get('name')

        # Get message from body
        message_body = data.get('message')

        # Set recipients
        recipients = "picstoneai@gmail.com"

        try:
            # Create a message
            message = Message('New Message from ' + sender_name + 'received from your picstone website',
                              sender=sender_email, recipients=[recipients])

            # Set the email body
            message.body = message_body

            # Send the email
            current_app.mail.send(message)

            return jsonify({'message': 'Message sent successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
