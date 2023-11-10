from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World! I hope this works!'

@app.route('/about')
def about():
    return 'About'
