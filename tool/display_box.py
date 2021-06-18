import cv2
import numpy as np
import os
from PIL import Image
import sys
import yaml
from yaml import loader

path_img = "/home/huy/Documents/Final_Project/data_fruit/test/images"
path_label = "/home/huy/Documents/Final_Project/data_fruit/test/labels_cv"
path_class = "/home/huy/Documents/Final_Project/data_fruit/data.yaml"

list_file = [file for file in os.listdir(path_img)]
file_class = open(path_class, "r")
class_name = yaml.load(file_class, Loader = yaml.FullLoader)["names"]
i = 0
while(True):
    img_dir = path_img + "/" + list_file[i] 
    txt_dir = path_label + "/" + list_file[i][:-4] + ".txt"
    img = cv2.imread(img_dir)

    #display
    labels = open(txt_dir, "r")
    while line := labels.readline():
        cl,x_min,y_min,x_max,y_max = [int(x) for x in (line.split())]
        cv2.rectangle(img,(x_min, y_min), (x_max, y_max), (0,0,255), 2)
        cv2.putText(img, class_name[cl], (x_min,y_min-5), cv2.FONT_HERSHEY_COMPLEX_SMALL, fontScale=(x_max-x_min)/150, color=(0,255,0), thickness=i )
    cv2.imshow("image" + str(i), img )
    
    #control
    k = cv2.waitKey(0)
    if (chr(k) == 'x'):
        cv2.destroyAllWindows()
        break
    elif (chr(k) == 'd' and i < len(list_file)-1):
        i += 1
    elif (chr(k) == 'a' and i > 0):
        i -= 1
    cv2.destroyAllWindows()


    