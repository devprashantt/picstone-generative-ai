from flask import request, jsonify, make_response, render_template, current_app
from flask_mail import Message
from config.database import db
import uuid
import bcrypt
import os
import requests
import hashlib
from utils import session_tools
from config.database import db


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
        except:
            return 'The email supplied is already in use', 409

        try:
            # parameterized_url = f"{os.environ.get('BACKEND_URL')}/verify?token={verification_key}"
            # email_content = render_template(
            #     'verification_email.html', name=name, path=parameterized_url)
            # msg = Message("Picstone: Verify Email",
            #               sender="picstoneai@gmail.com",
            #               recipients=[email])
            # msg.html = email_content
            # current_app.mail.send(msg)
            return jsonify({'msg': "Successfully registered user!!"}), 200
        except:
            db.engine.execute("Delete from users where email = %s;", (email))
            return 'Could not register user', 400

    @classmethod
    def log_in_user(cls):
        payload = request.get_json()
        email = payload.get('email')
        password = payload.get('password')

        # if not cls.is_user_verified(email):
        #     return 'user is not verified', 400

        try:
            query = 'SELECT password_hash, salt, id FROM users where email = %s;'
            data = (email,)
            values = db.engine.execute(query, data)
            row = values.fetchone()
            stored_hash = row.password_hash
            if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
                session_token = str(uuid.uuid4())
                session_tools.establish_session(email, session_token)
                response = make_response(
                    jsonify({'session_token': session_token,
                            'msg': "session established", "email": email, "user_id": row.id}), 200
                )
                response.set_cookie(
                    'session_token', session_token, max_age=36000,
                    secure=True, httponly=True, samesite='None')

                # Set user id cookie
                response.set_cookie(
                    'user_id', str(row.id), max_age=36000,
                    secure=True, httponly=True, samesite='None')

                return response
            else:
                return 'invalid', 400
        except Exception as e:
            return f'invalid: {e}', 400

    @staticmethod
    def get_user(validated_user):
        # Get info from validated user
        query = "SELECT * FROM users WHERE email = %s;"
        user = db.engine.execute(query, (validated_user)).fetchone()

        # Convert the user into the format we want
        user_data = {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'user_privledge': user.user_privledge
        }

        return jsonify({'user': user_data, 'msg': "Successfully fetched all data!!"}), 200

    def is_user_verified(email):
        query = 'SELECT verification_id from users where email = %s;'
        data = (email,)
        values = db.engine.execute(query, data)
        row = values.fetchone()
        try:
            if row.verification_id == 'verified':
                return True
            else:
                return False
        except:
            return False

    @classmethod
    def verfiy_user(cls):
        # TODO This route is timing attack vulnerable FIX -> hash the verification token
        verification_token = request.args.get('token', None, str)
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
            query = "UPDATE users SET forgot_password_token = %s WHERE email = %s;"
            db.engine.execute(query, (forgot_password_hash, email))
        except:
            return 'connection error', 400
        try:
            # TODO URL needs to point to a frontend route that can take query parameter
            parameterized_url = f"{os.environ.get('FRONTEND_URL')}/updatepassword?token={forgot_password_key}"
            email_content = render_template(
                'verification_email.html', path=parameterized_url)
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
        token = request.args.get('token', None, str)
        if not token:
            return 'no token provided', 400
        hasher = hashlib.sha256()
        hasher.update(token.encode('utf-8'))
        token_hash = hasher.hexdigest()
        payload = request.get_json()
        new_password = payload.get('password')
        if not new_password:
            return 'no new password supplied'
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), salt)
        try:
            query = "UPDATE users SET password_hash = %s, salt = %s, forgot_password_token = NULL WHERE forgot_password_token = %s;"
            db.engine.execute(query, (hashed_password, salt, token_hash))
            return 'password updated', 200
        except:
            'could not update password', 400

    @classmethod
    def user_access(cls, validated_user):
        return session_tools.get_privledge(validated_user), 200

    @classmethod
    def get_google_oauth_link(cls):
        GOOGLE_CLIENT_ID = os.environ.get('CLIENT_ID')
        GOOGLE_CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
        GOOGLE_REDIRECT_URI = os.environ.get('REDIRECT_URI')
        LANDING_URL = "http://localhost:5000"

        authorization_url = f'''https://accounts.google.com/o/oauth2/auth?client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&response_type=code&scope=openid+profile+email&prompt=consent'''
        # client side must handle redirecting to the oath link
        return jsonify(
            {'authorization_url': authorization_url, 'landing_url': LANDING_URL}
        )

    @classmethod
    def handle_google_login_and_signup(cls):

        code = request.args.get('code')

        GOOGLE_CLIENT_ID = os.environ.get('CLIENT_ID')
        GOOGLE_CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
        GOOGLE_REDIRECT_URI = os.environ.get('REDIRECT_URI')

        token_endpoint = 'https://oauth2.googleapis.com/token'

        token_payload = {
            'code': code,
            'client_id': GOOGLE_CLIENT_ID,
            'client_secret': GOOGLE_CLIENT_SECRET,
            'redirect_uri': GOOGLE_REDIRECT_URI,
            'grant_type': 'authorization_code'
        }

        token_response = requests.post(token_endpoint, data=token_payload)
        token_data = token_response.json()

        access_token = token_data.get('access_token')

        if access_token:
            user_info_endpoint = 'https://www.googleapis.com/oauth2/v2/userinfo'
            headers = {'Authorization': f'Bearer {access_token}'}

            # Retrieve user information
            user_info_response = requests.get(
                user_info_endpoint, headers=headers)
            user_info = user_info_response.json()

            email = str(user_info['email'])
            name = str(user_info['name'])

            # check if the user exists
            query = "SELECT id FROM users WHERE email = %s;"
            values = db.engine.execute(query, (email)).fetchone()
            if not values:
                # try to register the user
                query = 'INSERT INTO users (email, name, password_hash, salt, verification_id) VALUES (%s,%s,%s,%s,%s);'

                data = (email, name, "google_user", "google_user", "verified")

                db.engine.execute(query, data)

            session_token = str(uuid.uuid4())

            session_tools.establish_session(email, session_token)

            response = make_response("successful")

            response.set_cookie(
                'session_token', session_token, max_age=36000,
                secure=True, httponly=True, samesite='None')

            return response
        else:
            return "invalid access token", 400
