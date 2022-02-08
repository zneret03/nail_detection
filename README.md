# Finger Nail Disease Detection

Finger Nail Disease Detection is a standalone application that will detect the early stage of systemic disease using the color and texture of the fingernails in our hands, this project automatically detect the anomalies and output a early stage of differeny systemic diseases, also this project use SVM supervised machine learning approach along with canny edge detection for finger nail edge detection also this project is built in python flask for backend and electron + reactjs in front-end.

![demo](https://github.com/zneret03/drilon7/blob/development/static/preview.png)

## Technologies

- [reactjs](https://reactjs.org/)
- [python](https://www.python.org/)
- [sass](https://sass-lang.com/)
- [flask](https://flask.palletsprojects.com/en/2.0.x/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

```
npm install npm@latest -g
```

###Installation
To install python dependencies go to flask folder `cd flask-server` then create a python virtual environment, hover to your terminal and copy and paste this code `python3 -m venv venv`, in order to run virtual environment use this command

- Windows Powershell

```
.  .\venv\Scripts\activate.ps1
```

- Linux Terminal

```
source ./venv/bin/activate
```

## Dependecies

```
pip install -r requirements.txt
```

2. Install reactjs dependecies, hover to your terminal and `cd client`, then copy and paste this code below.

```
npm install
```

## Development

Running the development you will need two things.

1. Go to the client folder `cd client` and run this command using your terminal

```
npm run dev
```

2. To run the flask-server go to the flask-server folder `cd flask-server` and run this command.

```
python server.py
or
python3 server.py
```
