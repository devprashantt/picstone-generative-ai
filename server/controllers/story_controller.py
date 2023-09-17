from flask import request, jsonify
from utils.upload_img import upload_image_to_cloudinary
from utils.generate_story import generate_poem_story
from utils.analyze_tags import analyze_tags


class StoryController:
    def generate_story_from_image():
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        tags = ['happy', 'sad', 'calm', 'exciting', 'positive',
                'negative', 'neutral', 'uplifting', 'romantic', 'mysterious']

        # Analyze the tags
        tag_analysis = analyze_tags(tags)

        # Upload the image to Cloudinary
        # cloudinary_data = upload_image_to_cloudinary(file)

        # print("cloudinary_data", cloudinary_data)

        # Extract tags from the Cloudinary metadata
        # cloudinary_tags = cloudinary_data['tags']

        # if not cloudinary_tags:
        #     return jsonify({'error': 'No Cloudinary-generated tags found'})

        # Generate a story based on the Cloudinary-generated tags
        # story = generate_poem_story(cloudinary_tags)

        return jsonify({'story': "story", "cloudinary_data": "cloudinary_data", "tag_analysis": tag_analysis["moods"]})
