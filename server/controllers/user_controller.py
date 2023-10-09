from flask import request, jsonify, make_response
from config.database import db
from models.user import User
import uuid
import bcrypt
from utils import session_tools


class UserController:
    # Create a new user
    # TODO sanitize password for validity ex: length, number, ...
    @classmethod
    def register_user(cls):
        payload = request.get_json()
        email = payload.get('email')
        name = payload.get('name')
        password = payload.get('password')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        try:
            query = 'INSERT INTO user (email, name, password_hash, salt, verification_id) VALUES (%s,%s,%s,%s,%s);'
            data = (email, name, hashed_password, salt, str(uuid.uuid4()))
            db.engine.execute(query, data)
            return 'success', 200
        except:
            return 'could not register user', 400

    @classmethod
    def log_in_user(cls):
        payload = request.get_json()
        email = payload.get('email')
        password = payload.get('password')
        # password = "password"
        # email = "aidan@gmail.com"
        try:
            query = 'SELECT password_hash, salt FROM user where email = %s;'
            data = (email,)
            values = db.engine.execute(query, data)

            row = values.fetchone()
            stored_salt = row.salt
            stored_hash = row.password_hash
            hashed_password = bcrypt.hashpw(
                password.encode('utf-8'), stored_salt.encode('utf-8'))
            if hashed_password == stored_hash.encode('utf-8'):
                session_token = str(uuid.uuid4())
                # save this session token in DB
                session_tools.establish_session(email, session_token)
                response = make_response('session established')
                response.set_cookie(
                    'session_token', session_token, max_age=36000, 
                    secure=True, httponly=True, samesite='None',
                    domain='.vercel.app')
                return response
            else:
                return 'invalid', 400
        except Exception as e:
            return f'invalid: {e}', 400
        
    @classmethod
    def verfiy_user():
        print('verify user')
        
