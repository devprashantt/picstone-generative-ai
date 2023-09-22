from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Import your blueprints here
from routes.user_routes import user_bp
from routes.story_routes import story_bp

app = Flask(__name__)

# Use environment variables for sensitive information
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:password@localhost/picstone'

# Disable debug mode in production
app.config['DEBUG'] = False

# Disable SQLALCHEMY_TRACK_MODIFICATIONS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the SQLAlchemy and Migrate extensions
db = SQLAlchemy(app)

# Register your blueprints
app.register_blueprint(user_bp)
app.register_blueprint(story_bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
