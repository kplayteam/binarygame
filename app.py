#import eventlet
#eventlet.monkey_patch()

from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit, send
from tinydb import TinyDB, Query
import time


#INIT
app = Flask(__name__)
socketio = SocketIO(app)
app.config["TEMPLATES_AUTO_RELOAD"] = True

db = TinyDB('db.json')
leaders_table = db.table('leaders')
admin_table = db.table('admin')

#Initialize admin table
if len(admin_table) == 0:
    admin_table.insert_multiple([
        {"type" : "gameType", "value" : "none"},
        {"type" : "endTime", "value" : 0}
    ])

#ROUTES
@app.route("/")
def index():
    return "<html><body><script>window.location.replace('/binary_game')</script></body></html>"

@app.route("/binary_game")
def binary_game():
    return render_template("game.html")

@app.route("/binary_game/admin")
def binary_game_admin():
    return render_template("admin.html")

@app.route("/binary_game/admin/login")
def binary_game_login():
    return render_template("login.html")

@app.route('/assets/<path:path>')
def static_proxy_assets(path):
    return send_from_directory('static', 'assets/' + path)

@app.route('/phaser/<path:path>')
def static_proxy_phaser(path):
    return send_from_directory('static', 'phaser/' + path)

@app.route('/scenes/<path:path>')
def static_proxy_scenes(path):
    return send_from_directory('static', 'scenes/' + path)

@app.route('/binary_game/assets/<path:path>')
def static_proxy_assets2(path):
    return send_from_directory('static', 'assets/' + path)

@app.route('/binary_game/phaser/<path:path>')
def static_proxy_phaser2(path):
    return send_from_directory('static', 'phaser/' + path)

@app.route('/binary_game/scenes/<path:path>')
def static_proxy_scenes2(path):
    return send_from_directory('static', 'scenes/' + path)

#SOCKETIO
@socketio.on('get_admin')
def handle_admin(data):
    Item = Query()
    gameType = admin_table.get(Item.type == 'gameType').get("value")
    endTime = admin_table.get(Item.type == 'endTime').get("value")
    admin_data = {
        "binaryGame" : gameType == "binaryGame",
        "decimalGame" : gameType == "decimalGame",
        "totalSeconds" : max(endTime - int(time.time()), 0)
    }
    if admin_data["totalSeconds"] == 0 and gameType != "none":
        handle_game_end(data)
        admin_data["binaryGame"] = False
        admin_data["decimalGame"] = False
    emit('admin_data', admin_data)

@socketio.on("clear_database")
def handle_clear_database(data):
    handle_game_end(data)
    leaders_table.truncate()
    broadcast_leaders_data()

@socketio.on("reset_player_data")
def handle_reset_player_data(data):
    Item = Query()
    if data.get("gameType") == "binaryGame":
        leaders_table.update({"binaryData" : {
            "binaryCorrect": 0,
            "binaryScore": 0
        }})
    elif data.get("gameType") == "decimalGame":
        leaders_table.update({"decimalData" : {
            "decimalCorrect" : 0,
            "decimalScore" : 0
        }})
    broadcast_leaders_data()    

@socketio.on("game_end")
def handle_game_end(data):
    Item = Query()
    admin_table.update({"value" : "none"}, Item.type == 'gameType')
    admin_table.update({"value" : 0}, Item.type == 'endTime')

@socketio.on("game_start")
def handle_binary_start(data):
    Item = Query()
    total_seconds = data.get("minutes") * 60
    gameType = data.get("gameType")
    endTime = int(time.time()) + total_seconds
    admin_table.update({"value" : gameType}, Item.type == 'gameType')
    admin_table.update({"value" : endTime}, Item.type == 'endTime')

@socketio.on("get_leaders")
def handle_get_leaders(data):
    leaders_data = get_leaders_data()
    emit("leaders_data", leaders_data)

def get_leaders_data():
    leaders_data = { "items": []}
    items = leaders_table.all()
    for item in items:
        user = dict(item)
        user["totalScore"] = user["binaryData"]["binaryScore"] + user["decimalData"]["decimalScore"]
        user["totalCorrectAnswers"] = user["binaryData"]["binaryCorrect"] + user["decimalData"]["decimalCorrect"]
        leaders_data["items"].append(user)
    return leaders_data    

def broadcast_leaders_data():
    leaders_data = get_leaders_data()
    emit("leaders_data", leaders_data, broadcast=True)

@socketio.on("get_leaders_length")
def handle_get_leaders_length(data):
    emit("leaders_length", {"numUsers" : len(leaders_table)})

@socketio.on("new_user")
def handle_new_user(data):
    username = data.get("username")
    if not username or username == "": return
    Item = Query()
    if leaders_table.get(Item.username == username) != None: return
    print(f"add user: {username}")
    user_data = {
        "username" : username,
        "gig" : 3,
        "time" : 0,
        "binaryData" : {
            "binaryCorrect": 0,
            "binaryScore": 0
        },
        "decimalData" : {
            "decimalCorrect" : 0,
            "decimalScore" : 0
        }
    }
    leaders_table.insert(user_data)
    broadcast_leaders_data()

#RUN APP
print("Server port: 5300")
socketio.run(app, host="0.0.0.0", port=5300, use_reloader=False, allow_unsafe_werkzeug=True)