from sys import path
from app import app
from PIL import Image
import io
import torch

yolo_path = app.root_path + '/yolov5s.pt'
weight_path = app.root_path + '/trained_model.pt'
model = torch.hub.load('ultralytics/yolov5', 'custom', path=weight_path)
def predict(imgfile):
    img_bytes = imgfile.read()
    img = Image.open(io.BytesIO(img_bytes))
    results = model(img)
    return results.pandas().xyxy[0].to_json(orient="records")




