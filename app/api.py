from app import app
from app import detector
from app import find_chessboard
from flask import request, jsonify

# Test only
@app.route('/api')
def api():
    return 'api works'

@app.route('/api/image_upload', methods=['POST'])
def image_upload():
    img = request.files.get('imagefile', '')
    detected = detector.predict(img)
    chessboard = find_chessboard.find_chessboard(img)
    returned = dict()
    returned['data'] = detected
    returned['chessboard'] = chessboard

    return jsonify(returned)