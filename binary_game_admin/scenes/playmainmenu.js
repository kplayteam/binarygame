demo.playmainmenu = function () { };

let playGameText;
let playGameButton;
let leaderBoardText;
let leaderBoardButton;
let backButton;
let welcomeStyle;
let leaderBoardLength;

demo.playmainmenu.prototype = {
    preload: function () {
        //Retrieving DB Record Length
        leaderRef = firebase.database().ref("leaders/");
        leaderRef.on("value", function (snapshot) {
            leaderBoardLength = snapshot.numChildren();
        });
        //All Device Config
        playModeMainMenuDeviceConfig();
        //Loading Assets
        game.load.image('submit', 'assets/images/submit.png');
        game.load.image('back', 'assets/images/backbutton.png');
        game.load.audio('btnClick', 'assets/audio/click.mp3');
    },
    create: function () {
        //Audio Reference
        btnClick = game.add.audio('btnclick');
        //Title Typing Effect
        let titleTextValue = "KIDOCODE";
        this.spellOutTitleTextColored(game.width / 2, game.height / 15, 10, titleTextValue, titleTextFontSize, 1, '#33AF4A', 'Pixel Digivolve');

        //Welcome User
        this.welcomeText = game.add.text(game.width / 2, game.height / 5, "Welcome", welcomeStyle);
        this.welcomeText.anchor.setTo(0.5, 0.5);
        this.welcomeUser = game.add.text(game.width / 2, game.height / 3.7, userNameInputFieldText.text, welcomeStyle);
        this.welcomeUser.anchor.setTo(0.5, 0.5);

        //Type Selection Buttons
        playGameButton = game.add.button(game.width / 2, game.height / mobileStartGameButtonMultipler, 'submit', onClickToPlayGameButton, this);
        playGameButton.scale.setTo(buttonWidth, buttonHeight);
        playGameButton.anchor.setTo(0.5, 0.5);
        playGameText = game.add.text(game.width / 2, game.height / mobileStartGameButtonMultipler, '', { fontSize: buttonFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        playGameText.anchor.setTo(0.5, 0.5);
        playGameText.text = "start game";

        leaderBoardButton = game.add.button(game.width / 2, game.height / mobileLeaderBoardButtonMultipler, 'submit', onClickToLeaderBoardButton, this);
        leaderBoardButton.scale.setTo(buttonWidth, buttonHeight);
        leaderBoardButton.anchor.setTo(0.5, 0.5);
        leaderBoardText = game.add.text(game.width / 2, game.height / mobileLeaderBoardButtonMultipler, '', { fontSize: buttonFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        leaderBoardText.anchor.setTo(0.5, 0.5);
        leaderBoardText.text = "leaderboard";

        this.backButton = game.add.button(game.width / 2, game.height / mobileBackButtonMultipler, 'back', onClickMenuBackButton, this);
        this.backButton.scale.setTo(buttonWidth, buttonHeight);
        this.backButton.anchor.setTo(0.5, 0.5);
        this.backButtonText = game.add.text(game.width / 2, game.height / mobileBackButtonMultipler, 'back', { fontSize: buttonFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
        this.backButtonText.anchor.setTo(0.5, 0.5);
    },
    update: function () {
        if(game.device.desktop){
            if (game.input.activePointer.withinGame)
                game.input.enabled = true;
            else
                game.input.enabled = false;
        }

        // Enable/Disable LeaderBoard Buttons
        leaderBoardButtonStatus();
    },
    //Typing Effect Title
    spellOutTitleTextColored: function (x, y, width, text, fontSize, speed, fill, font) {
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
//Enable/Disable LeaderBoard Buttons
function leaderBoardButtonStatus() {
    // if(leaderBoardLength < 1)
    if (leaderBoardText.text === "leaderboard") {
        leaderBoardButton.inputEnabled = false;
        leaderBoardButton.alpha = 0.5;
        leaderBoardText.alpha = 0.5;
    }
    else {
        leaderBoardButton.inputEnabled = true;
        leaderBoardButton.alpha = 1;
        leaderBoardText.alpha = 1;
    }
}
//Start Game Button 
function onClickToPlayGameButton() {
    btnClick.play();
    game.state.start('playgameselection');
}
//LeaderBoard Button
function onClickToLeaderBoardButton() {
    btnClick.play();
    let gameElement = document.querySelector('#game')
    let leaderBoardElement = document.querySelector('#leaderboard')
    gameElement.style.display = "none";
    leaderBoardElement.style.display = "block";
}
//Back Button
function onClickMenuBackButton() {
    btnClick.play();
    game.state.start('username');
}
//All Devices Config
function playModeMainMenuDeviceConfig() {
    if (game.device.android) {
        titleTextFontSize = 100;
        mobileStartGameButtonMultipler = 1.6;
        mobileLeaderBoardButtonMultipler = 1.38;
        mobileBackButtonMultipler = 1.19;
        welcomeStyle = { fontSize: '70px', fill: '#00D928', font: 'Pixel Digivolve', align: 'left' };
        buttonWidth = 1.5;
        buttonHeight = 1.5;
        buttonFontSize = '50px';
    }
    else if (game.device.iOS) {
        titleTextFontSize = 100;
        mobileStartGameButtonMultipler = 1.7;
        mobileLeaderBoardButtonMultipler = 1.38;
        mobileBackButtonMultipler = 1.1;
        welcomeStyle = { fontSize: '70px', fill: '#00D928', font: 'Pixel Digivolve', align: 'left' };
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
        welcomeStyle = { fontSize: '45px', fill: '#00D928', font: 'Pixel Digivolve', align: 'left' };
        buttonWidth = 0.7;
        buttonHeight = 0.7;
        buttonFontSize = '30px';
    }
}
