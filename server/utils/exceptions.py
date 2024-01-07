from app import app

SHOW_INTERNAL_ERRORS = app.debug

class BAD_REQUEST_EXCEPTION(Exception):
    def __init__(self, message:str) -> None:
        self.message = f"BAD REQUEST : {message}"
        self.error = 400

class INTERNAL_SERVER_ERROR_EXCEPTION(Exception):
    def __init__(self, message:str) -> None:
        self.message = "INTERNAL SERVER ERROR"+ message if SHOW_INTERNAL_ERRORS else ""
        self.error = 500