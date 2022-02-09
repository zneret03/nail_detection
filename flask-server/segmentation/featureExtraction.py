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

    def __init__(self, path):
        self.path = path

    def color_moments(self, img):  # Read a color picture
        if img is None:
            return
        # RGB space converted to HSV space
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        h, s, v = cv2.split(hsv)

        color_feature = []  # Initialize color characteristics

        # One-stage moment (mean mean)
        h_mean = np.mean(h)  # np.sum(h)/float(N)
        s_mean = np.mean(s)  # np.sum(s)/float(N)
        v_mean = np.mean(v)  # np.sum(v)/float(N)
        array_mean = [h_mean, s_mean, v_mean]
        hsv_mean = np.mean(array_mean)
        color_feature.append(hsv_mean)

        h_std = np.std(h)  # np.sqrt(np.mean(abs(h - h.mean())**2))
        s_std = np.std(s)  # np.sqrt(np.mean(abs(s - s.mean())**2))
        v_std = np.std(v)  # np.sqrt(np.mean(abs(v - v.mean())**2))
        array_std = [h_std, s_std, v_std]
        hsv_std = np.mean(array_std)
        color_feature.append(hsv_std)

        h_skewness = np.mean(abs(h - h.mean()) ** 3)
        s_skewness = np.mean(abs(s - s.mean()) ** 3)
        v_skewness = np.mean(abs(v - v.mean()) ** 3)
        h_thirdMoment = h_skewness ** (1. / 3)
        s_thirdMoment = s_skewness ** (1. / 3)
        v_thirdMoment = v_skewness ** (1. / 3)
        array_skew = [h_thirdMoment, s_thirdMoment, v_thirdMoment]
        hsv_skew = skew(array_skew)
        color_feature.append(hsv_skew)

        h_kurtosis = kurtosis(h)
        s_kurtosis = kurtosis(s)
        v_kurtosis = kurtosis(v)
        array_kurtosis = [h_kurtosis, s_kurtosis, v_kurtosis]
        hsv_kurtosis = kurtosis(array_kurtosis, axis=None)
        color_feature.append(hsv_kurtosis)

        return color_feature

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

            print(image_texture_feature)
            print(image_color_feature)
