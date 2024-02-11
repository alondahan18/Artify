from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from routes import user_blueprint
from routes import artworks_blueprint
from db import get_db, close_db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)  # Enable CORS for all routes
    JWTManager(app)

    app.register_blueprint(user_blueprint)
    app.register_blueprint(artworks_blueprint)

    # Register database connection and cleanup
    app.teardown_appcontext(close_db)

    return app

if __name__ == '__main__':
    create_app().run(debug=True)
