from flask import Flask

app = Flask(__name__)

# Example configuration
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['DEBUG'] = True

# Importing routes after app configuration
from app import routes

# Example of error handling
@app.errorhandler(404)
def not_found_error(error):
    return "404 Error: Page Not Found", 404

@app.errorhandler(500)
def internal_error(error):
    return "500 Error: Internal Server Error", 500
