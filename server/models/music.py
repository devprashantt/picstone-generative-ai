class Music(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='music')
    story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
    story = db.relationship('Story', backref='music')
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    image = db.relationship('Image', backref='music')
    music_content = db.Column(db.BLOB)  # You can store binary data for music files
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
