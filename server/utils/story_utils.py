import cloudinary.uploader
from flask import request, jsonify

# CONFIG
from config.database import db

# UTILS
from utils.generate_story import generate_story
from utils.upload_img import upload_image_to_cloudinary

# MODELS
from models.story import Story
from models.image import Image
from models.tags import Tags


def get_user_info(payload):
    session_token = payload.get('session_token')
    if session_token:
        user_email = db.engine.execute(
            "SELECT email FROM sessions WHERE session_token = %s;", (session_token,)).fetchone().email
        user_id = db.engine.execute(
            "SELECT id FROM users WHERE email = %s;", (user_email,)).fetchone().id
    else:
        user_email = payload['email']
        user_id = 1080002  # Set a default user id when not logged in

    return user_id, user_email


def extract_payload_data(payload):
    file = payload['file']
    themes = payload['themes']
    selected_themes = [theme for theme, value in themes.items() if value]
    desc = payload['description']
    title = payload['title']

    return file, themes, selected_themes, desc, title


def analyze_tags():
    tags = ['happy', 'sad', 'calm', 'exciting', 'positive',
            'negative', 'neutral', 'uplifting', 'romantic', 'mysterious']
    tag_analysis = analyze_tags(tags)
    return tags, tag_analysis


def extract_ai_content(cloudinary_data):
    try:
        if cloudinary_data["info"]["detection"]["captioning"]["status"] == "complete":
            ai_content = cloudinary_data["info"]["detection"]["captioning"]["data"]["caption"]
    except Exception as e:
        print("Exception occurs during ai content analysis:", e)
    return ai_content


def extract_text_data(cloudinary_data):
    try:
        if cloudinary_data["info"]["ocr"]["adv_ocr"]["status"] == "complete":
            # Get text data from data
            image_text = cloudinary_data["info"]["ocr"]["adv_ocr"]["data"][0]["fullTextAnnotation"]["text"]
    except Exception as e:
        print("Exception occurs during text data extraction:", e)
    return image_text


def check_keywords(title, desc, tags, cloudinary_data):
    keywords_to_check = ['Sex', 'Brassiere', 'Porn', 'Rape']

    for keyword in keywords_to_check:
        if keyword.lower() in title.lower():
            return jsonify({'error': f"Found '{keyword}' in title. Can't proceed with this title"}), 400

    for keyword in keywords_to_check:
        if keyword.lower() in desc.lower():
            return jsonify({'error': f"Found '{keyword}' in description. Can't proceed with this description"}), 400

    for keyword in keywords_to_check:
        if keyword.lower() in [tag.lower() for tag in tags]:
            return jsonify({'error': f"Found '{keyword}' in tags. Can't generate using these tags"}), 400


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
