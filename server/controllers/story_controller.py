from flask import request, jsonify
from utils.upload_img import upload_image_to_cloudinary
from utils.generate_story import generate_story_from_tags


class StoryController:
    def generate_story_from_image():
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        # Upload the image to Cloudinary
        cloudinary_data = upload_image_to_cloudinary(file)['secure_url']

        # Extract the Cloudinary URL from the response
        cloudinary_url = cloudinary_data['secure_url']

        # Extract tags from the Cloudinary metadata
        cloudinary_tags = cloudinary_data['tags']

        if not cloudinary_tags:
            return jsonify({'error': 'No Cloudinary-generated tags found'})

        # Generate a story based on the Cloudinary-generated tags
        # story = generate_story_from_tags(cloudinary_tags)

        return jsonify({'story': cloudinary_data})
