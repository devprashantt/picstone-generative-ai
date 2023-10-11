from flask import request, jsonify, make_response, render_template, current_app
from flask_mail import Message
from config.database import db
from models.user import User
import uuid
import bcrypt
import os
import hashlib
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
            query = 'INSERT INTO users (email, name, password_hash, salt, verification_id) VALUES (%s,%s,%s,%s,%s);'
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
            query = 'SELECT password_hash, salt FROM users where email = %s;'
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
        
    def is_user_verified(email):
        query = 'SELECT verification_id from users where email = %s;'
        data = (email,)
        values = db.engine.execute(query, data)
        row = values.fetchone()
        if row.verification_id == 'verified':
            return True
        else:
            return False
        
    @classmethod
    def verfiy_user(cls):
        #TODO This route is timing attack vulnerable FIX -> hash the verification token
        verification_token = request.args.get('token',None,str)
        if not verification_token:
            return 'could not verify user', 400
        try:
            query = 'SELECT email from users where verification_id = %s;'
            data = (verification_token)
            values = db.engine.execute(query, data)
            row = values.fetchone()
        except:
            return 'invalid request', 400
        if not row:
            return 'invalid token', 400
        try:
            query = "UPDATE users SET verification_id = 'verified' where email = %s;"
            data = (row.email)
            db.engine.execute(query, data)
            return 'user verified', 200
        except:
            return 'invalid token', 400


    
    @classmethod
    def forgot_password(cls):
        payload = request.get_json()
        email = payload.get('email')
        forgot_password_key = str(uuid.uuid4())
        hasher = hashlib.sha256()
        hasher.update(forgot_password_key.encode('utf-8'))
        forgot_password_hash = hasher.hexdigest()
        try:
            query =  "UPDATE users SET forgot_password_token = %s WHERE email = %s;"
            db.engine.execute(query,(forgot_password_hash,email))
        except:
            return 'connection error', 400
        try:
            # TODO URL needs to point to a frontend route that can take query parameter
            parameterized_url = f"{os.environ.get('FRONTEND_URL')}/updatepassword?token={forgot_password_key}"
            email_content = render_template('verification_email.html', path=parameterized_url )
            msg = Message("Picstone: Forgot Password",
                        sender="picstoneai@gmail.com",
                        recipients=[email])
            msg.html = email_content
            current_app.mail.send(msg)
            return "email sent to inbox", 200
        except:
            return 'email invalid, try again', 400

    @classmethod
    def update_password(cls):
        token = request.args.get('token',None, str)
        if not token:
            return 'no token provided', 400
        hasher = hashlib.sha256()
        hasher.update(token.encode('utf-8'))
        token_hash =  hasher.hexdigest()
        payload = request.get_json()
        new_password = payload.get('password')
        if not new_password:
            return 'no new password supplied'
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), salt)
        try:
            query = "UPDATE users SET password_hash = %s, salt = %s, forgot_password_token = NULL WHERE forgot_password_token = %s;"
            db.engine.execute(query,(hashed_password, salt, token_hash))
            return 'password updated',200
        except:
            'could not update password', 400
