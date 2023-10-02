from flask import request, jsonify
from collections import Counter

# MODELS
from models.tags import Tags


class TagsController:
    # Get all tags from the database
    @staticmethod
    def get_all_tags():
        try:
            # Get all tags from the "tags" table
            tags = Tags.query.all()

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
