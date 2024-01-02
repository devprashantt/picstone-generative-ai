from flask import request, jsonify
from collections import Counter

# MODELS
from models.tags import Tags
from models.story import Story
from models.image import Image

# CONFIG
from config.database import db


class TagsController:
    # Get all tags from the database
    @staticmethod
    def get_all_tags():
        try:
            # Get all tags from the "tags" table limiting it to 6
            tags = Tags.query.limit(6).all()

            # Initialize an empty list to store all tags
            all_tags = []

            # Iterate through the rows and combine tags
            for tag in tags:
                # Split the tags_string by comma and remove leading/trailing spaces
                tags_list = [t.strip() for t in tag.tags_string.split(',')]
                # Extend the all_tags list with the tags from this row
                all_tags.extend(tags_list)

             # Use Counter to count tag occurrences and sort by frequency (most common first)
            tag_counts = Counter(all_tags)
            sorted_tags = [tag for tag, count in tag_counts.most_common()]

            return jsonify({'tags': sorted_tags, "message": "Tags fetched successfully!"}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Get ids
    @staticmethod
    def get_tags_by_story_id(story_id):
        try:
            # Get the tags for the story with the specified ID
            tags = Tags.query.filter_by(story_id=story_id).first()

            # Split the tags_string by comma and remove leading/trailing spaces
            tags_list = [tag.strip()
                         for tag in tags.tags_string.split(',')] if tags else []

            return jsonify({'tags': tags_list, "message": "Tags fetched successfully!"}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Search tags
    @staticmethod
    def get_tags_by_search(search_term):
        # Search tags similar to search term
        try:
            # Get all tags from tags table
            tags = Tags.query.all()

            # Save each tags separately which are separated by comma
            all_tags = []
            for tag in tags:
                tags_list = [t.strip() for t in tag.tags_string.split(',')]
                all_tags.extend(tags_list)

            # Now filter out the tags which are similar to given search term
            filtered_tags = [
                tag for tag in all_tags if search_term.lower() in tag.lower()]

            # Remove duplicates
            filtered_tags = list(dict.fromkeys(filtered_tags))

            return jsonify({'tags': filtered_tags, "message": "Tags fetched successfully!"}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Get story by tag name
    @staticmethod
    def get_story_by_tag(tag_name):
        try:
            # Query the Tags table to find all rows where the tags_string contains the specified tag
            tag_name = tag_name.strip()  # Remove leading/trailing spaces
            stories_with_tag = db.session.query(Story).join(Tags, Story.id == Tags.story_id).filter(
                Tags.tags_string.ilike(f"%{tag_name}%")).all()

            if stories_with_tag:
                # Create a list to store the result
                stories_data = []

                # Iterate through the stories and retrieve necessary information
                for story in stories_with_tag:
                    image = Image.query.get(story.image_id)
                    image_url = image.image_path if image else None

                    # Retrieve the tags for the story as a single string
                    tags_string = db.session.query(Tags.tags_string).filter(
                        Tags.story_id == story.id).first()

                    # Split the tags string into individual tags using a comma as the delimiter
                    tag_list = [tag.strip()
                                for tag in tags_string[0].split(',')] if tags_string else []

                    # Create a dictionary for each story
                    story_data = {
                        'id': story.id,
                        'user_id': story.user_id,
                        'image_url': image_url,
                        'story_content': story.story_content,
                        'created_at': story.created_at,
                        'tags': tag_list
                    }

                    # Add the story data to the list
                    stories_data.append(story_data)

                return jsonify({'stories': stories_data})
            else:
                return jsonify({'message': 'No stories found with the specified tag'})

        except Exception as e:
            # Handle exceptions and return an error response
            return jsonify({'error': str(e)})
