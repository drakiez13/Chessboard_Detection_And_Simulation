from app import app
from app import detector
from app import find_chessboard
from flask import request, jsonify
import cv2 as cv
import numpy as np
import io

# Test only
@app.route('/api')
def api():
    return 'api works'

@app.route('/api/image_upload', methods=['POST'])
def image_upload():
    imgfile = request.files.get('imagefile', '')
    img = cv.imdecode(np.frombuffer(imgfile.read(), np.uint8), cv.IMREAD_COLOR)

    detected = detector.predict(img)
    
    chessboard = find_chessboard.find_chessboard(img, detected)

    returned = dict()
    returned['data'] = detected
    returned['chessboard'] = chessboard

    return jsonify(returned)