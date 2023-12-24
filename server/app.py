from flask import Flask, current_app, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message

from routes.user_routes import user_bp
from routes.story_routes import story_bp
from routes.message_routes import message_bp
from routes.tags_routes import tags_bp
from routes.message_routes import message_bp

from config.database import db, database_url
from config.cloudinary import cloudinary
from config.open_ai import openai

from utils.log_tools import RequestLogCopy, push_request_to_log

import os
from dotenv import load_dotenv
import time
import threading
from waitress import serve

app = Flask(__name__)

# Enable CORS
CORS(app, origins='*', supports_credentials=True)

load_dotenv()

# Initialize SQLAlchemy (if needed)
db = SQLAlchemy(app)

# Configure Flask-Mail
with app.app_context():
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = os.environ.get('MAIL_PORT')
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS')
    MAIL_USE_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')

    app.config['MAIL_SERVER'] = MAIL_SERVER
    app.config['MAIL_PORT'] = MAIL_PORT
    app.config['MAIL_USERNAME'] = MAIL_USERNAME
    app.config['MAIL_PASSWORD'] = MAIL_PASSWORD
    app.config['MAIL_USE_TLS'] = MAIL_USE_TLS
    app.config['MAIL_USE_DEFAULT_SENDER'] = MAIL_USE_DEFAULT_SENDER
    print("Connected to Mail successfully.")

    # Initialize Flask-Mail
    mail = Mail(app)
    app.mail = mail

# Production mode
app.debug = app.config.get('DEBUG', False)

# Set SQLALCHEMY_DATABASE_URI to your TiDB URI
app.config['SQLALCHEMY_DATABASE_URI'] = database_url

# Disbale SQLALCHEMY_BINDS warning
app.config['SQLALCHEMY_BINDS'] = False

# Disable SQLALCHEMY_TRACK_MODIFICATIONS warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Increase the pool size to, for example, 20
app.config['SQLALCHEMY_POOL_SIZE'] = 100

# Production mode
app.debug = app.config.get('DEBUG', True)

if app.debug:
    print("The Flask app is running in debug mode.")

try:
    # Attempt to connect to the database
    if db.engine.connect():
        print("Connected to the database successfully.")
except Exception as e:
    print("Failed to connect to the database. Error:", str(e))

# Check if cloudinary is configured
if cloudinary.config():
    print("Connected to Cloudinary successfully.")

# Check if openapi is configured
if openai.api_key:
    print("Connected to OpenAI successfully.")

# Production mode
app.debug = app.config.get('DEBUG', False)

if app.debug:
    print("The Flask app is running in debug mode.")

# Register the blueprint after the 'db_conn' setup


@app.route('/')
def index():
    # You can access the database within this route function
    # Your database operations should be here
    return "Server is running, and the database is connected."


app.register_blueprint(user_bp)
app.register_blueprint(story_bp)
app.register_blueprint(message_bp)
app.register_blueprint(tags_bp)


@app.before_request
def before_request():
    request.start_time = time.time()


@app.after_request
def after_request(response):
    request_copy = RequestLogCopy(request)
    thread = threading.Thread(
        target=push_request_to_log, args=(request_copy, response, app))
    thread.start()
    return response


if __name__ == "__main__":
    serve(app, host="localhost", port=8000, url_scheme='https', threads=16,
          connection_limit=1100, max_request_header_size=65536)
