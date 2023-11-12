from config.database import db


class Story(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    image_id = db.Column(db.Integer, nullable=False)
    story_content = db.Column(db.Text, nullable=False)
    story_title = db.Column(db.Text, nullable=False)
    theme = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    def __init__(self, user_id, image_id, story_content, story_title, theme):
        self.user_id = user_id
        self.image_id = image_id
        self.story_content = story_content
        self.story_title = story_title
        self.theme = theme
