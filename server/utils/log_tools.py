import uuid
import time
import os
from flask import request, current_app
from flask_mail import Message, Mail
from copy import deepcopy
from utils.session_tools import user_from_session
import psycopg2

class RequestLogCopy:
    def __init__(self, request):
        self.start_time = deepcopy(request.start_time)
        self.remote_addr = deepcopy(request.remote_addr)
        self.base_url = deepcopy(request.base_url)
        self.cookies = deepcopy(request.cookies)
        self.path = deepcopy(request.path)


def push_request_to_log(request, response, app):
    elapsed_time = time.time() - request.start_time
    client_ip = request.remote_addr
    base_url = request.base_url
    trail_url = request.path[:100]
    response_code = str(response.status_code)
    user_id = 'anon'
    
    try:
        session_token = request.cookies.get('session_token')
        if session_token:
            try:
                user_id = user_from_session(session_token)
            except:
                user_id = 'anon'
            if not user_id:
                user_id = 'anon'
    except:
        pass

    with app.app_context():
        if response.status_code >= 500:
            msg = Message('Picstone, 500 Error Code', recipients=['picstoneai@gmail.com'], sender='picstoneai@gmail.com')
            msg.body =  f"""
                            Error occured for: {user_id} @ {client_ip}

                            Error occured on route: {trail_url}

                            Elapsed time: {elapsed_time}
                        
                            """
            app.mail.send(msg)

    try:
        conn = psycopg2.connect(
                database=os.environ.get('POSTGRES_DB'),
                user=os.environ.get('POSTGRES_USER'),
                password=os.environ.get('POSTGRES_PW'),
                host=os.environ.get('POSTGRES_HOST'), 
                port=5432 
            )
        cur = conn.cursor()
        query = """
                INSERT INTO system_log (request_time, remote_addr, base_url, request_path, user_id, response_code)
                VALUES (%s, %s, %s, %s, %s, %s);COMMIT;
                """
        data = (elapsed_time, client_ip, base_url, trail_url, user_id, response_code)
        cur.execute(query, data)
        cur.close()
        conn.close()
    except:
        pass



