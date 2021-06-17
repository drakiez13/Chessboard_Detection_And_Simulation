from flask import render_template
from app import app

@app.route('/')
def home():
    return "<h1>Hello world</h1>"

@app.route('/template')
def template():
    return render_template('home.html')