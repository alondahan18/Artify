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


@artworks_blueprint.route('/filter_results', methods=['POST'])
@jwt_required()
def filter_artworks():
    db = get_db()
    cursor = db.cursor()

    current_user = get_jwt_identity()
    filters = request.get_json()

    select_query = """
        SELECT DISTINCT artwork.*, artist.displayName AS artist_name
        FROM artwork
        LEFT JOIN CreatedBy ON CreatedBy.ObjectID = artwork.objectID
        LEFT JOIN artist ON artist.artistID = CreatedBy.artistID
    """

    conditions = []
    # Build conditions based on filter choices
    for key, values in filters.items():
        if key == 'artist_names':
            if values:
                conditions.append(f"artist.displayName IN ({', '.join(map(lambda v: f'{v!r}', values))})")
        elif key == 'artist_nationalities':
            if values:
                conditions.append(f"artist.nationality IN ({', '.join(map(lambda v: f'{v!r}', values))})")
        elif key == 'artwork_culture':
            if values:
                conditions.append(f"artwork.culture IN ({', '.join(map(lambda v: f'{v!r}', values))})")
        elif key == 'artwork_classification':
            if values:
                conditions.append(f"artwork.classification IN ({', '.join(map(lambda v: f'{v!r}', values))})")
        elif key == 'artwork_period':
            if values:
                conditions.append(f"artwork.period IN ({', '.join(map(lambda v: f'{v!r}', values))})")
        elif key == 'artwork_medium':
            if values:
                conditions.append(f"artwork.medium IN ({', '.join(map(lambda v: f'{v!r}', values))})")
        elif key == 'get_oldest_artworks':
            if values:  # Check if the value is True
                conditions.append("""
                    artwork.objectEndDate = (SELECT MIN(x.objectEndDate) FROM artwork x)
                """)
        elif key == 'get_different_countries': 
            if values:  # Check if the value is True
                subquery = "SELECT artwork.objectID FROM artwork " \
                   "JOIN Geography g ON artwork.objectID = g.objectID " \
                   "JOIN CreatedBy c ON artwork.objectID = c.objectID " \
                   "JOIN Artist ar ON c.artistID = ar.artistID " \
                   "WHERE g.country <> ar.nationality"
                conditions.append(f"artwork.objectID IN ({subquery})")

    # Add condition to exclude artworks the user has already studied
    conditions.append("""
        NOT EXISTS (
            SELECT 1
            FROM userArtworkLearn
            JOIN users ON userArtworkLearn.userId = users.userId
            WHERE userArtworkLearn.objectId = artwork.objectId
            AND users.username = %s )
    """)


    if conditions:
        where_clause = " AND ".join(conditions)
        select_query += f" WHERE {where_clause}"

    cursor.execute(select_query, (current_user,))
    artworks = cursor.fetchall()
    cursor.close()

    return jsonify(artworks)


@artworks_blueprint.route('/update_test_results', methods=['POST'])
@jwt_required()
def update_learned_artworks():
    current_user = get_jwt_identity()

    data = request.get_json()
    learned_artwork_ids = data.get('learned_artwork_ids', [])
    experience_points = data.get('experience_points')

    db = get_db()
    cursor = db.cursor()

    try:
        for artwork_id in learned_artwork_ids:
            cursor.execute("""
                INSERT INTO userArtworkLearn (userId, objectId)
                VALUES ((SELECT userId FROM users WHERE username = %s), %s)
            """, (current_user, artwork_id))

        cursor.execute("""
            UPDATE users
            SET score = COALESCE(score, 0) + %s,
                numberOfSolvedArts = COALESCE(numberOfSolvedArts, 0) + %s
            WHERE username = %s
        """, (experience_points, len(learned_artwork_ids), current_user))

        db.commit()
        cursor.close()

        return jsonify({'message': 'Artworks successfully updated and experience points added'})

    except Exception as e:
        # Handle exceptions, rollback changes if needed
        db.rollback()
        cursor.close()
        return jsonify({'error': str(e)}), 500


