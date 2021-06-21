from app import app
from app import detector
from flask import request, jsonify

# Test only
@app.route('/api')
def api():
    return 'api works'

@app.route('/api/image_upload', methods=['POST'])
def image_upload():
    img = request.files.get('imagefile', '')
    return detector.predict(img)