import cv2
import numpy as np
from matplotlib import pyplot as plt


class Segmentation:

    path = ""

    perimeter = []
    unified = []
    max_index = []
    max_perim = [0, 0]

    i = 0
    ks_width = 7
    ks_height = 15
    sigma_x = 50
    sigma_y = 40
    dst = None

    def __init__(self, path):
        self.path = path

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

    def showImages(self, imgs, titles):
        for i in range(0, 4):
            plt.subplot(
                141+i), plt.imshow(imgs[i], 'gray'), plt.title(titles[i])
            plt.xticks([]), plt.yticks([])
        plt.show()

    def segmentationProces(self):
        if self.path:
            # convert to grayscale
            image = cv2.imread(self.path, 0)

            # Blur the image
            img_blur = cv2.GaussianBlur(
                image, (self.ks_width, self.ks_height), self.sigma_x, self.dst, self.sigma_y)

            canny = cv2.Canny(img_blur, 8, 20, L2gradient=True)

            # Finding Contour
            contours, hierarchy = cv2.findContours(
                canny, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

            img_contour = np.copy(image)

            # Find perimeter for each contour i = id of contour
            for each_cnt in contours:
                prm = cv2.arcLength(each_cnt, False)
                self.perimeter.append([prm, self.i])
                self.i += 1

            # Sort Them
            perimeter = self.quick_sort(self.perimeter)

            for i in range(0, 3):
                index = perimeter[i][1]
                self.max_index.append(index)
                cv2.drawContours(img_contour, contours, index, (255, 0, 0), 3)

            # Get convex hull for max contours and draw them
            cont = np.vstack(contours[i] for i in self.max_index)
            hull = cv2.convexHull(cont)
            self.unified.append(hull)
            cv2.drawContours(img_contour, self.unified, -1, (0, 0, 255), 3)

            # images = []
            # titles = ["Binary_img", "Blurred_img", "Canny_edge", "Contour"]

            # self.showImages(images, titles)
            return image, img_blur, canny, img_contour
