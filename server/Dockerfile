#WAITRESS DOCKERFILE

FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y \
        python3 \
        python3-pip 


RUN apt-get update \
    && apt-get install -y libpq-dev

WORKDIR /server

COPY requirements.txt requirements.txt

RUN pip3 install --upgrade pip && \
    pip3 install --no-cache-dir -r /server/requirements.txt && \
    rm -rf /root/.cache

COPY . .


CMD ["waitress-serve", "--port=80", "--call", "app:create_app"]

