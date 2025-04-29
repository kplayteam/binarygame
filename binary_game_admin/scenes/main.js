//Game Initialization & Screen Size
let Presets = {}
// || navigator.userAgent.match(/webOS/i)
if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
)
    Presets = { 'width': window.innerWidth, 'height': window.innerHeight - 32 < 320 ? 320 : window.innerHeight }
else
    Presets = { 'width': 500, 'height': window.innerHeight < 757 ? 620 : 750 }

var game = new Phaser.Game(Presets.width, Presets.height, Phaser.CANVAS, 'game');

game.state.add('taptostart', demo.taptostart);
game.state.add('loading', demo.loading);
game.state.add('modeselection', demo.modeselection);
game.state.add('typeselection', demo.typeselection);
game.state.add('levelselection', demo.levelselection);
game.state.add('flipbinarypracticeeasy', demo.flipbinarypracticeeasy);
game.state.add('flipbinarypracticenormal', demo.flipbinarypracticenormal);
game.state.add('keyinbinarypracticeeasy', demo.keyinbinarypracticeeasy);
game.state.add('keyinbinarypracticenormal', demo.keyinbinarypracticenormal);
game.state.add('keyinbinarypracticehard', demo.keyinbinarypracticehard);
game.state.add('keyindecimalpracticeeasy', demo.keyindecimalpracticeeasy);
game.state.add('keyindecimalpracticenormal', demo.keyindecimalpracticenormal);
game.state.add('keyindecimalpracticehard', demo.keyindecimalpracticehard);
game.state.add('username', demo.username);
game.state.add('playmainmenu', demo.playmainmenu);
game.state.add('playgameselection', demo.playgameselection);
game.state.add('playgamebinary', demo.playgamebinary);
game.state.add('playgamedecimal', demo.playgamedecimal);
game.state.add('gameover', demo.gameover);
// game.state.add('leaderboard', demo.leaderboard);

game.state.start('taptostart');

//Firebase
let leaderRef;
let adminRef;
//Audio
let server;
//User ID
let id;
let idExists = false;
let uid;
//Firebase UserData
let previousBinaryScore = 0;
let previousDecimalScore = 0;
let updatedBinaryScore, updatedDecimalScore;
let previousBinaryCorrectAnswer = 0;
let previousDecimalCorrectAnswer = 0;
let updatedBinaryAnswer, updatedDecimalAnswer;
//JSON and JSON Array Index References
let jsonLoader = 'version';
let index = 0;
let phaserJSON;
// let jsonDataDict;
let binaryCard = []
let practiceBitText = []
let binaryCardDict = {
    "0": "dotbuttons4",
    "1": "dotbuttons2",
    "2": "dotbuttons1",
}
let allBinaryCardDict = {
    "0": "dotbuttons16",
    "1": "dotbuttons8",
    "2": "dotbuttons4",
    "3": "dotbuttons2",
    "4": "dotbuttons1",
}
//Stats Text References
// let NoOfTriesText;
// let NoOfCorrectAnswersText;
// let NoOfWrongAnswersText;
//Without || With Binary Card Position Values
let keyInDecimalBinaryheight = 300;
let keyInBinaryDecimalheight = 350;
//Booleans
let isPlayingModeBinary;
//UI GameObjects (Texts & Panels)
// let btnMute;
// let cardToogler;
let targetValue;
// let targetText;
// let correctText;
// let wrongText;
// let shake;
// let bgPanel;
let tween = null;
// let playModeTitle;
// let playModeTimer;
// let playModeBtnClose;
// let timer;
// let levelText;
// let nextLevelLabel;
// let nextLevelText;
// let userNameInputFieldText;
// Binary Input Boxes Array & Binary Holder Array for Decimal PlayMode
let PracticeUserInputBoxes = [];
let PracticeBinaryHolder = [];
//Score, # of Correct Answers & Question Count 
let binaryScore = 0;
let decimalScore = 0;
let totalAccumalation = 0;
let binaryNumberOfCorrectAnswers = 0;
let decimalNumberOfCorrectAnswers = 0;
let totalCorrectAnswers = 0;
let totalPointsEachGig = 50;
let requiredScore;
// let numberOfCorrectAnswers = 0;
// let playModeQuestionIncrementerValue = 0;
//N# of GIG References
// let gigQuestionCount = 5;
// let level = 3;
// let nextLevel;
//Timer and Player Response Time
// let total = 0;
let responseTime = 0;
// let totalTimeCollectorIncrementer = 0;
let totalTimeCollector = [];
// let repeatedTime;
let currentPlayerSerialNumber;
//Position Values for PlayMode Decimal Binary Text
// let playModeDecimalBinaryPosition = 85;
//Position Values for PlayMode Binary for Input Text & Blinking Cursor
// let playModeDashUserInputTextPosition = 90;
// let playModeDashUserInputTextPosition1 = 95;
//Binary Boxes Text References
// let PracticeBinaryInputText1;
// let PracticeBinaryInputText2;
// let PracticeBinaryInputText4;
// let PracticeBinaryInputText8;
// let PracticeBinaryInputText16;
// let PracticeBinaryInputText32;
// let PracticeBinaryInputText64;
// let PracticeBinaryInputText128;
//Bit Text References
// let PracticeBitText1
// let PracticeBitText2
// let PracticeBitText4
// let PracticeBitText8
// let PracticeBitText16
// let PracticeBitText32
// let PracticeBitText64
// let PracticeBitText128
//Binary Card References
// let binaryCard1;
// let binaryCard2;
// let binaryCard4;
// let binaryCard8;
// let binaryCard16;
//KeyPad References for Practice and PlayMode Scenes
// let Key0;
// let Key1;
// let Key2;
// let Key3;
// let Key4;
// let Key5;
// let Key6;
// let Key7;
// let Key8;
// let Key9;
// let KeyBackSpace;
// let KeyEnter;