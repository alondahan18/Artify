from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db

artworks_blueprint = Blueprint('artworks', __name__, url_prefix='/api/artworks')


@artworks_blueprint.route('/learned', methods=['GET'])
@jwt_required()
def get_learned_artworks():
    current_user = get_jwt_identity()  # This is the username, not user ID

    db = get_db()
    cursor = db.cursor()

    # Get the artworks learned by the current user with artist names
    select_query = """
    SELECT artwork.*, artist.displayName AS artist_name
    FROM artwork
    JOIN userArtworkLearn ON artwork.objectId = userArtworkLearn.objectId
    JOIN users ON users.userId = userArtworkLearn.userId
    JOIN CreatedBy ON artwork.objectId = CreatedBy.objectId
    JOIN artist ON CreatedBy.artistId = artist.artistId
    WHERE users.username = %s
    """

    cursor.execute(select_query, (current_user,))
    learned_artworks = cursor.fetchall()

    cursor.close()

    # Convert the result to a list of dictionaries using column names
    artworks_list = [{'objectId': artwork['objectId'], 'title': artwork['title'], 'artist_name': artwork['artist_name']} for artwork in learned_artworks]

    return jsonify({'learned_artworks': artworks_list})


@artworks_blueprint.route('/filters', methods=['GET'])
@jwt_required()
def get_unique_lists():
    db = get_db()
    cursor = db.cursor()

    select_query = """
    SELECT DISTINCT 'artist_names' AS columnName, artist.displayName AS filterOption FROM artist
    UNION 
    SELECT DISTINCT 'artist_nationalities' AS columnName, artist.nationality AS filterOption FROM artist
    UNION 
    SELECT DISTINCT 'artwork_culture' AS columnName, artwork.culture AS filterOption FROM artwork
    UNION 
    SELECT DISTINCT 'artwork_classification' AS columnName, artwork.classification AS filterOption FROM artwork
    UNION 
    SELECT DISTINCT 'artwork_period' AS columnName, artwork.period AS filterOption FROM artwork
    UNION 
    SELECT DISTINCT 'artwork_medium' AS columnName, artwork.medium AS filterOption FROM artwork
    """

    cursor.execute(select_query)
    unique_lists = cursor.fetchall()

    unique_lists_dict = {}
    for row in unique_lists:
        columnName, option = row[0], row[1]
        if columnName not in unique_lists_dict.keys():
            unique_lists_dict[columnName] = []
        unique_lists_dict[columnName].append(option)

    cursor.close()

    return jsonify(unique_lists_dict)


