from flask import Blueprint, jsonify, request, session

main = Blueprint('main', __name__)

@main.route('/api/save_game', methods=['POST'])
def save_game():
    game_state = request.json.get('game_state')
    session['game_state'] = game_state
    return jsonify({"message": "Game state saved successfully!"})

@main.route('/api/load_game', methods=['GET'])
def load_game():
    game_state = session.get('game_state')
    return jsonify({"game_state": game_state})
