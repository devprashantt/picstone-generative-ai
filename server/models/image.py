from config.database import db


class Image(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    image_path = db.Column(db.String(255), nullable=False)
    uploaded_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    def __init__(self, user_id, image_path):
        self.user_id = user_id
        self.image_path = image_path
