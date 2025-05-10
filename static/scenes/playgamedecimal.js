demo.playgamedecimal = function () { };

let playModeDecimalBinaryHolder = [];
let playModeDecimalUserInputText;
let playModeDecimalTargetValue;
let playModeDecimalResult;
let playModeDecimalStringfy;
let playModeDecimalTries = 0;
let playModeDecimalCorrectAnswers = 0;
let playModeDecimalWrongAnswers = 0;
let playModeDecimalNextLevelIn
let playModeDecimalGigQuestionCount = 5;
let playModeDecimalGig = 3;
let decimalTimer;
let decimalTotalSeconds = 10;
let decimalIndex = 0;
let decimalPhaserJSON;
let decimalJsonDataDict;
let decimalRef;
let decimalFirebaseTime;
let playModeDecimalConnectivityBG;
let playModeDecimalConnectivityText;

demo.playgamedecimal.prototype = {
    preload: function () {
        isPlayingModeBinary = false;
        //All Devices Config
        playModeDecimalDeviceConfig();
        // Resetting to Default Values
        playModeDecimalResetAll();
    },
    create: function () {
        decimalPhaserJSON = game.cache.getJSON(jsonLoader);
        //Shake Reference
        shake = new Phaser.Plugin.Shake(game);
        game.plugins.add(shake);

        //Audio Reference
        switchOn = game.add.audio('switchon');
        switchOff = game.add.audio('switchoff');
        btnClick = game.add.audio('btnClick');
        cardflip = game.add.audio('cardflip');
        keyPress = game.add.audio('keypress');
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');
        combofull = game.add.audio('combo-full');
        smash = game.add.audio('smash');

        //Starting Timer
        decimalTimer = game.time.create(false);
        decimalTimer.loop(1000, updateCounterDecimal, this);
        decimalTimer.start();

        btnMute = game.add.button(game.width / UITimerMutePosition, game.height / UIRow2Height, 'sound', playModeDecimalMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        playModeTitle = game.add.text(game.width / titlePosition, game.height / UIRow1Height, ' Kidocode', { fontSize: gigFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
        playModeTitle.anchor.setTo(0.5, 0.5);

        playModeTimer = game.add.text(game.width / 2, game.height / mobileTimerHeightMultipler, '', { fontSize: TimerFontSize, font: 'Pixel Digivolve' });
        playModeTimer.anchor.setTo(0, 0.5);

        //Close Button
        playModeBtnClose = game.add.button(game.width / UIFloatRight, game.height / UIRow2Height, 'close', playModeDecimalCloseButton, this);
        playModeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        playModeBtnClose.anchor.setTo(0.5, 0.5);

        //Card Toogler Button
        cardToogler = game.add.button(game.width / UIFloatRight, game.height / mobileHelperButtonHeightMultipler, 'button', playModeDecimalCardToogler, this);
        cardToogler.scale.setTo(tooglerScaler, tooglerScaler);
        cardToogler.anchor.setTo(0.5, 0.5);
        cardToogler.frame = 0;

        for (let i = 0; i < 5; i++) {
            binaryCard[i] = game.add.button(game.width / cardPositionMulitpler + i * cardPositionIncrementer, game.height / cardHeightMultipler, allBinaryCardDict[i], playModeDecimalFlipCard, this);
            binaryCard[i].scale.setTo(cardScaler, cardScaler);
            binaryCard[i].anchor.setTo(0.5, 0.5);
            binaryCard[i].frame = 0;
            binaryCard[i].visible = false;
        }

        //Keyboard Input Text
        playModeDecimalUserInputText = game.add.text(game.world.centerX, game.height / userInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        playModeDecimalUserInputText.anchor.setTo(0.5, 0.5);
        this.playModeDecimalUserInputImage = game.add.sprite(game.world.centerX, game.height / userInputImageHeightMultipler, 'decimalinput');
        this.playModeDecimalUserInputImage.anchor.setTo(0.5, 0.5);
        this.playModeDecimalUserInputImage.scale.setTo(userInputImageScaler, userInputImageScaler);

        //NumPad Buttons
        Key1 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow1HeightMultipler, 'keypad', playModeDecimalKeyPad1, this);
        Key1.anchor.setTo(0.5, 0.5);
        Key1.scale.setTo(buttonWidth, buttonHeight);
        this.Key1Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow1HeightMultipler, '1', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key1Text.anchor.setTo(0.5, 0.5);

        Key2 = game.add.button(game.world.centerX, game.height / NumPadRow1HeightMultipler, 'keypad', playModeDecimalKeyPad2, this);
        Key2.anchor.setTo(0.5, 0.5);
        Key2.scale.setTo(buttonWidth, buttonHeight);
        this.Key2Text = game.add.text(game.world.centerX, game.height / NumPadRow1HeightMultipler, '2', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key2Text.anchor.setTo(0.5, 0.5);

        Key3 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow1HeightMultipler, 'keypad', playModeDecimalKeyPad3, this);
        Key3.anchor.setTo(0.5, 0.5);
        Key3.scale.setTo(buttonWidth, buttonHeight);
        this.Key3Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow1HeightMultipler, '3', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key3Text.anchor.setTo(0.5, 0.5);

        Key4 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow2HeightMultipler, 'keypad', playModeDecimalKeyPad4, this);
        Key4.anchor.setTo(0.5, 0.5);
        Key4.scale.setTo(buttonWidth, buttonHeight);
        this.Key4Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow2HeightMultipler, '4', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key4Text.anchor.setTo(0.5, 0.5);

        Key5 = game.add.button(game.world.centerX, game.height / NumPadRow2HeightMultipler, 'keypad', playModeDecimalKeyPad5, this);
        Key5.anchor.setTo(0.5, 0.5);
        Key5.scale.setTo(buttonWidth, buttonHeight);
        this.Key5Text = game.add.text(game.world.centerX, game.height / NumPadRow2HeightMultipler, '5', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key5Text.anchor.setTo(0.5, 0.5);

        Key6 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow2HeightMultipler, 'keypad', playModeDecimalKeyPad6, this);
        Key6.anchor.setTo(0.5, 0.5);
        Key6.scale.setTo(buttonWidth, buttonHeight);
        this.Key6Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow2HeightMultipler, '6', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key6Text.anchor.setTo(0.5, 0.5);

        Key7 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow3HeightMultipler, 'keypad', playModeDecimalKeyPad7, this);
        Key7.anchor.setTo(0.5, 0.5);
        Key7.scale.setTo(buttonWidth, buttonHeight);
        this.Key7Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow3HeightMultipler, '7', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key7Text.anchor.setTo(0.5, 0.5);

        Key8 = game.add.button(game.world.centerX, game.height / NumPadRow3HeightMultipler, 'keypad', playModeDecimalKeyPad8, this);
        Key8.anchor.setTo(0.5, 0.5);
        Key8.scale.setTo(buttonWidth, buttonHeight);
        this.Key8Text = game.add.text(game.world.centerX, game.height / NumPadRow3HeightMultipler, '8', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key8Text.anchor.setTo(0.5, 0.5);

        Key9 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow3HeightMultipler, 'keypad', playModeDecimalKeyPad9, this);
        Key9.anchor.setTo(0.5, 0.5);
        Key9.scale.setTo(buttonWidth, buttonHeight);
        this.Key9Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow3HeightMultipler, '9', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key9Text.anchor.setTo(0.5, 0.5);

        Key0 = game.add.button(game.world.centerX, game.height / NumPadRow4HeightMultipler, 'keypad', playModeDecimalKeyPad0, this);
        Key0.anchor.setTo(0.5, 0.5);
        Key0.scale.setTo(buttonWidth, buttonHeight);
        this.Key0Text = game.add.text(game.world.centerX, game.height / NumPadRow4HeightMultipler, '0', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key0Text.anchor.setTo(0.5, 0.5);

        KeyBackSpace = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow4HeightMultipler, 'keypad', playModeDecimalKeyPadRemove, this);
        KeyBackSpace.anchor.setTo(0.5, 0.5);
        KeyBackSpace.scale.setTo(buttonWidth, buttonHeight);
        this.KeyBackSpaceText = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow4HeightMultipler, '<', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyBackSpaceText.anchor.setTo(0.5, 0.5);

        KeyEnter = game.add.button(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', playModeDecimalKeyPadSubmit, this);
        KeyEnter.anchor.setTo(0.5, 0.5);
        KeyEnter.scale.setTo(buttonWidth, buttonHeight);
        this.KeyEnterText = game.add.text(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', { fontSize: submitFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyEnterText.anchor.setTo(0.5, 0.5);

        //Correct Text
        correctText = game.add.text(game.world.centerX, game.height / 2.05, 'correct!', { fontSize: resultFontSize, fill: 'green', font: 'Pixel Digivolve' });
        correctText.anchor.setTo(0.5, 0.5);
        correctText.scale.setTo(0, 0);

        //Wrong Text
        wrongText = game.add.text(game.world.centerX, game.height / 2.05, 'wrong!', { fontSize: resultFontSize, fill: 'red', font: 'Pixel Digivolve' });
        wrongText.anchor.setTo(0.5, 0.5);
        wrongText.scale.setTo(0, 0);

        //playModeDecimalGig Text
        levelLabel = game.add.text(game.width / 2, game.height / UIRow1Height, 'GIG: ', { fontSize: gigFontSize, fill: '#f2f2f2', font: 'Pixel Digivolve' });
        levelLabel.anchor.setTo(0.5, 0.5);
        levelText = game.add.text(game.width / 1.75, game.height / UIRow1Height, playModeDecimalGig, { fontSize: gigFontSize, fill: '#f2f2f2', font: 'Pixel Digivolve' });
        levelText.anchor.setTo(0.5, 0.5);

        //playModeDecimalNextLevelIn Text
        nextLevelLabel = game.add.text(game.width / mobileNextLevelLabelPositionMultipler, game.height / mobileNextLevelLabelMultipler, '', { fontSize: '25px', fill: '#f2f2f2', font: 'Pixel Digivolve' });
        nextLevelLabel.anchor.setTo(0.5, 0.5);
        nextLevelLabel.angle = -370;
        nextLevelLabel.align = 'center';
        nextLevelLabel.text = nextLevelLabelTempText;

        nextLevelText = game.add.text(game.width / mobileNextLevelValuePositionMultipler, game.height / mobileNextLevelValueMultipler, playModeDecimalNextLevelIn, { fontSize: nextLevelFontSize, font: 'Pixel Digivolve' });
        nextLevelText.anchor.setTo(0.5, 0.5);
        nextLevelText.angle = -370;
        nextLevelText.fill = '#33AF4A';
        nextLevelText.align = 'right';

        //Number of Tries Text
        this.NoOfTries = game.add.sprite(game.width / UIFloatLeft, game.height / questionTriesHeightMultipler, 'tries');
        this.NoOfTries.anchor.setTo(0.5, 0.5);
        this.NoOfTries.scale.setTo(triesIconScaler, triesIconScaler);
        NoOfTriesText = game.add.text(game.width / statsTextPosition, game.height / questionTriesHeightMultipler, '', { fontSize: triesCorrectFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        NoOfTriesText.anchor.setTo(0, 0.5);

        //Number of Correct Answers Text
        this.NoOfCorrectAnswers = game.add.sprite(game.width / UIFloatLeft, game.height / correctHeightMultipler, 'correctanswers');
        this.NoOfCorrectAnswers.anchor.setTo(0.5, 0.5);
        this.NoOfCorrectAnswers.scale.setTo(correctIconScaler, correctIconScaler);
        NoOfCorrectAnswersText = game.add.text(game.width / statsTextPosition, game.height / correctHeightMultipler, '', { fontSize: triesCorrectFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        NoOfCorrectAnswersText.anchor.setTo(0, 0.5);

        //Number of Wrong Answers Text
        this.NoOfWrongAnswers = game.add.sprite(game.width / UIFloatLeft, game.height / wrongHeightMultipler, 'wronganswer');
        this.NoOfWrongAnswers.anchor.setTo(0.5, 0.5);
        this.NoOfWrongAnswers.scale.setTo(correctIconScaler, correctIconScaler);
        NoOfWrongAnswersText = game.add.text(game.width / statsTextPosition, game.height / wrongHeightMultipler, '', { fontSize: triesCorrectFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        NoOfWrongAnswersText.anchor.setTo(0, 0.5);

        //Eraser Button
        this.playModeDecimalEraserButton = game.add.button(game.width / UIFloatLeft, game.height / eraserHeightMultipler, 'eraser', playModeDecimalRemoveStats, this);
        this.playModeDecimalEraserButton.anchor.setTo(0.5, 0.5);
        this.playModeDecimalEraserButton.scale.setTo(correctIconScaler, correctIconScaler);

        //Firebase Time
        this.decimalFirebaseTimeImg = game.add.sprite(game.width / UITimerMutePosition, game.height / UIRow1Height, "timer");
        this.decimalFirebaseTimeImg.scale.setTo(correctIconScaler, correctIconScaler);
        this.decimalFirebaseTimeImg.anchor.setTo(0.5, 0.5);
        decimalFirebaseTime = game.add.text(game.width / UIFloatRight, game.height / UIRow1Height, "0:00", { fontSize: firebaseTimeFontSize, fill: "#ffffff", font: "Pixel Digivolve" });
        decimalFirebaseTime.anchor.setTo(0.5, 0.5);

        playModeDecimalConnectivityBGGroup = game.add.group();
        playModeDecimalConnectivityBG = game.add.sprite(game.world.centerX, game.world.centerY, "bg");
        playModeDecimalConnectivityBG.anchor.setTo(0.5, 0.5);
        playModeDecimalConnectivityBG.scale.setTo(1, 2);
        playModeDecimalConnectivityBG.alpha = 0;
        playModeDecimalConnectivityBGGroup.add(playModeDecimalConnectivityBG);

        playModeDecimalConnectivityTextGroup = game.add.group();
        playModeDecimalConnectivityText = game.add.text(game.world.centerX, game.height / 2, "", { fontSize: statLabelFontSize, fill: "#e2e2e2", font: "Pixel Digivolve", fontWeight: "400" });
        playModeDecimalConnectivityText.anchor.setTo(0.5, 0.5);
        playModeDecimalConnectivityText.text = "No Internet Connection. \n Trying to reconnect...";
        playModeDecimalConnectivityText.alpha = 0;
        playModeDecimalConnectivityTextGroup.add(playModeDecimalConnectivityText);

        //let tweenRepeatFrom = game.add.tween(nextLevelText.scale).from({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true, 0);
        let tweenRepeatTo = game.add.tween(nextLevelText.scale).to({ x: 2, y: 2 }, 500, Phaser.Easing.Back.Out, true, 0);
        tweenRepeatTo.repeat(-1, 100);
        //Generate Binary Number
        playModeDecimalGenerateRandomNumber();

        //Firebase Countdown Timer
        playModeDecimalCountDownTimer()
        //Firebase Change game state to Gameover
        playModeDecimalOnGameEndChangeState();
    },
    update: function () {
        //Mapping Keyboard keys for Decimal
        keyboardInputDecimalsKeys()
        playModeTimer.text = decimalTotalSeconds + "s";
        //Changing Streak/Combo Color
        playModeDecimalChangeStreakColor();
        //Changing Timer Color
        playModeDecimalChangeTimeColor();
        //Save & Load Stats to Browser LocalStorage
        plaModeDecimalCurrentPlayerLocalStorage();

        if (playModeDecimalStringfy.length > 5) cardToogler.visible = false;

        if (playModeDecimalNextLevelIn < 1) {
            playModeDecimalNextLevelIn = playModeDecimalGigQuestionCount;
            nextLevelText.text = playModeDecimalNextLevelIn;
        }

        if (playModeDecimalGig > 9) {
            nextLevelLabel.text = "Max playModeDecimalGig";
            nextLevelLabel.fontSize = '50px';
            nextLevelLabel.fill = '#EE3E34';
            nextLevelText.alpha = 0;
        }

        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }
        //Check Internet Connectivity 
        playModeDecimalCheckInternetConnectivity();
    }
};
//Check Internet Connectivity 
function playModeDecimalCheckInternetConnectivity(){
    if (navigator.onLine) {
        //console.log('online');
        if(playModeDecimalConnectivityBG.alpha === 1){
            playModeDecimalConnectivityBG.alpha = 0
            playModeDecimalConnectivityText.alpha = 0
            playModeBtnClose.inputEnabled = true;
            cardToogler.inputEnabled = true;
            Key0.inputEnabled = true;
            Key1.inputEnabled = true;
            Key2.inputEnabled = true;
            Key3.inputEnabled = true;
            Key4.inputEnabled = true;
            Key5.inputEnabled = true;
            Key6.inputEnabled = true;
            Key7.inputEnabled = true;
            Key8.inputEnabled = true;
            Key9.inputEnabled = true;
            KeyBackSpace.inputEnabled = true;
            KeyEnter.inputEnabled = true;
            btnMute.inputEnabled = true;
        }
    }
    else {
        console.log('offline');
        game.world.bringToTop(playModeDecimalConnectivityBGGroup)
        game.world.bringToTop(playModeDecimalConnectivityTextGroup)
        playModeDecimalConnectivityBG.alpha = 1
        playModeDecimalConnectivityText.alpha = 1
        playModeBtnClose.inputEnabled = false;
        cardToogler.inputEnabled = false;
        Key0.inputEnabled = false;
        Key1.inputEnabled = false;
        Key2.inputEnabled = false;
        Key3.inputEnabled = false;
        Key4.inputEnabled = false;
        Key5.inputEnabled = false;
        Key6.inputEnabled = false;
        Key7.inputEnabled = false;
        Key8.inputEnabled = false;
        Key9.inputEnabled = false;
        KeyBackSpace.inputEnabled = false;
        KeyEnter.inputEnabled = false;
        btnMute.inputEnabled = false;
    }
}
//Firebase Countdown Timer
function playModeDecimalCountDownTimer() {
    socket.on("get_decimal_game_status", function(data){
        let totalSeconds = data.totalSeconds;
        let decimalMinutes = parseInt(totalSeconds / 60) || 0;
        let decimalSeconds = parseInt(totalSeconds % 60) || 0;

        if (decimalSeconds < 10)
            decimalSeconds = "0" + decimalSeconds;

        decimalFirebaseTime.text = decimalMinutes + ":" + decimalSeconds;
    });
    socket.emit("get_decimal_game_status", {});
}
//Save & Load Stats to Browser LocalStorage
function plaModeDecimalCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('playmodedecimaltries');
    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('playmodedecimaltries', playModeDecimalTries);
        localStorage.setItem('playmodedecimalca', playModeDecimalCorrectAnswers);
        localStorage.setItem('playmodedecimalwa', playModeDecimalWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('playmodedecimaltries');
        NoOfCorrectAnswersText.text = localStorage.getItem('playmodedecimalca');
        NoOfWrongAnswersText.text = localStorage.getItem('playmodedecimalwa');
    }
    else if (playModeDecimalTries >= currentTries || playModeDecimalTries <= currentTries) {
        localStorage.setItem('playmodedecimaltries', playModeDecimalTries);
        localStorage.setItem('playmodedecimalca', playModeDecimalCorrectAnswers);
        localStorage.setItem('playmodedecimalwa', playModeDecimalWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('playmodedecimaltries');
        NoOfCorrectAnswersText.text = localStorage.getItem('playmodedecimalca');
        NoOfWrongAnswersText.text = localStorage.getItem('playmodedecimalwa');
    }
}
//Reset Stats to Zero
function playModeDecimalRemoveStats() {
    playModeDecimalTries = 0;
    playModeDecimalCorrectAnswers = 0;
    playModeDecimalWrongAnswers = 0;

    localStorage.setItem('playmodedecimaltries', playModeDecimalTries);
    localStorage.setItem('playmodedecimalca', playModeDecimalCorrectAnswers);
    localStorage.setItem('playmodedecimalwa', playModeDecimalWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('playmodedecimaltries');
    NoOfCorrectAnswersText.text = localStorage.getItem('playmodedecimalca');
    NoOfWrongAnswersText.text = localStorage.getItem('playmodedecimalwa');
}
//Mute Server Sound Only
function playModeDecimalMuteButton() {
    if (btnMute.frame === 0) {
        btnMute.frame = 1;
        server.stop();
    }
    else {
        btnMute.frame = 0;
        server.play();
        server.loopFull();
        server.volume = 0.2;
    }
}
//Changing Streak/Combo Color
function playModeDecimalChangeStreakColor() {
    if (playModeDecimalGig == 3) { levelText.fill = '#01A3DE'; }
    else if (playModeDecimalGig >= 4 && playModeDecimalGig <= 5) { levelText.fill = '#F9CC14'; }
    else if (playModeDecimalGig >= 6 && playModeDecimalGig <= 8) { levelText.fill = '#F16621'; }
    else if (playModeDecimalGig >= 9) { levelText.fill = '#EE3E34'; }
}
//Changing Timer Color
function playModeDecimalChangeTimeColor() {
    if (decimalTotalSeconds >= 0 && decimalTotalSeconds <= 2)
        playModeTimer.fill = "#EE3E34";
    else if (decimalTotalSeconds >= 3 && decimalTotalSeconds <= 6)
        playModeTimer.fill = "#F9CC14";
    else if (decimalTotalSeconds >= 7 && decimalTotalSeconds <= 10)
        playModeTimer.fill = "#33AF4A";
}
//Mapping Keyboard keys for Decimal
function keyboardInputDecimalsKeys() {
    key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    key0.onDown.add(playModeDecimalKeyPad0, this);

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(playModeDecimalKeyPad1, this);

    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key2.onDown.add(playModeDecimalKeyPad2, this);

    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key3.onDown.add(playModeDecimalKeyPad3, this);

    key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    key4.onDown.add(playModeDecimalKeyPad4, this);

    key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    key5.onDown.add(playModeDecimalKeyPad5, this);

    key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    key6.onDown.add(playModeDecimalKeyPad6, this);

    key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    key7.onDown.add(playModeDecimalKeyPad7, this);

    key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    key8.onDown.add(playModeDecimalKeyPad8, this);

    key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    key9.onDown.add(playModeDecimalKeyPad9, this);

    keyBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    keyBackSpace.onDown.add(playModeDecimalKeyPadRemove, this);

    keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    keyEnter.onDown.add(playModeDecimalKeyPadSubmit, this);
}
//Updating Timer
function updateCounterDecimal() {
    if (decimalTotalSeconds > 0)
        decimalTotalSeconds--;
}
//Close this playModeDecimalGig and Return to PlayMode MainMenu Scene
function playModeDecimalCloseButton() {
    btnClick.play();
    playModeDecimalResetAll();
    binaryCard.length = 0;
    cardToogler.frame = 0;
    game.state.start('playmainmenu');
}
//Binary Key 0 for KeyPad
function playModeDecimalKeyPad0() {
    keyPress.play();
    playModeDecimalUserInputText.text += 0;
}
//Binary Key 1 for KeyPad
function playModeDecimalKeyPad1() {
    keyPress.play();
    playModeDecimalUserInputText.text += 1;
}
//Binary Key 2 for KeyPad
function playModeDecimalKeyPad2() {
    keyPress.play();
    playModeDecimalUserInputText.text += 2;
}
//Binary Key 3 for KeyPad
function playModeDecimalKeyPad3() {
    keyPress.play();
    playModeDecimalUserInputText.text += 3;
}
//Binary Key 4 for KeyPad
function playModeDecimalKeyPad4() {
    keyPress.play();
    playModeDecimalUserInputText.text += 4;
}
//Binary Key 5 for KeyPad
function playModeDecimalKeyPad5() {
    keyPress.play();
    playModeDecimalUserInputText.text += 5;
}
//Binary Key 6 for KeyPad
function playModeDecimalKeyPad6() {
    keyPress.play();
    playModeDecimalUserInputText.text += 6;
}
//Binary Key 7 for KeyPad
function playModeDecimalKeyPad7() {
    keyPress.play();
    playModeDecimalUserInputText.text += 7;
}
//Binary Key 8 for KeyPad
function playModeDecimalKeyPad8() {
    keyPress.play();
    playModeDecimalUserInputText.text += 8;
}
//Binary Key 9 for KeyPad
function playModeDecimalKeyPad9() {
    keyPress.play();
    playModeDecimalUserInputText.text += 9;
}
//Binary BackSpace Key for KeyPad
function playModeDecimalKeyPadRemove() {
    keyPress.play();
    let str = playModeDecimalUserInputText.text;
    playModeDecimalUserInputText.text = str.substr(0, str.length - 1);
}
//Toogle Button For Binary Cards
function playModeDecimalCardToogler() {
    if (cardToogler.frame == 0) {
        switchOn.play();
        cardToogler.frame = 1;
        binaryCard.forEach(function (card) {
            card.visible = true
        });
        for (let i = 0; i < playModeDecimalStringfy.length; i++) {
            game.add.tween(playModeDecimalBinaryHolder[i]).to({ y: game.height / mobileBinaryHolderTweenHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }
    else {
        switchOff.play();
        cardToogler.frame = 0;
        binaryCard.forEach(function (card) {
            card.visible = false
            card.frame = 0
        });
        for (let i = 0; i < playModeDecimalStringfy.length; i++) {
            game.add.tween(playModeDecimalBinaryHolder[i]).to({ y: game.height / mobileBinaryHolderHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }
}
//Binary Card 1 Flip Animation
function playModeDecimalFlipCard(binaryCard) {
    let tween1 = this.game.add.tween(binaryCard.scale);
    tween1.to({ x: 0 }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.onComplete.addOnce(function (sprite, tween) {
        if (binaryCard.frame == 0) {
            binaryCard.frame = 1;
            cardflip.play();
        }
        else {
            binaryCard.frame = 0;
            cardflip.play();
        }
    }, this);
    let tween2 = this.game.add.tween(binaryCard.scale);
    tween2.to({ x: cardScaler }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.chain(tween2);
    tween1.start();
}
//Submit Button
function playModeDecimalKeyPadSubmit() {
    totalTimeCollector.push(decimalTotalSeconds);
    if (playModeDecimalTargetValue.toString() === playModeDecimalUserInputText.text) {
        playModeQuestionIncrementerValue++;
        decimalNumberOfCorrectAnswers++;
        decimalIndex++;
        playModeDecimalTries++;
        playModeDecimalCorrectAnswers++;
        NoOfTriesText.text = playModeDecimalTries;
        NoOfCorrectAnswersText.text = playModeDecimalCorrectAnswers;

        correct.play();
        correct.volume = 0.5;

        playModeDecimalCorrectAnswerAnimation();
        playModeDecimalresetValues();

        if ((decimalTotalSeconds > 0 && decimalTotalSeconds <= 10) && cardToogler.frame == 0) {
            decimalScore += 10;
            playModeDecimalNextLevelIn--;
            nextLevelText.text = playModeDecimalNextLevelIn;

            if (playModeQuestionIncrementerValue % playModeDecimalGigQuestionCount === 0 && playModeDecimalGig <= 9) {
                decimalIndex = 0;
                playModeQuestionIncrementerValue = 0;
                //To activate more questions for each GIG 
                //playModeDecimalGigQuestionCount = playModeDecimalGigQuestionCount + 2;
                playModeDecimalGig++;
                levelText.angle = 35;
                levelText.text = playModeDecimalGig;
                !game.device.desktop ? playModeDecimalBinaryPosition += 39 : playModeDecimalBinaryPosition += 20

                this.game.add.tween(levelText.scale).from({ x: 10, y: 10 }, 200, Phaser.Easing.Linear.None, true, 0);
                smash.play();
                combofull.play();
                combofull.volume = 0.5;

                game.camera.shake(0.003, 250);
                this.game.add.tween(levelText).to({ angle: 0 }, 200, Phaser.Easing.Exponential.Out, true);
                shake.shake(9, levelText);
            }
            else {
                //Do nothing for now
            }
        }
        else {
            playModeDecimalNextLevelIn = playModeDecimalGigQuestionCount;
            playModeQuestionIncrementerValue = 0;
            nextLevelText.text = playModeDecimalNextLevelIn;
            //decimalScore += 5;
        }

        decimalTimer.stop();
        decimalTotalSeconds = 10;

        decimalTimer = game.time.create(false);
        decimalTimer.loop(1000, updateCounterDecimal, this);
        decimalTimer.start();

        game.time.events.add(Phaser.Timer.SECOND * 0.5, playModeDecimalGenerateRandomNumber, this);
    }
    else {
        if (playModeDecimalUserInputText.text !== "") {
            wrong.play();
            playModeDecimalWrongAnswerAnimation();

            playModeDecimalTries++;
            playModeDecimalWrongAnswers++;
            NoOfTriesText.text = playModeDecimalTries;
            NoOfWrongAnswersText.text = playModeDecimalWrongAnswers;

            game.time.events.add(Phaser.Timer.SECOND * 0.5, popupDecimalWindow, this);
        }
    }
    cardToogler.frame = 0;
}
//Opening GameOver Panel & Stop the Timer
function popupDecimalWindow() {
    bgGroup = game.add.group();
    bgPanel = game.add.sprite(game.world.centerX, game.world.centerY, 'bg');
    bgPanel.anchor.setTo(0.5, 0.5);
    bgPanel.scale.setTo(1, 2);
    bgPanel.alpha = 0;
    bgGroup.add(bgPanel);

    bugImage = game.add.sprite(game.width / bugWidth, game.height / bugHeight, "bug");
    bugImage.anchor.setTo(0.5, 0.5);
    bugImage.scale.setTo(bugScaler, bugScaler);
    bugImage.angle = 45;

    numberOfCorrectAnswerLabel = game.add.text(game.world.centerX, game.height / noOfCorrectAnswerHeightMultipler, 'No. of Correct Answer:', { fontSize: statLabelFontSize, fill: '#e2e2e2', font: 'Pixel Digivolve', fontWeight: '400' });
    numberOfCorrectAnswerLabel.anchor.setTo(0.5, 0.5);
    numberOfCorrectAnswerText = game.add.text(game.world.centerX, game.height / noOfCorrectAnswerTextHeightMultipler, decimalNumberOfCorrectAnswers, { fontSize: statTextFontSize, fill: '#e2e2e2', font: 'Pixel Digivolve', fontWeight: '400' });
    numberOfCorrectAnswerText.anchor.setTo(0.5, 0.5);

    correctAnswerLabel = game.add.text(game.world.centerX, game.height / correctAnswerHeightMultipler, 'Correct Answer:', { fontSize: statLabelFontSize, fill: '#e2e2e2', font: 'Pixel Digivolve', fontWeight: '400' });
    correctAnswerLabel.anchor.setTo(0.5, 0.5);
    correctAnswerText = game.add.text(game.world.centerX, game.height / correctAnswerTextHeightMultipler, correctAnswer, { fontSize: statTextFontSize, fill: '#e2e2e2', font: 'Pixel Digivolve', fontWeight: '400' });
    correctAnswerText.anchor.setTo(0.5, 0.5);

    let closeButton = game.add.button(game.width / 2, game.height / closeButtonHeightMultipler, 'back', closeDecimalWindow, this);
    closeButton.anchor.setTo(0.5, 0.5);
    closeButton.scale.setTo(backBtnScaler, backBtnScaler);
    let closeButtonText = game.add.text(game.width / 2, game.height / closeButtonHeightMultipler, 'back to main menu', { fontSize: backBtnFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' })
    closeButtonText.anchor.setTo(0.5, 0.5);

    openDecimalWindow();

    playModeBtnClose.inputEnabled = false;
    cardToogler.inputEnabled = false;
    Key0.inputEnabled = false;
    Key1.inputEnabled = false;
    Key2.inputEnabled = false;
    Key3.inputEnabled = false;
    Key4.inputEnabled = false;
    Key5.inputEnabled = false;
    Key6.inputEnabled = false;
    Key7.inputEnabled = false;
    Key8.inputEnabled = false;
    Key9.inputEnabled = false;
    KeyBackSpace.inputEnabled = false;
    KeyEnter.inputEnabled = false;
    btnMute.inputEnabled = false;
    decimalTimer.stop();
}
//GameOver Panel Opening Animation
function openDecimalWindow() {
    // if (tween && tween.isRunning) return;

    bgPanel.alpha = 0.9;
    // tween = game.add.tween(bgPanel.scale).to({ x: 1, y: 2 }, 1000, Phaser.Easing.Elastic.Out, true);
}
//Hiding GameOver Panel
function closeDecimalWindow() {
    // if (tween && tween.isRunning) return;

    bgPanel.alpha = 0;
    // tween = null;
    playModeDecimalGameOver()
}
//Correct Answer Text Animation
function playModeDecimalCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Wrong Answer Text Animation
function playModeDecimalWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Generate Binary Number
function playModeDecimalGenerateRandomNumber() {
    //JSON Reference
    decimalJsonDataDict = {
        "3": decimalPhaserJSON.PMGOCBinary4BitList,
        "4": decimalPhaserJSON.PMGOCBinary8BitList,
        "5": decimalPhaserJSON.PMGOCBinary16BitList,
        "6": decimalPhaserJSON.PMGOCBinary32BitList,
        "7": decimalPhaserJSON.PMGOCBinary64BitList,
        "8": decimalPhaserJSON.PMGOCBinary128BitList,
        "9": decimalPhaserJSON.PMGOCBinary256BitList,
        "10": decimalPhaserJSON.PMGOCBinary512BitList
    }
    let binary

    for (let i = 0; i <= decimalIndex; i++) {
        binary = decimalJsonDataDict[playModeDecimalGig][i];
        playModeDecimalStringfy = binary;
    }
    playModeDecimalTargetValue = parseInt(playModeDecimalStringfy, 2);

    playModeDecimalEachGigKidocodeColor();

    //console.log("decimal: " + playModeDecimalTargetValue);
    //console.log("binary: " + playModeDecimalStringfy);
    correctAnswer = playModeDecimalTargetValue;

    for (let i = 0; i < binary.length; i++) {
        let res = playModeDecimalStringfy.charAt(i)
        playModeDecimalResult = res;
        playModeDecimalBinaryHolder[i] = game.add.text(game.world.centerX - playModeDecimalBinaryPosition + i * playModeDecimalBinaryIncrementer, game.height / mobileBinaryHolderHeightMultipler, res, { fontSize: binaryHolderFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        playModeDecimalBinaryHolder[i].anchor.setTo(0.5, 0.5);
    }
}
//Allowing to write on DB and Go to GameOver Scene
function playModeDecimalGameOver() {
    if (decimalScore < 0) {
        decimalScore = 0;
        isWriting = true;
        game.state.start('gameover');
    }
    else {
        isWriting = true;
        game.state.start('gameover');
    }
}
//Adding Color to kidocode name on new gig
function playModeDecimalEachGigKidocodeColor() {
    if (playModeDecimalGig === 4) {
        playModeTitle.addColor('#33B04A', 1);
        playModeTitle.addColor('#ffffff', 2);
    } else if (playModeDecimalGig === 5) {
        playModeTitle.addColor('#33B04A', 2);
        playModeTitle.addColor('#ffffff', 3);
    } else if (playModeDecimalGig === 6) {
        playModeTitle.addColor('#33B04A', 3);
        playModeTitle.addColor('#ffffff', 4);
    } else if (playModeDecimalGig === 7) {
        playModeTitle.addColor('#33B04A', 4);
        playModeTitle.addColor('#ffffff', 5);
    } else if (playModeDecimalGig === 8) {
        playModeTitle.addColor('#EE3E34', 5);
        playModeTitle.addColor('#ffffff', 6);
    } else if (playModeDecimalGig === 9) {
        playModeTitle.addColor('#F9CD15', 6);
        playModeTitle.addColor('#ffffff', 7);
    } else if (playModeDecimalGig === 10) {
        playModeTitle.addColor('#00A3DF', 7);
    }
}
//Reset Values After Each Question
function playModeDecimalresetValues() {
    playModeDecimalUserInputText.text = '';
    for (let i = 0; i < playModeDecimalStringfy.length; i++) {
        playModeDecimalBinaryHolder[i].text = '';
    }

    binaryCard.forEach(function (card) {
        card.frame = 0
        card.visible = false
    })

    if (decimalIndex >= decimalJsonDataDict[playModeDecimalGig].length) decimalIndex = 0;
}
// Resetting to Default Values
function playModeDecimalResetAll() {
    playModeQuestionIncrementerValue = 0;
    playModeDecimalGig = 3;
    playModeDecimalNextLevelIn = 5;
    decimalScore = 0;
    decimalIndex = 0;
    decimalTotalSeconds = 10;
    playModeDecimalGigQuestionCount = 5;
    decimalNumberOfCorrectAnswers = 0;
    totalAccumalation = 0;
}
//When game status changes to false from firebase move to gameover state
function playModeDecimalOnGameEndChangeState() {
    socket.on("get_decimal_game_end", function(data){
        if (data.decimalGame === false) {
            let stateName = game.state.getCurrentState().key
            if (stateName !== "gameover"){
                playModeDecimalGameOver()
            }
        }
    });
    socket.emit("get_decimal_game_end", {});
}
//All Devices Config
function playModeDecimalDeviceConfig() {
    if (game.device.android) {
        mobileTimerHeightMultipler = 9;
        mobileLevelLabelMultipler = 6;
        mobileLevelTextMultipler = 5;
        mobileNextLevelLabelMultipler = 1.5;
        mobileNextLevelValueMultipler = 1.625;
        mobileNextLevelLabelPositionMultipler = 7.5;
        mobileNextLevelValuePositionMultipler = 7.5;
        nextLevelLabelTempText = "more to next\ngig";

        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 4.5;
        mobileBinaryHolderHeightMultipler = 3;
        mobileBinaryHolderTweenHeightMultipler = 3.5;
        cardScaler = 0.7;
        cardHeightMultipler = 2.5;
        cardPositionMulitpler = 6;
        cardPositionIncrementer = 170;
        binaryHolderFontSize = '70px';
        userInputTextHeightMultipler = 1.8;
        userInputImageHeightMultipler = 1.75;
        userInputImageScaler = 0.85;
        NumPadPosition = 183;
        NumPadRow1HeightMultipler = 1.6;
        NumPadRow2HeightMultipler = 1.44;
        NumPadRow3HeightMultipler = 1.31;
        NumPadRow4HeightMultipler = 1.2;
        submitButtonHeightMultipler = 1.05;
        buttonWidth = 1.25;
        buttonHeight = 1.4;
        submitFontSize = '50px';
        NumPadFontSize = '40px'
        closeButtonScaler = 1;
        muteScaler = 0.5;
        noOfCorrectAnswerHeightMultipler = 2.6;
        noOfCorrectAnswerTextHeightMultipler = 2.35
        correctAnswerHeightMultipler = 2.1;
        correctAnswerTextHeightMultipler = 1.95;
        closeButtonHeightMultipler = 1.7;
        TimerFontSize = '50px';
        gigFontSize = '50px';
        firebaseTimeFontSize = "50px";
        bugWidth = 4;
        bugHeight = 2.6;
        triesIconScaler = 1;
        correctIconScaler = 1;
        questionTriesHeightMultipler = 6;
        correctHeightMultipler = 4.6;
        wrongHeightMultipler = 3.8;
        eraserHeightMultipler = 9;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        tiresCorrectTextPositionMultipler = 5.25;
        UITimerMutePosition = 1.35;
        tooglerScaler = 0.5
        statsTextPosition = 6.5;
        resultFontSize = "35px"
        UserInputFontSize = "50px"
        titlePosition = 6.5
        UIRow1Height = 18
        playModeDecimalBinaryIncrementer = 90
        playModeDecimalBinaryPosition = 85
        nextLevelFontSize = "50px"
        statLabelFontSize = "30px"
        statTextFontSize = "40px"
        backBtnFontSize = "40px"
        backBtnScaler = 1
        bugScaler = 1.5
        UIRow2Height = 9
        UIFloatRight = 1.1;
        UIFloatLeft = 11;
    }
    else if (game.device.iOS) {
        mobileTimerHeightMultipler = 9;
        mobileLevelLabelMultipler = 7;
        mobileLevelTextMultipler = 5;
        mobileNextLevelLabelMultipler = 1.5;
        mobileNextLevelValueMultipler = 1.625;
        mobileNextLevelLabelPositionMultipler = 7.5;
        mobileNextLevelValuePositionMultipler = 7.5;
        nextLevelLabelTempText = "more to next\ngig";

        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 4.5;
        mobileBinaryHolderHeightMultipler = 3;
        mobileBinaryHolderTweenHeightMultipler = 3.5;
        cardScaler = 0.65;
        cardHeightMultipler = 2.5;
        cardPositionMulitpler = 6;
        cardPositionIncrementer = 170;
        binaryHolderFontSize = '65px';
        userInputTextHeightMultipler = 1.8;
        userInputImageHeightMultipler = 1.75;
        userInputImageScaler = 0.85;
        NumPadPosition = 183;
        NumPadRow1HeightMultipler = 1.6;
        NumPadRow2HeightMultipler = 1.43;
        NumPadRow3HeightMultipler = 1.29;
        NumPadRow4HeightMultipler = 1.18;
        submitButtonHeightMultipler = 1.07;
        buttonWidth = 1.25;
        buttonHeight = 1.35;
        submitFontSize = '50px';
        NumPadFontSize = '40px'
        closeButtonScaler = 0.8;
        muteScaler = 0.4;
        noOfCorrectAnswerHeightMultipler = 2.6;
        noOfCorrectAnswerTextHeightMultipler = 2.35
        correctAnswerHeightMultipler = 2.1;
        correctAnswerTextHeightMultipler = 1.95;
        closeButtonHeightMultipler = 1.7;
        TimerFontSize = '50px';
        gigFontSize = '50px';
        firebaseTimeFontSize = "50px";
        bugWidth = 4;
        bugHeight = 2.6;
        triesIconScaler = 0.8;
        correctIconScaler = 0.8;
        questionTriesHeightMultipler = 6;
        correctHeightMultipler = 4.6;
        wrongHeightMultipler = 3.8;
        eraserHeightMultipler = 9;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        tiresCorrectTextPositionMultipler = 5.25;
        UITimerMutePosition = 1.35;
        tooglerScaler = 0.5
        statsTextPosition = 6.5;
        resultFontSize = "35px"
        UserInputFontSize = "50px"
        titlePosition = 6.5
        UIRow1Height = 18
        playModeDecimalBinaryIncrementer = 90
        playModeDecimalBinaryPosition = 85
        nextLevelFontSize = "50px"
        statLabelFontSize = "30px"
        statTextFontSize = "40px"
        backBtnFontSize = "40px"
        backBtnScaler = 1
        bugScaler = 1.5
        UIRow2Height = 9
        UIFloatRight = 1.1;
        UIFloatLeft = 11;
    }
    else if (game.device.desktop) {
        mobileTimerHeightMultipler = 10;
        mobileLevelLabelMultipler = 15;
        mobileLevelTextMultipler = 9;
        mobileNextLevelLabelMultipler = 1.25;
        mobileNextLevelValueMultipler = 1.45;
        mobileNextLevelLabelPositionMultipler = 8;
        mobileNextLevelValuePositionMultipler = 10;
        nextLevelLabelTempText = "more\nto\nnext gig";

        mobileCloseButtonwidthMulitper = 1.1;
        mobileHelperButtonHeightMultipler = 4.3;
        mobileBinaryHolderHeightMultipler = 3;
        mobileBinaryHolderTweenHeightMultipler = 5;
        binaryHolderFontSize = '40px';
        userInputTextHeightMultipler = 1.75;
        userInputImageHeightMultipler = 1.7;
        userInputImageScaler = 0.49;
        NumPadPosition = 105;
        NumPadRow1HeightMultipler = 1.565;
        NumPadRow2HeightMultipler = 1.42;
        NumPadRow3HeightMultipler = 1.3;
        NumPadRow4HeightMultipler = 1.2;
        submitButtonHeightMultipler = 1.065;
        buttonWidth = 0.7;
        buttonHeight = 0.7;
        submitFontSize = '30px';
        NumPadFontSize = '30px';
        submitButtonHeightMultipler = 1.065;
        closeButtonScaler = 0.5;
        muteScaler = 0.25;
        cardScaler = 0.4;
        cardHeightMultipler = 2.55;
        cardPositionMulitpler = 8.8;
        cardPositionIncrementer = 97;
        noOfCorrectAnswerHeightMultipler = 3.5;
        noOfCorrectAnswerTextHeightMultipler = 2.8
        correctAnswerHeightMultipler = 2.2;
        correctAnswerTextHeightMultipler = 1.9;
        closeButtonHeightMultipler = 1.4
        TimerFontSize = '30px';
        gigFontSize = '25px';
        firebaseTimeFontSize = "25px";
        bugWidth = 2.9;
        bugHeight = 3;
        triesIconScaler = 0.4;
        correctIconScaler = 0.4;
        eraserHeightMultipler = 10;
        triesCorrectFontSize = '30px';
        tiresCorrectPositionMultipler = 16;
        tiresCorrectTextPositionMultipler = 4.5;
        questionTriesHeightMultipler = 6;
        correctHeightMultipler = 4.6;
        wrongHeightMultipler = 3.7;
        tooglerScaler = 0.3
        statsTextPosition = 8;
        resultFontSize = "30px"
        UserInputFontSize = "30px"
        titlePosition = 6.5
        UIRow1Height = 25
        UITimerMutePosition = 1.3
        playModeDecimalBinaryIncrementer = 40
        playModeDecimalBinaryPosition = 40;
        nextLevelFontSize = "40px"
        statLabelFontSize = "25px"
        statTextFontSize = "30px"
        backBtnFontSize = "25px"
        backBtnScaler = 0.7
        bugScaler = 1
        UIRow2Height = 10
        UIFloatRight = 1.1;
        UIFloatLeft = 18;
    }
    game.load.crossOrigin = "Anonymous";
}