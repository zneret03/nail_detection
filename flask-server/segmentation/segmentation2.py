from typing import Sized
import cv2
import numpy as np
from matplotlib import pyplot as plt
from PIL import Image
import base64
import math


class ImageSegmentation:

    # Default values
    path = ""

    Size = 50
    ks = 5
    sigma = 50

    def __init__(self, path):
        self.path = path

    # sorting contours values into a larger one
    def quick_sort(self, p):
        if len(p) <= 1:
            return p

        pivot = p.pop(0)
        low, high = [], []

        for entry in p:
            if entry[0] > pivot[0]:
                high.append(entry)
            else:
                low.append(entry)

        return self.quick_sort(high) + [pivot] + self.quick_sort(low)

    # traversing into image pixels and draw the largest contour
    def largestContours(self, canny, img):
        # Finding Contour
        global approx, unified
        global hierarchy
        contours, hierarchy = cv2.findContours(canny, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contoured_img = np.copy(img)  # Contours change original image.

        # Get all perimeter
        perimeter = []
        i = 0

        # Find perimeter for each contour i = id of contour
        for each_cnt in contours:
            prm = cv2.arcLength(each_cnt, True)
            perimeter.append([prm, i])
            i += 1

        # Sort perimeter and return 1 array with 4 index only
        perimeter = self.quick_sort(perimeter)

        unified = []
        max_index = []
        # Draw all contours
        for i in range(len(contours)):
            index = perimeter[i][1]
            max_index.append(index)
            #cv2.drawContours(contoured_img, contours, index, (0, 0, 255), 2)

        # Get convexhull for max contours and draw them
        conContour = np.vstack(contours[i] for i in max_index)

        hull = cv2.convexHull(conContour)
        unified.append(hull)
        cv2.drawContours(contoured_img, unified,-1, (0,255,0), 2)

        #print("hull",perimeter)

        #Boundingbox will be the final perimmeter of the image
        boundingBoxes = [cv2.boundingRect(c) for c in unified]
        #print("BoundingBox:", boundingBoxes)

        return contoured_img, contours, perimeter, hull, unified, boundingBoxes

    # Segmenting Largest Contour
    def grCut(self, image, bd, cx, cy, radius):
        #rectangle that contains the object

        #Rectangle will get the 4 index in the boundingBox of the contour
        global rect

        for boundingBox in bd:
            rect = (boundingBox)


        #Create 2 mask

        #Rectangular mask
        rec= np.zeros(image.shape[:2], dtype="uint8")
        cv2.rectangle(rec,rect, 255, -1)
        # cv2.imshow("Rectangular Mask", mask)

        #  circle mask
        circle = np.zeros(image.shape[:2], dtype="uint8")
        cv2.circle(circle, (cx, cy), int(radius) - 10, 255, -1) # subtracted 10 to original radius to eliminate excess pixels
        # cv2.imshow("Circle mask", circle)

        # combined using bitwise_and operator
        mask = cv2.bitwise_and(rec, circle)
        # cv2.imshow("mask", mask)
        # cropped out
        masked = cv2.bitwise_and(image, image, mask=mask)

        # Getting ROI(region of interest)
        # up1,down3,left0,right2
        global roi
        roi = image[rect[1]: rect[1] + rect[3], rect[0]:rect[2]]

        return masked


    def contourAnalysis(self, unified, contoured_img):
        # Contour Analysis
        for contour in unified:
            # Get the image moment for contour
            M = cv2.moments(contour)

            # Calculate the centroid
            cx = int(M['m10'] / M['m00'])
            cy = int(M['m01'] / M['m00'])

            # solving Area
            areaCon = M["m00"]

            # Solving the radius using area
            pi = 3.14159
            area = areaCon

            radius = math.sqrt(area / pi)

            # print(radius)

            return M, cx, cy, area, radius

    def segmentationProces(self):

        if self.path:

            # convert base64 to actual image file
            image = self.path.split(",")[1]
            decoded_data = base64.b64decode(image)
            np_data = np.fromstring(decoded_data, np.uint8)

            # decoded base64
            image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)

            #convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

            # {GAUSSIANBLUR VALUE} kernel size is none negative & odd numbers only
            # ks = 5
            sigma= 50
            #SMOOTHING(Applying GaussianBlur)
            img_blur = cv2.GaussianBlur(gray, (5, 7), sigma)


            # CANNY(Finding Edge)
            canny = cv2.Canny(img_blur, 50, 70 , L2gradient=False)


            # FINDING CONTOUR
            # Largest Contour - Not the best segmentation
            contoured_img, contours, perimeters, hull, unified, boundingBoxes = self.largestContours(canny, image)

            #Contour Analysis
            M, cx, cy, area, radius = self.contourAnalysis(unified, contoured_img)

            #Cutting the contoured nail
            img_grcut= self.grCut(image, boundingBoxes, cx, cy, radius)
            #canvas = np.zeros(image.shape, np.uint8)
            return image, img_blur, canny, contoured_img, img_grcut
