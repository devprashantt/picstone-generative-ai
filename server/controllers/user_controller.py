from flask import request, jsonify, make_response, render_template, current_app
from flask_mail import Message
from config.database import db
from models.user import User
import uuid
import bcrypt
import os
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
            verification_key = str(uuid.uuid4())
            data = (email, name, hashed_password, salt, verification_key)
            db.engine.execute(query, data)

            parameterized_url = f"{os.environ.get('BACKEND_URL')}/verify?token={verification_key}"
            email_content = render_template('verification_email.html', name=name, path=parameterized_url )
            msg = Message("Picstone: Verify Email",
                        sender="picstoneai@gmail.com",
                        recipients=[email])
            msg.html = email_content
            current_app.mail.send(msg)
            return 'success', 200
        except:
            return 'could not register user', 400
    
    @classmethod
    def log_in_user(cls):
        payload = request.get_json()
        email = payload.get('email')
        password = payload.get('password')
        if not cls.is_user_verified(email):
            return 'user is not verified', 400

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
                session_tools.establish_session(email, session_token)
                response = make_response('session established')
                response.set_cookie(
                    'session_token', session_token, max_age=36000, 
                    secure=True, httponly=True, samesite='None')
                return response
            else:
                return 'invalid', 400
        except Exception as e:
            return f'invalid: {e}', 400
        
    @classmethod
    def verfiy_user(cls):
        verification_token = request.args.get('token',None,str)
        if not verification_token:
            return 'could not verify user', 400
        try:
            query = 'SELECT email from user where verification_id = %s;'
            data = (verification_token)
            values = db.engine.execute(query, data)
            row = values.fetchone()
        except:
            return 'invalid request', 400
        if not row:
            return 'invalid token', 400
        try:
            query = "UPDATE user SET verification_id = 'verified' where email = %s;"
            data = (row.email)
            db.engine.execute(query, data)
            return 'user verified', 200
        except:
            return 'invalid token', 400

    def is_user_verified(email):
        query = 'SELECT verification_id from user where email = %s;'
        data = (email,)
        values = db.engine.execute(query, data)
        row = values.fetchone()
        if row.verification_id == 'verified':
            return True
        else:
            return False
