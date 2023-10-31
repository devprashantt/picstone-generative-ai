from flask import jsonify


def atomic(db):
    '''pass the database instance as argument to decorator'''
    def outer(func):
        def inner(*args, **kwargs):
            try:
                func(*args, **kwargs)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return jsonify({'error': str(e)}), 500
        return inner
    return outer
    