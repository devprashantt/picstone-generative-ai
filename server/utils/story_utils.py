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
from utils.exceptions import INTERNAL_SERVER_ERROR_EXCEPTION, BAD_REQUEST_EXCEPTION

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
            "file": file,
            "themes": themes,
            "selected_themes": selected_themes,
            "description": desc,
            "title": title,
            "user_email": user_email,
            "themes": themes,
            "genre": genre,
        }
    except Exception:
        raise BAD_REQUEST_EXCEPTION(
            "One or more parameters missing in request")


def get_user_info(session_token, email):
    try:
        if session_token:
            user_email = db.engine.execute(
                "SELECT email FROM sessions WHERE session_token = %s;", (session_token,)).fetchone().email
            user_id = db.engine.execute(
                "SELECT id FROM users WHERE email = %s;", (user_email,)).fetchone().id
        else:
            user_email = email
            # Set a default user id when not logged in
            user_id = CONSTANTS.DEFAULT_USER_ID_STORY

        return user_id, user_email
    except Exception:
        raise INTERNAL_SERVER_ERROR_EXCEPTION("Can't Fetch User Mail or ID")


def extract_ai_content(cloudinary_data):
    try:
        ai_content = ""
        if cloudinary_data["info"]["detection"]["captioning"]["status"] == "complete":
            ai_content = cloudinary_data["info"]["detection"]["captioning"].get(
                "data", {"caption": CONSTANTS.DEFAULT_CAPTION})["caption"]
        return ai_content
    except Exception:
        raise INTERNAL_SERVER_ERROR_EXCEPTION(
            "Error in Extracting Cloudinary Data : AI_CONTENT")


def extract_text_data(cloudinary_data):
    try:
        image_text = ""
        if cloudinary_data["info"]["ocr"]["adv_ocr"]["status"] == "complete":
            # print(cloudinary_data["info"]["ocr"]["adv_ocr"]["status"])
            image_text = cloudinary_data["info"]["ocr"]["adv_ocr"]["data"][0].get(
                "fullTextAnnotation", {"text": CONSTANTS.DEFAULT_OCR})["text"]
        return image_text
    except Exception as e:
        raise INTERNAL_SERVER_ERROR_EXCEPTION(
            f"Error in Extracting Coludinary Data : OCR_DATA({e.args})")


def check_keywords(title: str, genre: str, desc: str, tags: List[str]):
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
        raise BAD_REQUEST_EXCEPTION(
            "Can't generate using these " + ", ".join(error))


def save_image(new_image: Image):
    # Save the image in the "images" table

    try:
        db.session.add(new_image)
        db.session.commit()
        return new_image
    except Exception as e:
        db.session.rollback()
        raise INTERNAL_SERVER_ERROR_EXCEPTION(
            f'error during saving image in database : {e.args}')
        # return jsonify({'error during saving image in database': str(e)}), 500


def save_story(new_story: Story):
    try:
        # Add the new story to the database
        db.session.add(new_story)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise INTERNAL_SERVER_ERROR_EXCEPTION(
            message=f'error during saving story on database : {e.args}',
        )


def save_tags(new_tags: Tags):
    try:
        db.session.add(new_tags)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise INTERNAL_SERVER_ERROR_EXCEPTION(
            message=f'error during saving tags on database : {e.args}',
        )
