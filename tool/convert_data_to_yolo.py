import cv2
import os
import numpy as np

source_dir_train_image = "/home/huy/Docoments/Final_Project/data_yolo/train/images/"
source_dir_train_labels = "/home/huy/Docoments/Final_Project/data_yolo/train/labels_cv/"
out_dir_train = "/home/huy/Docoments/Final_Project/data_yolo/train/labels/"

def convert(label, width, height):
    cl,x_min,y_min,x_max,y_max = [float(x) for x in (label.split())]
    w = ((x_max - x_min) // 2)
    h = ((y_max - y_min) // 2)
    x = (x_min + w)
    y = (y_min + h) 

    x = x  / width 
    y = y / height 
    w = w*2 / width 
    h = h*2 / height
    t = str(int(cl)) + ' ' + str(x) + ' ' + str(y) + ' ' + str(w) + ' ' + str(h)
    return t
    
for file in os.listdir(source_dir_train_image):
    label_info = []
    if file.endswith(".jpg"):
        img_dir = source_dir_train_image + "/" + file 
        txt_dir = source_dir_train_labels + "/" + file[:-4] + ".txt"

        file1 = open(txt_dir,"r")
        for line in file1.readline():
            label_info.append(line)

        img = cv2.imread(img_dir)
        w = img.shape[1]
        h = img.shape[0]

        f = open(out_dir_train + "//" + file[:-4]  + ".txt","w")
        print(file)

        for label in label_info:
            line = convert(label,w,h)
            f.writelines(line+"\n")

        f.close
        
