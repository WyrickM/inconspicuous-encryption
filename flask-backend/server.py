from flask import Flask
from http import HTTPStatus


app = Flask(__name__)

# Members API route
@app.route("/", methods=["GET", "POST"])
@app.route("/members", methods=["GET", "POST"])
def members():
    return {"members": ["Lucas", "Mantz", "Peyton", "Zack", "AJ"]}


# need to work on the database so we can implement the backend
@app.route("/register", methods=["GET", "POST"])
def register():
    return (""), HTTPStatus.OK


@app.route("/login", methods=["GET", "POST"])
def login():
    return (""), HTTPStatus.OK


if __name__ == "__main__":
    app.run(debug=True)
