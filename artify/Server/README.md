# Artify Project - Server

## Getting Started

These instructions will help you set up and run the server on your local machine.

### Prerequisites

- Python 3.x installed
- A code editor or IDE of your choice


### Setting Up Virtual Environment

1. Open your terminal or command prompt.

2. Navigate to the server directory.

3. Create a virtual environment:
    ```bash
    python -m venv .venv
    ```

4. Activate the virtual environment:
    ```bash
    .venv\Scripts\activate
    ```

Your terminal prompt should now indicate the active virtual environment.

### Installing Dependencies

1. Ensure the virtual environment is activated.

2. Install required dependencies using:
    ```bash
    pip install -r requirements.txt
    ```

### Configuration
Create a .env file in the server directory and add the necessary environment variables:
```bash
FLASK_SECRET_KEY=your_flask_secret_key
FLASK_JWT_SECRET_KEY=your_jwt_secret_key
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

Make sure to replace placeholders like `your_flask_secret_key`, `your_jwt_secret_key`, and others with the actual values.

### Running the Server

1. Ensure the virtual environment is activated.

2. Navigate to the src directory.

3. Run the following command to start the Flask server:
    ```bash
    python main.py
    ```


