from werkzeug.wrappers import request
from app import app
from app import predict
from flask import request, jsonify

# Test only
@app.route('/api')
def api():
    return 'api works'

@app.route('/api/image_upload', methods=['POST'])
def image_upload():
    img = request.files.get('imagefile', '')
    return jsonify(predict.predict(img))