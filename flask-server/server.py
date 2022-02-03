from flask import Flask
from flask import request
from segmentation.segmentation import Segmentation

app = Flask(__name__)


@app.route("/images", methods=["GET", "POST"])
def receiveImages():

    if request.method == "POST":
        requestJson = request.get_json()
        imageSegment = Segmentation(requestJson['path'])

        print(imageSegment.segmentationProces())

        return "Success"


@app.route("/members", methods=["GET"])
def members():
    return {"members": ["Member 1", "Member 2", "Member 2"]}


if __name__ == "__main__":
    app.run(debug=True)
