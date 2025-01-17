@echo off
mkdir app
mkdir app\templates
mkdir app\static
mkdir app\static\css
mkdir app\static\js
mkdir app\static\images
mkdir streamlit
mkdir tests
type NUL > app\__init__.py
type NUL > app\routes.py
type NUL > app\templates\index.html
type NUL > app\static\css\styles.css
type NUL > app\static\js\game.js
type NUL > streamlit\main.py
type NUL > tests\test_app.py
type NUL > requirements.txt
type NUL > Dockerfile
type NUL > README.md
type NUL > run.bat
echo Folder structure created successfully!
pause
