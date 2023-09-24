from flask import request, jsonify

# LOCAL IMPORTS
from utils.upload_img import upload_image_to_cloudinary
from utils.generate_story import generate_poem_story
from utils.analyze_tags import analyze_tags


class StoryController:
    @staticmethod
    def generate_story_from_image():
        try:
            # Check if 'file' is in the request files
            if 'file' not in request.files:
                return jsonify({'error': 'No file part'})

            file = request.files['file']

            # Check if a file was selected
            if file.filename == '':
                return jsonify({'error': 'No selected file'})

            # Tags for analysis
            tags = ['happy', 'sad', 'calm', 'exciting', 'positive',
                    'negative', 'neutral', 'uplifting', 'romantic', 'mysterious']

            # Analyze the tags
            tag_analysis = analyze_tags(tags)

            # Upload the image to Cloudinary
            cloudinary_data = upload_image_to_cloudinary(file)

            # Extract tags from the Cloudinary metadata
            cloudinary_tags = cloudinary_data['tags']

            if not cloudinary_tags:
                return jsonify({'error': 'No Cloudinary-generated tags found'})

            # Generate a story based on the Cloudinary-generated tags
            story = generate_poem_story(
                tags=cloudinary_tags, tag_analysis=tag_analysis)

            return jsonify({
                'story': story,
                "cloudinary_data": cloudinary_data
            })

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})
