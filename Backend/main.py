from flask import Flask
import mysql.connector
import hashlib
app = Flask(__name__)

config_db = {'user': 'root', 'password': 'rootpassword', 'host': '127.0.0.1', 'database': 'EscuelaNieve'}

if __name__ == '__main__':
    app.run(debug=True)
