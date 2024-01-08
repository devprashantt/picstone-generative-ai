from typing import List
import cloudinary.uploader
from flask import request, jsonify

# CONSTANTS
import constants.constant_data as CONSTANTS

# CONFIG
from config.database import db

# UTILS
from utils.generate_story import generate_story
from utils.upload_img import upload_image_to_cloudinary
from utils.exceptions import INTERNAL_SERVER_ERROR_EXCEPTION,BAD_REQUEST_EXCEPTION

# MODELS
from models.story import Story
from models.image import Image
from models.tags import Tags

def extract_payload_data(payload):
    try:
        file = payload['file']
        themes = payload['themes']
        selected_themes = [theme for theme, value in themes.items() if value]
        desc = payload['description']
        title = payload['title']
        user_email = payload['email']
        themes = payload.get('themes', CONSTANTS.DEFAULT_THEMES)
        genre = payload.get("genre", CONSTANTS.DEFAULT_GENRE)
        return {
            "file" : file,
            "themes" : themes,
            "selected_themes" : selected_themes,
            "desc" : desc,
            "title" : title,
            "user_email" : user_email,
            "themes" : themes,
            "genre" : genre,
        }
    except Exception:
        raise BAD_REQUEST_EXCEPTION("One or More parameters missing in request")
    
def get_user_info(session_token, email):
    try:
        if session_token:
            user_email = db.engine.execute(
                "SELECT email FROM sessions WHERE session_token = %s;", (session_token,)).fetchone().email
            user_id = db.engine.execute(
                "SELECT id FROM users WHERE email = %s;", (user_email,)).fetchone().id
        else:
            user_email = email
            user_id = DEFAULT_USER_ID  # Set a default user id when not logged in

        return user_id, user_email
    except Exception:
        raise INTERNAL_SERVER_ERROR_EXCEPTION("Can't Fetch User Mail or ID")



def extract_ai_content(cloudinary_data):
    try:
        ai_content = ""
        if cloudinary_data["info"]["detection"]["captioning"]["status"] == "complete":
            ai_content = cloudinary_data["info"]["detection"]["captioning"]["data"]["caption"]
        return ai_content
    except Exception:
        raise INTERNAL_SERVER_ERROR_EXCEPTION("Error in Extracting Coludinary Data : AI_CONTENT")

def extract_text_data(cloudinary_data):
    try:
        image_text = ""
        if cloudinary_data["info"]["ocr"]["adv_ocr"]["status"] == "complete":
            image_text = cloudinary_data["info"]["ocr"]["adv_ocr"]["data"][0]["fullTextAnnotation"]["text"]
        return image_text
    except Exception:
        raise INTERNAL_SERVER_ERROR_EXCEPTION("Error in Extracting Coludinary Data : OCR_DATA")


def check_keywords(title:str, genre:str, desc:str, tags:List[str]):
    error = []

    if title.lower() in CONSTANTS.KEYWORDS_TO_CHECK:
        error.append("title")

    if ({i.lower() for i in desc.split()} & CONSTANTS.KEYWORDS_TO_CHECK):
        error.append("description")

    if CONSTANTS.KEYWORDS_TO_CHECK & {tag.lower() for tag in tags}:
        error.append("keywords")

    if genre.lower() in CONSTANTS.KEYWORDS_TO_CHECK:
        error.append("genre")

    if error:
        raise BAD_REQUEST_EXCEPTION("Can't generate using these " + ", ".join(error))


def generate_and_save_story(user_id, user_email, image_text, title, ai_content, desc, selected_themes, cloudinary_data, tags, tag_analysis):
    tags_string = ','.join(cloudinary_data['tags'])

    story = generate_story(tags, tag_analysis, image_text,
                           title, ai_content, desc, selected_themes)

    new_image = Image(
        user_id=user_id,
        image_path=cloudinary_data['secure_url'],
    )

    try:
        db.session.add(new_image)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e

    image_id = new_image.id

    new_story = Story(
        user_id=user_id,
        user_email=user_email,
        image_id=image_id,
        story_content=story,
        story_title=title,
        ai_content=ai_content,
        theme=','.join(selected_themes)
    )

    try:
        db.session.add(new_story)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e

    story_id = new_story.id

    new_tags = Tags(
        story_id=story_id,
        image_id=image_id,
        tags_string=tags_string
    )

    try:
        db.session.add(new_tags)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e
