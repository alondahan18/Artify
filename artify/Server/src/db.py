import mysql.connector
from flask import current_app, g
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host=current_app.config['DB_HOST'],
            user=current_app.config['DB_USER'],
            passwd=current_app.config['DB_PASSWORD'],
            database=current_app.config['DB_NAME']
        )

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
