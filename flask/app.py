from flask import Flask
from flask_cors import CORS
from random import randint


app = Flask(__name__)
CORS(app)


#Test Route
@app.route('/')
def index():
    return "Hello World!"




@app.route('/tone')
def tone():
    tone = ["humorous", "ironic", "cynical"]
    value = randint(0,2)
    return tone[value]


# if __name__ == '__main__':
#     app.run(host='http://localhost:3002', port=5000, debug=True)