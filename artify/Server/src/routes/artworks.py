from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db

artworks_blueprint = Blueprint('artworks', __name__, url_prefix='/api/artworks')


@artworks_blueprint.route('/all_learned', methods=['GET'])
@jwt_required()
def get_all_learned_artworks():
    try:
        db = get_db()
        cursor = db.cursor()

        # Get the distinct artworks learned by any user with artist names
        select_query = """
        SELECT DISTINCT artwork.*, artist.displayName AS artist_name
        FROM artwork
        JOIN userArtworkLearn ON artwork.objectId = userArtworkLearn.objectId
        JOIN users ON users.userId = userArtworkLearn.userId
        JOIN CreatedBy ON artwork.objectId = CreatedBy.objectId
        JOIN artist ON CreatedBy.artistId = artist.artistId
        """

        cursor.execute(select_query)
        learned_artworks = cursor.fetchall()

        cursor.close()

        # Convert the result to a list of dictionaries using column names
        artworks_list = [
            {
                'objectId': artwork[0],
                'title': artwork[1],
                'objectName': artwork[2],
                'objectBeginDate': artwork[3],
                'objectEndDate': artwork[4],
                'medium': artwork[5],
                'classification': artwork[6],
                'primaryImage': artwork[7],
                'artist_name': artwork[8]
            }
            for artwork in learned_artworks
        ]

        return jsonify({'all_learned_artworks': artworks_list})

    except Exception as e:
        return jsonify({'error': f'Unexpected error during all learned artworks retrieval: {str(e)}'}), 500




@artworks_blueprint.route('/learned', methods=['GET'])
@jwt_required()
def get_learned_artworks():
    try:
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
        artworks_list = [{'objectId': artwork[0], 'title': artwork[1], 'objectName': artwork[2], 'objectBeginDate': artwork[3], 'objectEndDate': artwork[4], 'medium': artwork[5], 'classification': artwork[6], 'primaryImage': artwork[7], 'artist_name': artwork[8]} for artwork in learned_artworks]

        return jsonify({'learned_artworks': artworks_list})

    except Exception as e:
        return jsonify({'error': f'Unexpected error during learned artworks retrieval: {str(e)}'}), 500


@artworks_blueprint.route('/filters', methods=['GET'])
@jwt_required()
def get_unique_lists():
    try:
        db = get_db()
        cursor = db.cursor()

        select_query = """
        SELECT DISTINCT 'artist_names' AS columnName, artist.displayName AS filterOption FROM artist
        UNION 
        SELECT DISTINCT 'artist_nationalities' AS columnName, artist.nationality AS filterOption FROM artist
        UNION 
        SELECT DISTINCT 'artwork_classification' AS columnName, artwork.classification AS filterOption FROM artwork
        UNION  
        SELECT DISTINCT 'artwork_medium' AS columnName, artwork.medium AS filterOption FROM artwork
        ORDER BY filterOption;
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

    except Exception as e:
        return jsonify({'error': f'Unexpected error during filters retrieval: {str(e)}'}), 500


def get_dimensions():
    size_to_product = {
        'Small': (0, 400),
        'Medium': (401, 800),
        'Large': (801, 999999),  # Use a large number as an approximation for infinity
    }
    return size_to_product


@artworks_blueprint.route('/filter_results', methods=['POST'])
@jwt_required()
def filter_artworks():
    try:
        db = get_db()
        cursor = db.cursor()

        current_user = get_jwt_identity()
        filters = request.get_json()

        select_query = """
        SELECT DISTINCT artwork.*, artist.displayName AS artist_name
        FROM artwork
        LEFT JOIN CreatedBy ON CreatedBy.ObjectID = artwork.objectID
        LEFT JOIN artist ON artist.artistID = CreatedBy.artistID
        LEFT JOIN Measurements ON artwork.objectID = Measurements.objectID
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
            elif key == 'artwork_classification':
                if values:
                    conditions.append(f"artwork.classification IN ({', '.join(map(lambda v: f'{v!r}', values))})")
            elif key == 'artwork_medium':
                if values:
                    conditions.append(f"artwork.medium IN ({', '.join(map(lambda v: f'{v!r}', values))})")
            elif key == 'gender':
                if values:
                    conditions.append(f"artist.gender IN ({', '.join(map(lambda v: f'{v!r}', values))})")

            elif key == 'time_range':
                if values and 'minYear' in values and 'maxYear' in values:
                    min_year = values['minYear']
                    max_year = values['maxYear']
                    conditions.append(f"artwork.objectEndDate BETWEEN {min_year} AND {max_year}")

            elif key == 'dimensions':
                if values:
                    size_to_product = get_dimensions()
                    size_conditions = []
                    for size in values:
                        if size in size_to_product:
                            min_threshold, max_threshold = size_to_product[size]
                            size_conditions.append(f"""
                                (
                                    CASE
                                        WHEN COALESCE(Measurements.height, 1) = -1 THEN COALESCE(Measurements.length, 1) * COALESCE(Measurements.width, 1)
                                        WHEN COALESCE(Measurements.length, 1) = -1 THEN COALESCE(Measurements.height, 1) * COALESCE(Measurements.width, 1)
                                        WHEN COALESCE(Measurements.width, 1) = -1 THEN COALESCE(Measurements.height, 1) * COALESCE(Measurements.length, 1)
                                        ELSE COALESCE(Measurements.height, 1) * COALESCE(Measurements.length, 1) * COALESCE(Measurements.width, 1)
                                    END
                                    BETWEEN {min_threshold} AND {max_threshold}
                                )
                            """)

                            
                    if size_conditions:
                        conditions.append(f"({' OR '.join(size_conditions)})")

            elif key == 'get_oldest_artworks':
                if values:  # Check if the value is True
                    conditions.append("""
                        artwork.objectEndDate = (SELECT MIN(x.objectEndDate) FROM artwork x)
                    """)

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
    
    except Exception as e:
        return jsonify({'error': f'Unexpected error during artwork filtering: {str(e)}'}), 500


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


