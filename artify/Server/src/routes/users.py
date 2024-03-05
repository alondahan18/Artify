from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db

user_blueprint = Blueprint('user', __name__, url_prefix='/api/user')


# Registration route
@user_blueprint.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        first_name = data.get('firstName', 'Unknown')  # Default to 'Unknown' if not provided
        last_name = data.get('lastName', 'Unknown')  # Default to 'Unknown' if not provided
        gender = data.get('gender', 'Unknown')  # Default to 'Unknown' if not provided
        number_of_solved_arts = 0
        score = 0

        db = get_db()
        cursor = db.cursor()

        # Check if the username is already taken
        select_query = "SELECT * FROM users WHERE username = %s"
        cursor.execute(select_query, (username,))
        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            return jsonify({'error': 'Username already taken'}), 400

        # Hash the password
        password_hash = generate_password_hash(password, method='pbkdf2:sha256')

        # Store user data in the database
        insert_query = """
            INSERT INTO users (username, password, firstName, lastName, gender, score, numberOfSolvedArts)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (username, password_hash, first_name, last_name, gender, score, number_of_solved_arts))

        db.commit()
        cursor.close()

        # Create a JWT for the registered user
        access_token = create_access_token(identity=username)

        return jsonify({'message': 'Registration successful', 'access_token': access_token})

    except Exception as e:
        return jsonify({'error': f'Unexpected error during registration: {str(e)}'}), 500



# Login route
@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        db = get_db()
        cursor = db.cursor(dictionary=True)  # Use dictionary cursor for easier access to column names

        # Check if the username exists
        select_query = "SELECT * FROM users WHERE username = %s"
        cursor.execute(select_query, (username,))
        user = cursor.fetchone()

        if user and check_password_hash(user['password'], password):
            # Create a JWT for the logged-in user
            access_token = create_access_token(identity=username)
            return jsonify({'message': 'Login successful', 'access_token': access_token})

        return jsonify({'error': 'Login failed: Wrong username or password'}), 401

    except Exception as e:
        return jsonify({'error': f'Unexpected error during login: {str(e)}'}), 500



# Logout route
@user_blueprint.route('/logout', methods=['POST'])
@jwt_required()  # Requires a valid access token
def logout():
    resp = jsonify({'message': 'Logout successful'})
    unset_jwt_cookies(resp)  # Unset JWT cookies to remove access token
    return resp


# Delete user route
@user_blueprint.route('/delete', methods=['POST'])
@jwt_required()
def delete_user():
    try:
        current_user = get_jwt_identity()

        db = get_db()
        cursor = db.cursor()

        # Check if the user exists
        select_query = "SELECT * FROM users WHERE username = %s"
        cursor.execute(select_query, (current_user,))
        existing_user = cursor.fetchone()

        if not existing_user:
            cursor.close()
            return jsonify({'error': 'User not found'}), 404

        # Delete the user
        delete_query = "DELETE FROM users WHERE username = %s"
        cursor.execute(delete_query, (current_user,))
        db.commit()
        cursor.close()

        return jsonify({'message': 'User deleted successfully'})

    except Exception as e:
        return jsonify({'error': f'Unexpected error during user deletion: {str(e)}'}), 500



# Route to get the scores
@user_blueprint.route('/score', methods=['GET'])
@jwt_required()
def get_user_score():
    try:
        current_user = get_jwt_identity()

        db = get_db()
        cursor = db.cursor()

        # Execute the SQL query
        select_query = "SELECT score FROM users WHERE username = %s"
        cursor.execute(select_query, (current_user,))
        user_score = cursor.fetchone()  # Fetch a single row

        cursor.close()

        if user_score:
            score = user_score[0]  # Assuming the score is in the first column
            return jsonify({'score': score})
        else:
            return jsonify({'error': 'User score not found'}), 404

    except Exception as e:
        return jsonify({'error': f'Unexpected error during score retrieval: {str(e)}'}), 500



# Route to get the users with a score above the average
@user_blueprint.route('/above_average', methods=['GET'])
@jwt_required()
def get_users_above_average():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)

        # Get users with a score above the average using a nested subquery
        above_avg_query = """
        SELECT username, score
        FROM users
        WHERE score > (SELECT AVG(score) FROM users)
        """

        cursor.execute(above_avg_query)
        above_avg_users = cursor.fetchall()

        cursor.close()

        # Convert the result to a list of dictionaries
        users_list = [{'username': user['username'], 'score': user['score']} for user in above_avg_users]

        return jsonify({'above_average_users': users_list})

    except Exception as e:
        return jsonify({'error': f'Unexpected error during above-average users retrieval: {str(e)}'}), 500
