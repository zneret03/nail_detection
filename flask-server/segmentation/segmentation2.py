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

    def stackImages(self, imgArray, scale, lables=[]):
        rows = len(imgArray)
        cols = len(imgArray[0])
        rowsAvailable = isinstance(imgArray[0], list)
        width = imgArray[0][0].shape[1]
        height = imgArray[0][0].shape[0]
        if rowsAvailable:
            for x in range(0, rows):
                for y in range(0, cols):
                    imgArray[x][y] = cv2.resize(
                        imgArray[x][y], (0, 0), None, scale, scale)
                    if len(imgArray[x][y].shape) == 2:
                        imgArray[x][y] = cv2.cvtColor(
                            imgArray[x][y], cv2.COLOR_GRAY2BGR)
            imageBlank = np.zeros((height, width, 3), np.uint8)
            hor = [imageBlank]*rows
            hor_con = [imageBlank]*rows
            for x in range(0, rows):
                hor[x] = np.hstack(imgArray[x])
                hor_con[x] = np.concatenate(imgArray[x])
            ver = np.vstack(hor)
            ver_con = np.concatenate(hor)
        else:
            for x in range(0, rows):
                imgArray[x] = cv2.resize(
                    imgArray[x], (0, 0), None, scale, scale)
                if len(imgArray[x].shape) == 2:
                    imgArray[x] = cv2.cvtColor(imgArray[x], cv2.COLOR_GRAY2BGR)
            hor = np.hstack(imgArray)
            hor_con = np.concatenate(imgArray)
            ver = hor
        if len(lables) != 0:
            eachImgWidth = int(ver.shape[1] / cols)
            eachImgHeight = int(ver.shape[0] / rows)

            # print(eachImgHeight)
            for d in range(0, rows):
                for c in range(0, cols):
                    cv2.rectangle(ver, (c*eachImgWidth, eachImgHeight*d), (c*eachImgWidth+len(
                        lables[d][c])*13+27, 30+eachImgHeight*d), (255, 255, 255), cv2.FILLED)
                    cv2.putText(ver, lables[d][c], (eachImgWidth*c+10, eachImgHeight *
                                d+20), cv2.FONT_HERSHEY_COMPLEX, 0.7, (255, 0, 255), 2)
        return ver

    # traversing into image pixels and draw the largest contour
    def largestContours(self, canny, img):
        # Finding Contour
        contours, _ = cv2.findContours(
            canny, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
        contoured_img = np.copy(img)  # Contours change original image.

        # Get all perimeter
        perimeter = []
        i = 0

        # Find perimeter for each contour i = id of contour
        for each_cnt in contours:
            prm = cv2.arcLength(each_cnt, True)
            perimeter.append([prm, i])
            i += 1

        # Sort perimeter and return 1 array with 4 points only
        perimeter = self.quick_sort(perimeter)

        unified = []
        max_index = []
        # Draw all contours
        for i in range(len(contours)):
            index = perimeter[i][1]
            max_index.append(index)
            # cv.drawContours(contoured_img, contours, index, (0, 0, 255), 2)

        # Get convexhull for max contours and draw them
        conContour = np.vstack(contours[i] for i in max_index)
        hull = cv2.convexHull(conContour)
        unified.append(hull)
        cv2.drawContours(contoured_img, unified, -1, (0, 255, 0), 2)

        # Boundingbox will be the final perimmeter of the image
        boundingBoxes = [cv2.boundingRect(c) for c in unified]
        #print("BoundingBox:", boundingBoxes)

        return contoured_img, contours, perimeter, hull, unified, boundingBoxes

    # Segmenting Largest Contour
    def grCut(self, image, bd, cx, cy, radius):
        # rectangle that contains the object

        # Rectangle will get the 4 index in the boundingBox of the contour
        global rect
        for boundingBox in bd:
            rect = (boundingBox)

        # split the Perimeter of boundingBox
        coordinates = np.array_split(rect, 2)
        # print(coordinates)

        # len(coordinates)

        # store to point variable
        pt1 = ()
        pt2 = ()
        n = 0
        for c in coordinates:
            if n == 0:
                pt1 = c
                n += 1
            else:
                pt2 = c

        #print(pt1, pt2)

        # Create 2 mask
        # Rectangular mask
        rec = np.zeros(image.shape[:2], dtype="uint8")
        cv2.rectangle(rec, (pt1), (pt2), 255, -1)
        # cv2.imshow("Rectangular Mask", rec)

        # circle mask
        circle = np.zeros(image.shape[:2], dtype="uint8")
        # subtracted 10 to original radius to eliminate excess pixels
        cv2.circle(circle, (cx, cy), int(radius) - 10, 255, -1)
        # cv2.imshow("Circle mask", circle)

        # combined using bitwise_and operator
        mask = cv2.bitwise_and(rec, circle)
        # cv2.imshow("mask", mask)

        # apply our mask -- notice how only the person in the image is
        # cropped out
        masked = cv2.bitwise_and(image, image, mask=mask)
        cv2.imshow("Mask Applied to Image", masked)

        # # # Our mask
        # mask = np.zeros(gCut.shape[:2], np.uint8)

        # Values needed for algorithm
        bgdModel = np.zeros((1, 65), np.float64)
        fgdModel = np.zeros((1, 65), np.float64)

        # Grabcut
        cv2.grabCut(image, masked, rect, bgdModel,
                    fgdModel, 5, cv2.GC_INIT_WITH_RECT)

        mask2 = np.where((mask == cv2.GC_PR_BGD) | (
            mask == cv2.GC_BGD), 0, 1).astype('uint8')
        img = image*mask2[:, :, np.newaxis]

        return img

    def contourAnalysis(self, unified, contoured_img):
        # Contour Analysis
        for contour in unified:
            # Get the image moment for contour
            M = cv2.moments(contour)

            # Calculate the centroid
            cx = int(M['m10'] / M['m00'])
            cy = int(M['m01'] / M['m00'])

            # Draw a circle to indicate the contour
            cv2.circle(contoured_img, (cx, cy), 5, (255, 0, 0), -1)

            # solving Area
            areaCon = M["m00"]

            #print("Area", areaCon)

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

            # convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

            # {GAUSSIANBLUR VALUE} kernel size is none negative & odd numbers only
            ks = 5
            sigma = 50
            # SMOOTHING(Applying GaussianBlur)
            img_blur = cv2.GaussianBlur(gray, (ks, ks), sigma)

            # CANNY(Finding Edge)
            canny = cv2.Canny(img_blur, 30, 70, L2gradient=True)

            # FINDING CONTOUR
            # Largest Contour - Not the best segmentation
            contoured_img, contours, perimeters, hull, unified, boundingBoxes = self.largestContours(
                canny, image)

            # Contour Analysis
            M, cx, cy, area, radius = self.contourAnalysis(
                unified, contoured_img)

            # Show image
            # plt.figure(figsize=[10,10])
            # plt.imshow(img_contour[:,:,::-1]),plt.axis("off")

            # Cutting the contoured nail
            img_grcut = self.grCut(image, boundingBoxes, cx, cy, radius)

            # imageArray = [image, img_blur, canny, contoured_img, img_grcut]
            # imageStacked = self.stackImages(imageArray, 0.5)

            # cv2.imshow("original", imageStacked)
            # cv2.waitKey(0)

            #canvas = np.zeros(image.shape, np.uint8)
            return image, img_blur, canny, contoured_img, img_grcut
