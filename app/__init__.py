from flask import Flask
app = Flask(__name__, static_url_path='')
from app import api
# serve static html file
@app.route('/')
def template():
    return app.send_static_file('index.html')

