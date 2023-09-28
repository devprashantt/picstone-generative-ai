from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from routes.user_routes import user_bp
from routes.story_routes import story_bp

from config.database import db
from config.cloudinary import cloudinary
from config.open_ai import openai

app = Flask(__name__)
# Enable CORS
CORS(app)

# Initialize SQLAlchemy (if needed)
db = SQLAlchemy(app)

# Production mode
app.debug = app.config.get('DEBUG', False)

# Set SQLALCHEMY_DATABASE_URI to your TiDB URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://3Rr9emCtyuVf5o2.root:JK5UrTGYhp9diw3K@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/picstone?ssl_ca=self-signed-cert.pem'

# Disable SQLALCHEMY_TRACK_MODIFICATIONS warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Production mode
app.debug = app.config.get('DEBUG', False)

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

# Register the blueprint after the 'db_conn' setup


@app.route('/')
def index():
    # You can access the database within this route function
    # Your database operations should be here
    return "Server is running, and the database is connected."


app.register_blueprint(user_bp)
app.register_blueprint(story_bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
