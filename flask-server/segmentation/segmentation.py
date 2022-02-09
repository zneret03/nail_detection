from typing import Sized
import cv2
import numpy as np
from matplotlib import pyplot as plt
import io
from PIL import Image
import base64


class Segmentation:

    # Default values
    path = ""

    Size = 50
    perimeter = []
    unified = []
    max_index = []
    max_perim = [0, 0]

    i = 0
    ks_width = 5
    ks_height = 5
    sigma_x = 20
    sigma_y = 20
    dst = None

    lower = [1, 0, 20]
    upper = [60, 40, 220]

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

    # # Showing multiple images in open computer vision
    # def stackImages(self, imgArray, scale, lables=[]):
    #     rows = len(imgArray)
    #     cols = len(imgArray[0])
    #     rowsAvailable = isinstance(imgArray[0], list)
    #     width = imgArray[0][0].shape[1]
    #     height = imgArray[0][0].shape[0]
    #     if rowsAvailable:
    #         for x in range(0, rows):
    #             for y in range(0, cols):
    #                 imgArray[x][y] = cv2.resize(
    #                     imgArray[x][y], (0, 0), None, scale, scale)
    #                 if len(imgArray[x][y].shape) == 2:
    #                     imgArray[x][y] = cv2.cvtColor(
    #                         imgArray[x][y], cv2.COLOR_GRAY2BGR)
    #         imageBlank = np.zeros((height, width, 3), np.uint8)
    #         hor = [imageBlank]*rows
    #         hor_con = [imageBlank]*rows
    #         for x in range(0, rows):
    #             hor[x] = np.hstack(imgArray[x])
    #             hor_con[x] = np.concatenate(imgArray[x])
    #         ver = np.vstack(hor)
    #         ver_con = np.concatenate(hor)
    #     else:
    #         for x in range(0, rows):
    #             imgArray[x] = cv2.resize(
    #                 imgArray[x], (0, 0), None, scale, scale)
    #             if len(imgArray[x].shape) == 2:
    #                 imgArray[x] = cv2.cvtColor(imgArray[x], cv2.COLOR_GRAY2BGR)
    #         hor = np.hstack(imgArray)
    #         hor_con = np.concatenate(imgArray)
    #         ver = hor
    #     if len(lables) != 0:
    #         eachImgWidth = int(ver.shape[1] / cols)
    #         eachImgHeight = int(ver.shape[0] / rows)
    #         # print(eachImgHeight)
    #         for d in range(0, rows):
    #             for c in range(0, cols):
    #                 cv2.rectangle(ver, (c*eachImgWidth, eachImgHeight*d), (c*eachImgWidth+len(
    #                     lables[d][c])*13+27, 30+eachImgHeight*d), (255, 255, 255), cv2.FILLED)
    #                 cv2.putText(ver, lables[d][c], (eachImgWidth*c+10, eachImgHeight *
    #                             d+20), cv2.FONT_HERSHEY_COMPLEX, 0.7, (255, 0, 255), 2)
    #     return ver

    # traversing into image pixels and draw the largest contour
    def largestContours(self, canny, img):

        # Finding Contour
        contours, hierarchy = cv2.findContours(
            canny, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
        img_contour = np.copy(img)  # Contours change original image.
        # cv2.drawContours(img_contour, contours, -1, (0,255,0), 3) # Draw all - For visualization only

        # Contours -  maybe the largest perimeters pinpoint to the leaf?
        perimeter = []
        max_perim = [0, 0]
        i = 0

        # Find perimeter for each contour i = id of contour
        for each_cnt in contours:
            prm = cv2.arcLength(each_cnt, True)
            perimeter.append([prm, i])
            i += 1

        # Sort them
        perimeter = self.quick_sort(perimeter)

        unified = []
        max_index = []
        # Draw max contours
        for i in range(0, 10):
            index = perimeter[i][1]
            max_index.append(index)
            cv2.drawContours(img_contour, contours, index, (0, 0, 255), 2)

        # Get convex hull for max contours and draw them
        cont = np.vstack(contours[i] for i in max_index)
        hull = cv2.convexHull(cont)
        unified.append(hull)
        cv2.drawContours(img_contour, unified, -1, (0, 255, 0), 3)

        return img_contour, contours, perimeter, hull

    # Segmenting Largest Contour
    def grCut(self, hull, img):
        # First create our rectangle that contains the object
        y_corners = np.amax(hull, axis=0)
        x_corners = np.amin(hull, axis=0)
        x_min = x_corners[0][1]
        x_max = x_corners[0][1]
        y_min = y_corners[0][1]
        y_max = y_corners[0][1]
        rect = (x_min, x_max, y_min, y_max)

        # Our mask
        mask = np.zeros(img.shape[:2], np.uint8)

        # Values needed for algorithm
        bgdModel = np.zeros((1, 65), np.float64)
        fgdModel = np.zeros((1, 65), np.float64)

        # Grabcut
        cv2.grabCut(img, mask, rect, bgdModel,
                    fgdModel, 5, cv2.GC_INIT_WITH_RECT)

        mask2 = np.where((mask == cv2.GC_PR_BGD) | (
            mask == cv2.GC_BGD), 0, 1).astype('uint8')
        img = img*mask2[:, :, np.newaxis]

        return img

    def segmentationProces(self):

        if self.path:

            # convert base64 to actual image file
            image = self.path.split(",")[1]
            decoded_data = base64.b64decode(image)
            np_data = np.fromstring(decoded_data, np.uint8)

            # decoded base64
            image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)

            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            # SMOOTHING(Applying GaussianBlur)
            img_blur = cv2.GaussianBlur(
                gray, (self.ks_width, self.ks_height), self.sigma_x, self.dst, self.sigma_y)

            # CANNY(Finding Edge)
            canny = cv2.Canny(img_blur, 40, 70, L2gradient=True)

            # FINDING CONTOUR
            # Largest Contour - Not the best segmentation
            img_contour, contours, perimeters, hull = self.largestContours(
                canny, image)

            # create NumPy arrays from the boundaries
            lower = np.array(self.lower, dtype="uint8")
            upper = np.array(self.upper, dtype="uint8")

            # Cutting the contoured nail
            img_grcut = self.grCut(hull, image)

            canvas = np.zeros(image.shape, np.uint8)

            return image, img_blur, canny, img_contour, img_grcut
            # imageArray = ([image, img_blur, canny, img_contour, img_grcut])
            # imageStacked = self.stackImages(imageArray, 0.5)

            # cv2.imshow("original", imageStacked)
            # cv2.waitKey(0)
