import cv2
import base64
import numpy as np
import pandas as pd
import skimage
from skimage.feature import greycomatrix, graycoprops
from skimage.measure import shannon_entropy
from scipy.stats import skew, kurtosis


class FeatureExtraction:

    SIZE = 50
    path = ""
    columns = ['h_mean', 's_mean', 'v_mean', 'h_std', 's_std', 'v_std', 'h_skew', 's_skew', 'v_skew', 'h_kurtosis',
               's_kurtosis', 'v_kurtosis']

    def __init__(self, path):
        self.path = path

    def color_moments(self, img):
        # img = cv2.imread(filename)  # Read a color picture
        img = cv2.resize(img, (50, 50))

        if img is None:
            return

        # RGB space converted to HSV space
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        h, s, v = cv2.split(hsv)

        data = []

    #  One-stage moment (mean mean)
        h_mean = np.mean(h)  # np.sum(h)/float(N)
        s_mean = np.mean(s)  # np.sum(s)/float(N)
        v_mean = np.mean(v)  # np.sum(v)/float(N)
        # One-stage moment placement feature array
        data.extend([h_mean, s_mean, v_mean])

    #  Secondary moments (standard difference STD)
        h_std = np.std(h)  # np.sqrt(np.mean(abs(h - h.mean())**2))
        s_std = np.std(s)  # np.sqrt(np.mean(abs(s - s.mean())**2))
        v_std = np.std(v)  # np.sqrt(np.mean(abs(v - v.mean())**2))
        # Second order moment placed in a feature array
        data.extend([h_std, s_std, v_std])

    #  Three-order moment (slope Skewness)
        h_skewness = np.mean(abs(h - h.mean()) ** 3)
        s_skewness = np.mean(abs(s - s.mean()) ** 3)
        v_skewness = np.mean(abs(v - v.mean()) ** 3)
        h_thirdMoment = h_skewness ** (1. / 3)
        s_thirdMoment = s_skewness ** (1. / 3)
        v_thirdMoment = v_skewness ** (1. / 3)
        # Three-order moments in the feature array
        data.extend([h_thirdMoment, s_thirdMoment, v_thirdMoment])

    #   Kurtosis

        h_kurtosis = kurtosis(h, axis=None)
        s_kurtosis = kurtosis(s, axis=None)
        v_kurtosis = kurtosis(v, axis=None)
        data.extend([h_kurtosis, s_kurtosis, v_kurtosis])

        data = np.array(data).flatten()
        color_feature = [data]

        return color_feature

    def nothing(self, x):
        pass

    def white_pixels(self, args):
        white_pix = np.sum(args == 255)

        return white_pix

    def black_pixels(self, args):
        black_pix = np.sum(args == 0)

        return black_pix

    def shape_extractor(self):
        if self.path:
            # print(self.path)
            decoded_data = base64.b64decode(self.path)
            np_data = np.fromstring(decoded_data, np.uint8)

            # decoded base64
            image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)

            # cv2.namedWindow('image')

            ret, thresh = cv2.threshold(
                image, 20, 250, cv2.THRESH_BINARY_INV)

            canny = cv2.Canny(thresh, 50, 50)

            total_area = self.black_pixels(thresh)
            perimeter_count = self.white_pixels(canny)

            contour, hierarchy = cv2.findContours(
                canny, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

            data = [[total_area, perimeter_count, 50, 50]]

            df = pd.DataFrame(
                data, columns=['Area', 'Perimeter', 'Compactness', 'Eccentricity'])

            # print(df)

            # cv2.imshow("original", thresh)
            # cv2.waitKey(0)
        # return "hello world"

    def texture_extractor(self, dataset):
        image_dataset = pd.DataFrame()
        for image in range(dataset.shape[0]):
            df = pd.DataFrame()

            img = dataset[image, :, :]

            GLCM = skimage.feature.graycomatrix(img, [1], [0])

            GLCM_Energy = skimage.feature.graycoprops(GLCM, 'energy')[0]
            df['Energy'] = GLCM_Energy

            GLCM_corr = skimage.feature.graycoprops(GLCM, 'correlation')[0]
            df['Corr'] = GLCM_corr

            GLCM_diss = skimage.feature.graycoprops(GLCM, 'dissimilarity')[0]
            df['Diss_sim'] = GLCM_diss

            GLCM_hom = skimage.feature.graycoprops(GLCM, 'homogeneity')[0]
            df['Homogen'] = GLCM_hom

            GLCM_contr = skimage.feature.graycoprops(GLCM, 'contrast')[0]
            df['Contrast'] = GLCM_contr

            entropy = shannon_entropy(img)
            df['Entropy'] = entropy

            image_dataset = image_dataset.append(df)
            break
        return image_dataset

    def texture_extraction(self):
        if self.path:

            decoded_data = base64.b64decode(self.path)
            np_data = np.fromstring(decoded_data, np.uint8)

            # decoded base64
            image = cv2.imdecode(np_data, cv2.IMREAD_UNCHANGED)

            resizeImage = cv2.resize(image, (self.SIZE, self.SIZE))

            image_texture_feature = self.texture_extractor(resizeImage)
            image_color_feature = self.color_moments(resizeImage)
            #feature_values = pd.DataFrame(self.values, columns=self.cols)
            # feature_values.reset_index()
            # print(feature_values)

            print(image_texture_feature)
            print(image_color_feature)

            # return image_texture_feature, image_color_feature
