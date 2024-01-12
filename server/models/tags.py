from config.database import db


class Tags(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    tags_string = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    def __init__(self, story_id, image_id, tags_string):
        self.story_id = story_id
        self.image_id = image_id
        self.tags_string = tags_string

    def as_dict(self, *args):
        if args:
            return {i:self.__getattribute__(i) for i in args}
        return {
            "id" : self.id,
            "story_id" : self.story_id,
            "image_id" : self.image_id,
            "tags_string" : self.tags_string,
            "created_at" : self.created_at,
        }