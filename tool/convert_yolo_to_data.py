import cv2
import os
import numpy as np

source_dir_train_image = "/home/huy/Documents/Final_Project/data_fruit/test/images"
source_dir_train_labels = "/home/huy/Documents/Final_Project/data_fruit/test/labels"
out_dir_train = "/home/huy/Documents/Final_Project/data_fruit/test/labels_cv"

def convert(label, width, height):
    cl,x,y,w,h = [float(x) for x in (label.split())]
    x_min = int(x*width - (w*width)//2)
    y_min = int(y*height - (h*height)//2)
    x_max = int(x*width + (w*width)//2)
    y_max = int(y*height + (h*height)//2)
    t = str(int(cl)) + ' ' + str(x_min) + ' ' + str(y_min) + ' ' + str(x_max) + ' ' + str(y_max)
    return t
    
for file in os.listdir(source_dir_train_image):
    label_info = []
    if file.endswith(".jpg"):
        img_dir = source_dir_train_image + "/" + file 
        txt_dir = source_dir_train_labels + "/" + file[:-4] + ".txt"

        file1 = open(txt_dir,"r")
        while line := file1.readline():
            print(line)
            label_info.append(line)

        img = cv2.imread(img_dir)
        w = img.shape[1]
        h = img.shape[0]

        f = open(out_dir_train + "/" + file[:-4]  + ".txt","w")
        print(file)

        for label in label_info:
            line = convert(label,w,h)
            f.writelines(line+"\n")

        f.close
        
