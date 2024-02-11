import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

class Config:
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY') or 'default_fallback_secret_key'
    JWT_SECRET_KEY = os.environ.get('FLASK_JWT_SECRET_KEY') or 'default_fallback_jwt_secret_key'

    DB_HOST = os.environ.get('DB_HOST') or 'localhost'
    DB_USER = os.environ.get('DB_USER') or 'root'
    DB_PASSWORD = os.environ.get('DB_PASSWORD')
    DB_NAME = os.environ.get('DB_NAME') or 'artifydb'