from flask import Flask, request, render_template, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

from routes.user_routes import user_bp
from routes.story_routes import story_bp
from routes.message_routes import message_bp
from routes.tags_routes import tags_bp
from routes.theme_routes import theme_bp

from config.database import db, database_url
from config.cloudinary import cloudinary
from config.open_ai import openai

from utils.log_tools import RequestLogCopy, push_request_to_log

import os
from dotenv import load_dotenv
import time
import threading

app = Flask(__name__, static_url_path='/static')

# Enable CORS for all origins
CORS(app, origins='*', supports_credentials=True)

# Load environment variables from .env file
load_dotenv()

# Initialize SQLAlchemy and bind to the app
db.init_app(app)

# Configure Flask-Mail
with app.app_context():
    app.config.update(
        MAIL_SERVER=os.getenv('MAIL_SERVER'),
        MAIL_PORT=os.getenv('MAIL_PORT'),
        MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
        MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
        MAIL_USE_TLS=os.getenv('MAIL_USE_TLS'),
        MAIL_USE_DEFAULT_SENDER=os.getenv('MAIL_DEFAULT_SENDER')
    )

    # Initialize Flask-Mail
    mail = Mail(app)

# Set SQLALCHEMY_DATABASE_URI to your TiDB URI
app.config['SQLALCHEMY_DATABASE_URI'] = database_url

# Disable SQLALCHEMY_BINDS warning
app.config['SQLALCHEMY_BINDS'] = False

# Disable SQLALCHEMY_TRACK_MODIFICATIONS warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Increase the pool size
app.config['SQLALCHEMY_POOL_SIZE'] = 100

# Set debug mode based on the environment
app.debug = app.config.get('DEBUG', False)

# Print debug information
if app.debug:
    print("The Flask app is running in debug mode.")

# Attempt to connect to the database
try:
    with app.app_context():
        if db.engine.connect():
            print("Connected to the database successfully.")
except Exception as e:
    print("Failed to connect to the database. Error:", str(e))

# Check if cloudinary is configured
if cloudinary.config():
    print("Connected to Cloudinary successfully.")

# Check if openai is configured
if openai.api_key:
    print("Connected to OpenAI successfully.")

# Production mode
app.debug = app.config.get('DEBUG', False)

if app.debug:
    print("The Flask app is running in debug mode.")

app.register_blueprint(user_bp)
app.register_blueprint(story_bp)
app.register_blueprint(message_bp)
app.register_blueprint(tags_bp)
app.register_blueprint(theme_bp)


@app.route('/<path:filename>')
def serve_static(filename):
    static_path = os.path.join(app.root_path, 'static')

    if os.path.exists(os.path.join(static_path, filename)):
        return send_from_directory(static_path, filename)
    else:
        return render_template('index.html')


@app.route('/', defaults={'path': ''}, strict_slashes=False)
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


@app.before_request
def before_request():
    request.start_time = time.time()


@app.after_request
def after_request(response):
    # Create a copy of the request for logging
    request_copy = RequestLogCopy(request)

    # Use threading for asynchronous logging
    thread = threading.Thread(
        target=push_request_to_log, args=(request_copy, response, app))
    thread.start()

    return response

# Define the main route


@app.route('/')
def index():
    # Your database operations should be here
    return "Server is running, and the database is connected."


if __name__ == "__main__":
    # Run the app on 0.0.0.0:80
    app.run(host='0.0.0.0', port=80)
