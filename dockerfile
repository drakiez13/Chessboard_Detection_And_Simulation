FROM python:3.9

WORKDIR /app

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y

RUN apt install libgl1-mesa-glx -y

RUN apt-get install 'ffmpeg'\
    'libsm6'\
    'libxext6'  -y

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .