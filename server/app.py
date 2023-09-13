from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy


from routes.user_routes import user_bp
from routes.story_routes import story_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:password@localhost/picstone'
db = SQLAlchemy(app)

if app.debug:
    print("The Flask app is running in debug mode.")

try:
    import cloudinary
    print("Cloudinary Python SDK is installed.")
except ImportError:
    print("Cloudinary Python SDK is not installed.")

try:
    db.engine.connect()
    print("Connected to the database successfully.")
except Exception as e:
    print("Failed to connect to the database. Error:", str(e))


@app.route('/')
def index():
    # You can access the database within this route function
    # Your database operations should be here
    return "Server is running, and the database is connected."


app.register_blueprint(user_bp)
app.register_blueprint(story_bp)

if __name__ == "__main__":
    app.run(debug=True)
