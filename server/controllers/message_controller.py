from flask import request, jsonify, current_app

# FLASK_MAIL
from flask_mail import Message


# CONFIG
from config.database import db
# s


class MessageController:
    @staticmethod
    def send_message():
        # Get data from the request body
        # data = request.get_json()

        # # Get email from data
        # sender_email = data.get('email')

        # # Get name from data
        # sender_name = data.get('name')

        sender_name = 'Aidan'
        sender_email = 'picstoneai@gmail.com'

        # Set recipients
        recipients = "aidan.canavan3@gmail.com"

        try:
            # Create a message
            message = Message('New Message from ' + sender_name + 'received from your picstone website',
                              sender=sender_email, recipients=[recipients])

            # Set the email body
            message.body = "hello this is a test"

            # Send the email
            current_app.mail.send(message)

            return jsonify({'message': 'Message sent successfully', "data": 'test'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
