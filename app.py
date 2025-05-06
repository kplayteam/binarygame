from flask import Flask, render_template, send_from_directory

#INIT
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

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

#RUN APP
app.run(host="0.0.0.0", port=5300, debug=False)