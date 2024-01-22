from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

# Access environment variables using os.environ
database_url = os.environ.get('SQLALCHEMY_DATABASE_URI')
SQLALCHEMY_DATABASE_URI = database_url
db = SQLAlchemy()