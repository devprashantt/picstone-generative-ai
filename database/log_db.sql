CREATE TABLE system_log
(
    log_id SERIAL PRIMARY KEY,
    start_time timestamp DEFAULT CURRENT_TIMESTAMP,
    remote_addr character varying(255),
    base_url character varying(255),
    request_path character varying(255),
    user_id character varying(255),
    request_time numeric,
    response_code character varying(255),
)
