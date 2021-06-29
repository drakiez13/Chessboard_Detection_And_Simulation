import io
import numpy as np
import cv2 as cv


def detect_color(img, lower = (20, 30, 150), upper = (40, 80, 250)):
    img_hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)
    mask = cv.inRange(img_hsv, lower, upper)
    result = cv.bitwise_and(img_hsv, img_hsv, mask=mask)
    return result


def detect_corner(img, blockSize=3, ksize=3, k=0.04, threshold=0.01):
    gray = img
    dst = cv.cornerHarris(gray, blockSize, ksize, k)
    # result is dilated for marking the corners, not important
    dst = cv.dilate(dst, None)
    img = img*0
    # Threshold for an optimal value, it may vary depending on the image.
    img[dst > threshold*dst.max()] = 255

    return img


def box_board(img):
    w, h = img.shape
    corner = []
    distance = []
    min_x1, min_x2, min_x3, min_x4 = 9999999, 9999999, 9999999, 9999999
    x1, x2, x3, x4 = 0, 0, 0, 0
    for i in range(w):
        for j in range(h):
            if img[i, j] == 255:
                corner.append([i, j])
                if (i**2 + j**2 < min_x1):
                    min_x1 = i**2 + j**2
                    x1 = (j, i)
                if (i**2 + (h-j)**2 < min_x2):
                    min_x2 = i**2 + (h-j)**2
                    x2 = (j, i)
                if ((w-i)**2 + j**2 < min_x3):
                    min_x3 = (w-i)**2 + j**2
                    x3 = (j, i)
                if ((w-i)**2 + (h-j)**2 < min_x4):
                    min_x4 = (w-i)**2 + (h-j)**2
                    x4 = (j, i)
    return x1, x2, x3, x4


def detect_board(img):

    img_color = detect_color(img)
    img_color = cv.cvtColor(cv.cvtColor(img_color, cv.COLOR_HSV2BGR), cv.COLOR_BGR2GRAY)
    img_corner = detect_corner(img_color)
    x1, x2, x3, x4 = box_board(img_corner)
    return x1, x2, x3, x4


def find_pos(x, y, x0, y0, w, h):
    x = x - x0
    y = y - y0
    pos_x = int(x / w * 8) + 1
    pos_y = int(y / h * 8) + 1
    return pos_x, pos_y


def find_specific_chessboard(img):
    x, y, w, h = 1,1,1,1
    img_color = detect_color(img, (50,40,80), (80,120,110))

    img_color = cv.cvtColor(cv.cvtColor(img_color, cv.COLOR_HSV2BGR), cv.COLOR_BGR2GRAY)
    img_corner = detect_corner(img_color)
    x1, x2, x3, x4 = box_board(img_corner)
    x = x1[0]
    y = x1[1]
    w = x4[0]-x
    h = x4[1]-y
    return x,y,w,h

def perspective_point(xmin, ymin, xmax, ymax):
    x = (xmax + xmin) // 2
    y = ymin + (ymax - ymin)
    return (x, y)


def get_position(img, detected):
    board_corner = detect_board(img)
    positions = []
    pts1 = np.array(board_corner, dtype=np.float32)
    pts2 = np.float32([[0, 0], [200, 0], [0, 200], [200, 200]])

    matrix = cv.getPerspectiveTransform(pts1, pts2)

    square_img = cv.warpPerspective(img, matrix, (200, 200))

    for obj in detected:
        xmin = obj['xmin']
        xmax = obj['xmax']
        ymin = obj['ymin']
        ymax = obj['ymax']
        

        x, y = perspective_point(xmin, ymin, xmax, ymax)

        topleft = cv.perspectiveTransform(np.array([[[x, y]]], dtype=np.float32), matrix)
        x, y = topleft[0, 0]

        x0, y0, w0, h0 = find_specific_chessboard(square_img)

        x, y = find_pos(x, y, x0, y0, w0, h0)

        positions.append(dict({'name': obj['name'], 'x': x, 'y': y}))

    return positions


def find_chessboard(img, detected):

    return dict({'isDetected': 'ok', 'positions': get_position(img, detected)})
