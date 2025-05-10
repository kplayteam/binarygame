var demo = {};
demo.taptostart = function () { };

//Font Config
// WebFontConfig = {
//     //'active' means all requested fonts have finished loading
//     //We set a 1 second delay before calling 'createText'.
//     active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

//     //The Google Fonts we want to load (specify as many as you like in the array)
//     google: {
//       families: ['Space Mono']
//     }
// };

var statusText;
var tapText;

demo.taptostart.prototype = {
    preload: function () {
        //All Devices Config
        TapToStartDeviceConfig();

        //Clickable text to start the game
        tapText = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: textFontSize, font: 'Pixel Digivolve', fill: '#00D928' });
        tapText.anchor.setTo(0.5, 0.5);
        tapText.inputEnabled = true;
        tapText.events.onInputUp.add(up, this);
    },
    create: function () {
        //Loading Assets
        game.load.onLoadStart.add(loadStart, this);
        game.load.onFileComplete.add(fileComplete, this);
        game.load.onLoadComplete.add(loadComplete, this);
        start();
        game.stage.backgroundColor = '#000000';
    },
    update: function () {
    }
};

function createText() { }

//Loading Assets and JSON Data
function start() {
    game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');
    game.load.json(jsonLoader, 'assets/data.json');

    game.load.audio('loading', 'assets/audio/loading.mp3');
    game.load.audio('server', 'assets/audio/server.mp3');
    game.load.audio('btnClick', 'assets/audio/click.mp3');
    game.load.audio('typing', 'assets/audio/typing.mp3');
    game.load.audio('cardflip', 'assets/audio/card-flip.mp3');
    game.load.audio('correct', 'assets/audio/correct-choice.mp3');
    game.load.audio('wrong', 'assets/audio/wrong-choice.mp3');
    game.load.audio('switchon', 'assets/audio/switch-on.mp3');
    game.load.audio('switchoff', 'assets/audio/switch-off.mp3');
    game.load.audio('keypress', 'assets/audio/key-press.mp3');
    game.load.audio("combo-full", "assets/audio/newlevel.mp3");
    game.load.audio("smash", "assets/audio/poof_chatter.mp3");
    game.load.audio('error', 'assets/audio/error.mp3');

    game.load.image('eraser', 'assets/images/eraser.png');
    game.load.image('bug', 'assets/images/bug.png');
    game.load.image('submit', 'assets/images/submit.png');
    game.load.image('back', 'assets/images/backbutton.png');
    game.load.image("close", "assets/images/closebutton.png");
    game.load.image("tries", "assets/images/tries.png");
    game.load.image("correctanswers", "assets/images/correctanswers.png");
    game.load.image("wronganswer", "assets/images/wronganswer.png");
    game.load.image("decimalinput", "assets/images/decimalinput.png");
    game.load.image("binarykeypad", "assets/images/binarykeypad.png");
    game.load.image("inputbox", "assets/images/inputbox.png");
    game.load.image("points", "assets/images/kidocoin.png");
    game.load.image("rank", "assets/images/level.png");
    game.load.image("time", "assets/images/time.png");
    game.load.image("dots", "assets/images/dots.png");
    game.load.image("panel", "assets/images/panel.png");
    game.load.image("bg", "assets/images/bg-trans.png");
    game.load.image("keyboard", "assets/images/keyboard.png");
    game.load.image("blank", "assets/images/blank.png");
    game.load.image('input', 'assets/images/decimalinput.png');
    game.load.image("keypad", "assets/images/keypad.png");
    game.load.image("timer", "assets/images/timer.png");

    game.load.spritesheet('sound', 'assets/images/sound.png', 256, 227);
    game.load.spritesheet("dotbuttons1", "assets/images/mcard1.png", 256, 332);
    game.load.spritesheet("dotbuttons2", "assets/images/mcard2.png", 256, 332);
    game.load.spritesheet("dotbuttons4", "assets/images/mcard4.png", 256, 332);
    game.load.spritesheet("dotbuttons8", "assets/images/mcard8.png", 256, 332);
    game.load.spritesheet("dotbuttons16", "assets/images/mcard16.png", 256, 332);
    game.load.spritesheet("button", "assets/images/button.png", 124, 322);

    //game.load.video("yt", "assets/video.mp4");

    game.load.start();
}
//Display Loading Text
function loadStart() {
    statusText = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: textFontSize, font: 'Pixel Digivolve', fill: '#00D928' });
    statusText.text = "Loading...";
    statusText.anchor.setTo(0.5, 0.5)
}
//Showing Number of loaded assets percentage 
//This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    statusText.text = "Loading: " + progress + "% ";
    //+ totalLoaded + " out of " + totalFiles;
}
//On Complete of loading assets show "Tap to start" Text
function loadComplete() {
    statusText.text = "Load Complete";
    statusText.destroy();
    tapText.text = "tap to start";
}
//On Touch Sound Context is resumed
function up(item) {
    game.sound.touchLocked = false;
    game.sound.context.resume();
    tapText.destroy();
    game.state.start('loading');
}
//All Devices Config
function TapToStartDeviceConfig() {
    if (!game.device.desktop) {
        textFontSize = '60px';
    }
    else {
        textFontSize = '40px';
    }
}