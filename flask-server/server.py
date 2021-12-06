from flask import Flask
from flask import request

app = Flask(__name__)


@app.route("/images", methods=["POST"])
def receiveImages():
    return request.json


@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2", "Member 2"]}


if __name__ == "__main__":
    app.run(debug=True)
