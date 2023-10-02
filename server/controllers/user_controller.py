from flask import request, jsonify
from config.database import db
from models.user import User


class UserController:
    # Create a new user
    @classmethod
    def create_user(cls):
        name = 'prashant'
        email = 'prashant@gmail.com'
        password = 'password'

        # Create a new user instance
        new_user = User(name=name, email=email, password=password)

        try:
            # Add the new user to the database
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'User created successfully'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
