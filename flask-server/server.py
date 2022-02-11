from flask import Flask, request, Response
import jsonpickle
import cv2
import base64
from PIL import Image


# Class functions
#from segmentation.segmentation import Segmentation
from segmentation.segmentation2 import ImageSegmentation
from segmentation.featureExtraction import FeatureExtraction

app = Flask(__name__)


def toBase64Format(img):
    _, buffer_image = cv2.imencode('.jpeg', img)
    data = base64.b64encode(buffer_image)
    base64_format = "data:image/jpeg;base64,{}".format(data)
    base64_split = base64_format.split("'")[1]

    return base64_split


@app.route("/featureExtraction", methods=["GET", "POST"])
def extractFeatures():
    requestJson = request.get_json()

    extract = FeatureExtraction(requestJson['file'])

    print(extract.texture_extraction())
    # print(extract.shape_extractor())

    return "Successfully Extracted"


@app.route("/images", methods=["GET", "POST"])
def receiveImages():

    if request.method == "POST":
        requestJson = request.get_json()

        #segment = Segmentation(requestJson['file'])
        segment = ImageSegmentation(requestJson['file'])
        image, img_blur, canny, img_contour, img_grcut = segment.segmentationProces()

        image = toBase64Format(image)
        img_blur = toBase64Format(img_blur)
        canny = toBase64Format(canny)
        img_contour = toBase64Format(img_contour)
        img_grcut = toBase64Format(img_grcut)

        # im_arr: image in Numpy one-dim array format.
        config = {
            "segmented": [image, img_blur, canny, img_grcut]
        }

        # "image": image,
        # "canny_edge": canny,
        # "largest_contour": img_contour,
        # "segmented_image": img_grcut

        response_pickled = jsonpickle.encode(config)

        return response_pickled


@app.route("/destroyWindows", methods=["POST"])
def destroyWindows():
    cv2.destroyAllWindows()

    config = {
        "segmented": []
    }

    response_pickled = jsonpickle.encode(config)

    return response_pickled


@ app.route("/members", methods=["GET"])
def members():
    return {"members": ["Member 1", "Member 2", "Member 2"]}


if __name__ == "__main__":
    app.run(debug=True)
