from config.database import db

class Music(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='music')
    story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
    story = db.relationship('Story', backref='music')
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    image = db.relationship('Image', backref='music')
    # You can store binary data for music files
    music_content = db.Column(db.BLOB)
    created_at = db.Column(
        db.TIMESTAMP, server_default=db.func.current_timestamp())
    
    def as_dict(self, *args):
        if args:
            return {i:self.__getattribute__(i) for i in args}
        return {
            "id" : self.id,
            "user_id" : self.user_id,
            "user" : self.user,
            "story_id" : self.story_id,
            "story" : self.story,
            "image_id" : self.image_id,
            "image" : self.image,
            "music_content" : self.music_content,
            "created_at" : self.created_at,
        }
