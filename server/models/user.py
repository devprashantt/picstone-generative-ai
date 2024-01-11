from config.database import db


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def as_dict(self, *args):
        if args:
            return {i:self.__getattribute__(i) for i in args}
        return {i:j for i,j in self.__class__.__dict__.items() if not (i.startswith("__") or callable(j))}