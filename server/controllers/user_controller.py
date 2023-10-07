from flask import request, jsonify, make_response
from config.database import db
from models.user import User
import uuid
import bcrypt
from utils import session_tools

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
    
    #TODO sanitize password for validity ex: length, number, ...
    @classmethod
    def register_user():
        payload = request.get_json()
        email = payload.get('email')
        name = payload.get('name')
        password = payload.get('password')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        try:
            query = 'INSERT INTO users (email, name, password_hash, salt) VALUES (%s,%s,%s,%s)'
            #TODO finish this 
        except:
            return 'could not register user', 400
        return 'user has been registered in', 200
    
    @classmethod
    def log_in_user():
        payload = request.get_json()
        email = payload.get('email')
        password = payload.get('password')
        try:
            query='SELECT password, password_hash FROM users where email = %s;'
            stored_hash = ''
            stored_salt = ''
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), stored_salt)
            #TODO might be a type issue (bytes vs string) 
            if hashed_password == stored_hash: 
                session_token = str(uuid.uuid4())
                #save this session token in DB
                session_tools.establish_session(email, session_token)
                response = make_response('session established')
                response.set_cookie('session_token', session_token, max_age=36000)
                return response
            else:
                return 'invalid', 400
        except:
            return 'password invalid', 400
