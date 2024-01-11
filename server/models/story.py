from config.database import db


class Story(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    # STORING USER EMAIL WHO AREN'T LOGGED-IN
    user_email = db.Column(db.String(255), nullable=False)
    image_id = db.Column(db.Integer, nullable=False)
    story_content = db.Column(db.Text, nullable=False)
    story_title = db.Column(db.Text, nullable=False)
    theme = db.Column(db.Text, nullable=False)
    ai_content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    genre = db.Column(db.String(50), nullable=False)

    def __init__(self, user_id, user_email, image_id, story_content, story_title, theme, ai_content, genre):
        self.user_id = user_id
        self.user_email = user_email
        self.image_id = image_id
        self.story_content = story_content
        self.story_title = story_title
        self.theme = theme
        self.ai_content = ai_content
        self.genre = genre

    def as_dict(self, *args):
        if args:
            return {i: self.__getattribute__(i) for i in args}
        return {i: j for i, j in self.__class__.__dict__.items() if not (i.startswith("__") or callable(j))}
