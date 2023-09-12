class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='images')
    image_path = db.Column(db.String(255), nullable=False)
    uploaded_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
