demo.playgameselection = function () { };

let gameSelectionBinaryText;
let gameSelectionBinaryButton;
let gameSelectionDecimalButton;
let gameSelectionDecimalText;
let gameSelectionBackButton;
let gameSelectionWelcomeStyle;
let isBinaryGameStatusChanged = false
let isDecimalGameStatusChanged = false

demo.playgameselection.prototype = {
    preload: function () {
        //All Device Config
        playModeGameSelectionDeviceConfig();
        //Loading Assets
        game.load.image('submit', 'assets/images/submit.png');
        game.load.image('back', 'assets/images/backbutton.png');
        game.load.audio('btnclick', 'assets/audio/click.mp3');
    },
    create: function () {
        //Audio Reference
        btnClick = game.add.audio('btnclick');
        //Title Typing Effect
        let titleTextValue = "KIDOCODE";
        this.gameSelectionSpellOutTitleTextColored(game.width / 2, game.height / 15, 10, titleTextValue, titleTextFontSize, 1, '#33AF4A', 'Pixel Digivolve');

        //Welcome User
        this.welcomeText = game.add.text(game.width / 2, game.height / 5, "Welcome", gameSelectionWelcomeStyle);
        this.welcomeText.anchor.setTo(0.5, 0.5);
        this.welcomeUser = game.add.text(game.width / 2, game.height / 3.7, userNameInputFieldText.text, gameSelectionWelcomeStyle);
        this.welcomeUser.anchor.setTo(0.5, 0.5);

        //Type Selection Buttons
        gameSelectionBinaryButton = game.add.button(game.width / 2, game.height / mobileStartGameButtonMultipler, 'submit', onClickPlayGameSelectionBinaryButton, this);
        gameSelectionBinaryButton.scale.setTo(buttonWidth, buttonHeight);
        gameSelectionBinaryButton.anchor.setTo(0.5, 0.5);
        gameSelectionBinaryButton.inputEnabled = false;

        gameSelectionBinaryText = game.add.text(game.width / 2, game.height / mobileStartGameButtonMultipler, '', { fontSize: buttonFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        gameSelectionBinaryText.anchor.setTo(0.5, 0.5);
        gameSelectionBinaryText.text = "key in binary";
        gameSelectionBinaryText.alpha = 0.5;

        gameSelectionDecimalButton = game.add.button(game.width / 2, game.height / mobileLeaderBoardButtonMultipler, 'submit', onClickPlayGameSelectionDecimalButton, this);
        gameSelectionDecimalButton.scale.setTo(buttonWidth, buttonHeight);
        gameSelectionDecimalButton.anchor.setTo(0.5, 0.5);
        gameSelectionDecimalButton.inputEnabled = false;

        gameSelectionDecimalText = game.add.text(game.width / 2, game.height / mobileLeaderBoardButtonMultipler, '', { fontSize: buttonFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        gameSelectionDecimalText.anchor.setTo(0.5, 0.5);
        gameSelectionDecimalText.text = "key in decimal";
        gameSelectionDecimalText.alpha = 0.5;

        gameSelectionBackButton = game.add.button(game.width / 2, game.height / mobileBackButtonMultipler, 'back', onClickBackButton, this);
        gameSelectionBackButton.scale.setTo(buttonWidth, buttonHeight);
        gameSelectionBackButton.anchor.setTo(0.5, 0.5);
        this.backButtonText = game.add.text(game.width / 2, game.height / mobileBackButtonMultipler, 'back', { fontSize: buttonFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
        this.backButtonText.anchor.setTo(0.5, 0.5);

        //Read Firebase Game Status
        readFirebaseGameStatus()
    },
    update: function () {
        if(game.device.desktop){
            if (game.input.activePointer.withinGame)
                game.input.enabled = true;
            else
                game.input.enabled = false;
        }

        toggleStartGameButton()
    },
    //Typing Effect Title
    gameSelectionSpellOutTitleTextColored: function (x, y, width, text, fontSize, speed, fill, font) {
        var sentence = game.add.text(x, y, '', { fontSize: fontSize + 'px', fill: fill, font: font });
        sentence.anchor.setTo(0.5, 0.5);
        sentence.addColor('#EE3E34', 4);
        sentence.addColor('#F9CC14', 5);
        sentence.addColor('#01A3DE', 6);
        sentence.addColor('#F16621', 7);
        sentence.addColor('#00D928', 8);
        var currentLine = game.add.text(game.width / 2, game.height / 15, '', { fontSize: fontSize + 'px', font: font });
        currentLine.alpha = 0;
        var loop = game.time.events.loop(speed, addCharColored);

        var index = 0;

        function addCharColored() {
            sentence.text += text[index];
            currentLine.text += text[index];

            if (currentLine.width > width && text[index] == ' ') {
                sentence.text += '\n';
                currentLine.text = '';
            }
            if (index >= text.length - 1) {
                game.time.events.remove(loop);
            }
            index++;
        }
    },
};
//Key in Binary Button 
function onClickPlayGameSelectionBinaryButton() {
    btnClick.play();
    game.state.start('playgamebinary');
}
//Key in Decimal Button
function onClickPlayGameSelectionDecimalButton() {
    btnClick.play();
    game.state.start('playgamedecimal');
}
//Back Button
function onClickBackButton() {
    btnClick.play();
    game.state.start('playmainmenu');
}
//Read Firebase Game Status
function readFirebaseGameStatus() {
    adminRef.on("value", function (snapshot) {
        let startGameData = snapshot.val()
        if (startGameData !== null) {
            if (startGameData.hasOwnProperty('binaryGame')) {
                isBinaryGameStatusChanged = startGameData.binaryGame
            }
            else if (startGameData.hasOwnProperty('decimalGame')) {
                isDecimalGameStatusChanged = startGameData.decimalGame
            }
        }
    });
}
//Toggle Binary & Decimal Button from Firebase
function toggleStartGameButton() {
    gameSelectionBinaryButton.inputEnabled = isBinaryGameStatusChanged;
    gameSelectionDecimalButton.inputEnabled = isDecimalGameStatusChanged;

    if (gameSelectionBinaryButton.inputEnabled) {
        gameSelectionBinaryButton.alpha = 1;
        gameSelectionBinaryText.alpha = 1;
    }
    else if (gameSelectionDecimalButton.inputEnabled) {
        gameSelectionDecimalButton.alpha = 1;
        gameSelectionDecimalText.alpha = 1;
    }
    else {
        gameSelectionBinaryButton.alpha = 0.5;
        gameSelectionDecimalButton.alpha = 0.5;
        gameSelectionBinaryText.alpha = 0.5;
        gameSelectionDecimalText.alpha = 0.5;
    }
}
//All Devices Config
function playModeGameSelectionDeviceConfig() {
    if (game.device.android) {
        titleTextFontSize = 100;
        mobileStartGameButtonMultipler = 1.6;
        mobileLeaderBoardButtonMultipler = 1.38;
        mobileBackButtonMultipler = 1.19;
        gameSelectionWelcomeStyle = { fontSize: '70px', fill: '#00D928', font: 'Pixel Digivolve', align: 'left' };
        buttonWidth = 1.5;
        buttonHeight = 1.5;
        buttonFontSize = '50px';
    }
    else if (game.device.iOS) {
        titleTextFontSize = 100;
        mobileStartGameButtonMultipler = 1.7;
        mobileLeaderBoardButtonMultipler = 1.38;
        mobileBackButtonMultipler = 1.1;
        gameSelectionWelcomeStyle = { fontSize: '70px', fill: '#00D928', font: 'Pixel Digivolve', align: 'left' };
        buttonWidth = 1.5;
        buttonHeight = 1.5;
        buttonFontSize = '50px';
    }
    else if (game.device.desktop) {
        titleTextFontSize = 60;
        mobileWelcomeUsernameTextMultipler = 3.7;
        mobileStartGameButtonMultipler = 1.53;
        mobileLeaderBoardButtonMultipler = 1.3;
        mobileBackButtonMultipler = 1.13;
        gameSelectionWelcomeStyle = { fontSize: '45px', fill: '#00D928', font: 'Pixel Digivolve', align: 'left' };
        buttonWidth = 0.7;
        buttonHeight = 0.7;
        buttonFontSize = '30px';
    }
}
