demo.playgamebinary = function () { };

let tempStr;
let playModeBinaryUserInputText = [];
let playModeUserInputBox = [];
let playModeUserInputCursor;
let playModeHiddenBinaryInputText;
let playModeResult;
let playModeStringfy;
let playModeBinaryResultLength;
let isNumPadClicked = false;
let playModeBinaryNumberOfTries = 0;
let playModeBinaryNumberOfCorrectAnswers = 0;
let playModeBinaryNumberOfWrongAnswers = 0;
let playModeBinaryNextLevelIn;
let playModeBinaryGigQuestionCount = 5;
let playModeBinaryGig = 3;
let binaryTimer;
let binaryTotalSeconds = 10;
let binaryIndex = 0;
let binaryPhaserJSON;
let binaryJsonDataDict;
let playModeBinaryRef;
let playModeBinaryFirebaseTime;
let playModeBinaryConnectivityBG;
let playModeBinaryConnectivityText;

demo.playgamebinary.prototype = {
    preload: function () {
        isPlayingModeBinary = true;
        //All Devices Config
        playModeBinaryDeviceConfig()
        // Resetting to Default Values
        playModeResetAll();
    },
    create: function () {
        binaryPhaserJSON = game.cache.getJSON(jsonLoader);
        //Shake Reference
        shake = new Phaser.Plugin.Shake(game);
        game.plugins.add(shake);

        previousUserData();

        //Audio Reference
        switchOn = game.add.audio("switchon");
        switchOff = game.add.audio("switchoff");
        btnClick = game.add.audio("btnClick");
        cardflip = game.add.audio("cardflip");
        keyPress = game.add.audio("keypress");
        correct = game.add.audio("correct");
        wrong = game.add.audio("wrong");
        combofull = game.add.audio("combo-full");
        smash = game.add.audio("smash");

        //Starting Timer
        binaryTimer = game.time.create(false);
        binaryTimer.loop(1000, updateCounter, this);
        binaryTotalSeconds = 10;
        binaryTimer.start();

        //Mute Button
        btnMute = game.add.button(game.width / UITimerMutePosition, game.height / UIRow2Height, "sound", playModeMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        playModeTitle = game.add.text(game.width / titlePosition, game.height / UIRow1Height, " Kidocode", { fontSize: gigFontSize, fill: "#ffffff", font: "Pixel Digivolve" });
        playModeTitle.anchor.setTo(0.5, 0.5);

        //Timer
        playModeTimer = game.add.text(game.width / 2, game.height / mobileTimerHeightMultipler, "", { fontSize: TimerFontSize, font: "Pixel Digivolve" });
        playModeTimer.anchor.setTo(0.5, 0.5);

        //Close Button
        playModeBtnClose = game.add.button(game.width / UIFloatRight, game.height / UIRow2Height, "close", playModeCloseButton, this);
        playModeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        playModeBtnClose.anchor.setTo(0.5, 0.5);

        //Card Toogler Button
        cardToogler = game.add.button(game.width / UIFloatRight, game.height / mobileHelperButtonHeightMultipler, "button", playModeCardToogler, this);
        cardToogler.scale.setTo(tooglerScaler, tooglerScaler);
        cardToogler.anchor.setTo(0.5, 0.5);
        cardToogler.frame = 0;

        for (let i = 0; i < 5; i++) {
            binaryCard[i] = game.add.button(game.width / cardPositionMulitpler + i * cardPositionIncrementer, game.height / cardHeightMultipler, allBinaryCardDict[i], playModeFlipCard, this);
            binaryCard[i].scale.setTo(cardScaler, cardScaler);
            binaryCard[i].anchor.setTo(0.5, 0.5);
            binaryCard[i].frame = 0;
            binaryCard[i].visible = false;
        }

        //Single Hidden Binary Text
        playModeHiddenBinaryInputText = game.add.text(game.world.centerX - 100, game.height / 2, "", { fontSize: "50px", fill: "#00D928", font: "Pixel Digivolve", fontWeight: "400" });
        playModeHiddenBinaryInputText.anchor.setTo(0.5, 0.5);
        playModeHiddenBinaryInputText.alpha = 0;

        //NumPad Button
        Key1 = game.add.button(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, "binarykeypad", playModeKeyPad1, this);
        Key1.anchor.setTo(0.5, 0.5);
        Key1.scale.setTo(keyScaler, keyScaler);
        this.Key1Text = game.add.text(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, "1", { fontSize: keyPadFontSize, fill: "#ffffff", font: "Pixel Digivolve", fontWeight: "400" });
        this.Key1Text.anchor.setTo(0.5, 0.5);

        Key0 = game.add.button(game.world.centerX, game.height / NumPadRowHeightMultipler, "binarykeypad", playModeKeyPad0, this);
        Key0.anchor.setTo(0.5, 0.5);
        Key0.scale.setTo(keyScaler, keyScaler);
        this.Key0Text = game.add.text(game.world.centerX, game.height / NumPadRowHeightMultipler, "0", { fontSize: keyPadFontSize, fill: "#ffffff", font: "Pixel Digivolve", fontWeight: "400" });
        this.Key0Text.anchor.setTo(0.5, 0.5);

        KeyBackSpace = game.add.button(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, "binarykeypad", playModeKeyPadRemove, this);
        KeyBackSpace.anchor.setTo(0.5, 0.5);
        KeyBackSpace.scale.setTo(keyScaler, keyScaler);
        KeyBackSpaceText = game.add.text(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, "<", { fontSize: keyPadFontSize, fill: "#ffffff", font: "Pixel Digivolve", fontWeight: "400" });
        KeyBackSpaceText.anchor.setTo(0.5, 0.5);

        KeyEnter = game.add.button(game.world.centerX, game.height / submitButtonHeightMultipler, "submit", playModeKeyPadSubmit, this);
        KeyEnter.anchor.setTo(0.5, 0.5);
        KeyEnter.scale.setTo(keyScaler, keyScaler);
        KeyEnterText = game.add.text(game.world.centerX, game.height / submitButtonHeightMultipler, "submit", { fontSize: submitFontSize, fill: "#00D928", font: "Pixel Digivolve", fontWeight: "400" });
        KeyEnterText.anchor.setTo(0.5, 0.5);

        //Correct Text
        correctText = game.add.text(game.world.centerX, game.height / 1.82, "correct!", { fontSize: resultFontSize, fill: "green", font: "Pixel Digivolve" });
        correctText.anchor.setTo(0.5, 0.5);
        correctText.scale.setTo(0, 0);

        //Wrong Text
        wrongText = game.add.text(game.world.centerX, game.height / 1.82, "wrong!", { fontSize: resultFontSize, fill: "red", font: "Pixel Digivolve" });
        wrongText.anchor.setTo(0.5, 0.5);
        wrongText.scale.setTo(0, 0);

        //Decimal Number Text
        targetText = game.add.text(game.width / 2, game.height / mobileDecimalHolderHeightMultipler, targetValue, { fontSize: decimalHolderFontSize, fill: "#ffffff", font: "Pixel Digivolve", fontWeight: "400" });
        targetText.anchor.setTo(0.5, 0.5);

        //playModeBinaryGig Text
        this.levelLabel = game.add.text(game.width / 2, game.height / UIRow1Height, "GIG: ", { fontSize: gigFontSize, fill: "#f2f2f2", font: "Pixel Digivolve" });
        this.levelLabel.anchor.setTo(0.5, 0.5);
        levelText = game.add.text(game.width / 1.75, game.height / UIRow1Height, playModeBinaryGig, { fontSize: gigFontSize, fill: "#f2f2f2", font: "Pixel Digivolve" });
        levelText.anchor.setTo(0.5, 0.5);

        //playModeBinaryNextLevelIn Text
        nextLevelLabel = game.add.text(game.width / mobileNextLevelLabelPositionMultipler, game.height / mobileNextLevelLabelMultipler, "", { fontSize: "30px", fill: "#f2f2f2", font: "Pixel Digivolve" });
        nextLevelLabel.anchor.setTo(0.5, 0.5);
        nextLevelLabel.angle = -370;
        nextLevelLabel.align = "center";
        nextLevelLabel.text = nextLevelLabelTemp

        nextLevelText = game.add.text(game.width / mobileNextLevelValuePositionMultipler, game.height / mobileNextLevelValueMultipler, playModeBinaryNextLevelIn, { fontSize: nextLevelFontSize, font: "Pixel Digivolve" });
        nextLevelText.anchor.setTo(0.5, 0.5);
        nextLevelText.angle = -370;
        nextLevelText.fill = "#33AF4A";
        nextLevelText.align = "right";

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
        this.playModeEraserButton = game.add.button(game.width / UIFloatLeft, game.height / eraserHeightMultipler, 'eraser', playModeRemoveStats, this);
        this.playModeEraserButton.anchor.setTo(0.5, 0.5);
        this.playModeEraserButton.scale.setTo(correctIconScaler, correctIconScaler);

        //Firebase Time
        this.playModeBinaryFirebaseTimeImg = game.add.sprite(game.width / UITimerMutePosition, game.height / UIRow1Height, "timer");
        this.playModeBinaryFirebaseTimeImg.scale.setTo(correctIconScaler, correctIconScaler);
        this.playModeBinaryFirebaseTimeImg.anchor.setTo(0.5, 0.5);
        playModeBinaryFirebaseTime = game.add.text(game.width / UIFloatRight, game.height / UIRow1Height, "0:00", { fontSize: firebaseTimeFontSize, fill: "#ffffff", font: "Pixel Digivolve" });
        playModeBinaryFirebaseTime.anchor.setTo(0.5, 0.5);

        playModeBinaryConnectivityBGGroup = game.add.group();
        playModeBinaryConnectivityBG = game.add.sprite(game.world.centerX, game.world.centerY, "bg");
        playModeBinaryConnectivityBG.anchor.setTo(0.5, 0.5);
        playModeBinaryConnectivityBG.scale.setTo(1, 2);
        playModeBinaryConnectivityBG.alpha = 0;
        playModeBinaryConnectivityBGGroup.add(playModeBinaryConnectivityBG);

        playModeBinaryConnectivityTextGroup = game.add.group();
        playModeBinaryConnectivityText = game.add.text(game.world.centerX, game.height / 2, "", { fontSize: statLabelFontSize, fill: "#e2e2e2", font: "Pixel Digivolve", fontWeight: "400" });
        playModeBinaryConnectivityText.anchor.setTo(0.5, 0.5);
        playModeBinaryConnectivityText.text = "No Internet Connection. \n Trying to reconnect...";
        playModeBinaryConnectivityText.alpha = 0;
        playModeBinaryConnectivityTextGroup.add(playModeBinaryConnectivityText);

        //let tweenRepeatFrom = game.add.tween(nextLevelText.scale).from({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true, 0);
        let tweenRepeatTo = game.add.tween(nextLevelText.scale).to({ x: 2, y: 2 }, 500, Phaser.Easing.Back.Out, true, 0);
        tweenRepeatTo.repeat(-1, 100);

        //Generate Decimal Number
        playModeGenerateRandomNumber();
        playModeBinaryResultLength = playModeStringfy.length;
        //Mapping Keyboard keys for Binary
        keyboardInputBinaryKeys();

        //Firebase Countdown Timer
        playModeCountDownTimer();
        //Firebase Change game state to Gameover
        playModeBinaryOnGameEndChangeState();
    },
    update: function () {
        tempStr = playModeHiddenBinaryInputText.text;
        //Updating Timer Each Frame

        playModeTimer.text = binaryTotalSeconds + "s";
        //Limiting Input according to Binary Result Length
        playModeInputLimiter();
        //Updating Target Text for each generator decimal number
        playModeUpdateDecimalTargetText();

        //Adding Binary into Input Boxes
        playModeAddUserBinaryInput();
        //Changing Streak/Combo Color
        playModeChangeStreakColor();
        //Changing Timer Color
        playModeChangeTimeColor();
        //Save & Load Stats to Browser LocalStorage
        plaModeCurrentPlayerLocalStorage();

        if (playModeBinaryNextLevelIn < 1) {
            playModeBinaryNextLevelIn = playModeBinaryGigQuestionCount;
            nextLevelText.text = playModeBinaryNextLevelIn;
        }

        if (playModeBinaryGig > 9) {
            nextLevelLabel.text = "Max\nLevel";
            nextLevelLabel.fontSize = "50px";
            nextLevelLabel.fill = "#EE3E34";
            nextLevelText.alpha = 0;
        }

        if (playModeStringfy.length > 5)
            cardToogler.visible = false;

        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }

        //Input Cursor For All Devices Config
        inputCursorForDevices();
        //Check Internet Connectivity 
        playModeBinaryCheckInternetConnectivity();
    }
};
//Check Internet Connectivity 
function playModeBinaryCheckInternetConnectivity(){
    if (navigator.onLine) {
        //console.log('online');
        if(playModeBinaryConnectivityBG.alpha === 1){
            playModeBinaryConnectivityBG.alpha = 0
            playModeBinaryConnectivityText.alpha = 0
            playModeBtnClose.inputEnabled = true;
            cardToogler.inputEnabled = true;
            Key0.inputEnabled = true;
            Key1.inputEnabled = true;
            KeyBackSpace.inputEnabled = true;
            KeyEnter.inputEnabled = true;
            btnMute.inputEnabled = true;
        }
    }
    else {
        console.log('offline');
        game.world.bringToTop(playModeBinaryConnectivityBGGroup)
        game.world.bringToTop(playModeBinaryConnectivityTextGroup)
        playModeBinaryConnectivityBG.alpha = 1
        playModeBinaryConnectivityText.alpha = 1
        playModeBtnClose.inputEnabled = false;
        cardToogler.inputEnabled = false;
        Key0.inputEnabled = false;
        Key1.inputEnabled = false;
        KeyBackSpace.inputEnabled = false;
        KeyEnter.inputEnabled = false;
        btnMute.inputEnabled = false;          
    }
}
//Firebase Countdown Timer
function playModeCountDownTimer() {
    socket.on("get_binary_game_status", function(data){
        let totalSeconds = data.totalSeconds;
        let binaryMinutes = parseInt(totalSeconds / 60) || 0;
        let binarySeconds = parseInt(totalSeconds % 60) || 0;

        if (binarySeconds < 10)
            binarySeconds = "0" + binarySeconds;

        playModeBinaryFirebaseTime.text = binaryMinutes + ":" + binarySeconds;
    });
    socket.emit("binary_game_status", {});
}
//Save & Load Stats to Browser LocalStorage
function plaModeCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('playmodebinarytries');
    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('playmodebinarytries', playModeBinaryNumberOfTries);
        localStorage.setItem('playmodebinaryca', playModeBinaryNumberOfCorrectAnswers);
        localStorage.setItem('playmodebinarywa', playModeBinaryNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('playmodebinarytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('playmodebinaryca');
        NoOfWrongAnswersText.text = localStorage.getItem('playmodebinarywa');
    }
    else if (playModeBinaryNumberOfTries >= currentTries || playModeBinaryNumberOfTries <= currentTries) {
        localStorage.setItem('playmodebinarytries', playModeBinaryNumberOfTries);
        localStorage.setItem('playmodebinaryca', playModeBinaryNumberOfCorrectAnswers);
        localStorage.setItem('playmodebinarywa', playModeBinaryNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('playmodebinarytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('playmodebinaryca');
        NoOfWrongAnswersText.text = localStorage.getItem('playmodebinarywa');
    }
}
//Reset Stats to Zero
function playModeRemoveStats() {
    playModeBinaryNumberOfTries = 0;
    playModeBinaryNumberOfCorrectAnswers = 0;
    playModeBinaryNumberOfWrongAnswers = 0;

    localStorage.setItem('playmodebinarytries', playModeBinaryNumberOfTries);
    localStorage.setItem('playmodebinaryca', playModeBinaryNumberOfCorrectAnswers);
    localStorage.setItem('playmodebinarywa', playModeBinaryNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('playmodebinarytries');
    NoOfCorrectAnswersText.text = localStorage.getItem('playmodebinaryca');
    NoOfWrongAnswersText.text = localStorage.getItem('playmodebinarywa');
}
//Mute Server Sound Only
function playModeMuteButton() {
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
//Updating Timer
function updateCounter() {
    if (binaryTotalSeconds > 0)
        binaryTotalSeconds--;
}
//Updating Target Text for each generator decimal number
function playModeUpdateDecimalTargetText() {
    targetText.text = targetValue;
}
//Changing Streak/Combo Color
function playModeChangeStreakColor() {
    if (playModeBinaryGig == 3)
        levelText.fill = "#01A3DE";
    else if (playModeBinaryGig >= 4 && playModeBinaryGig <= 5)
        levelText.fill = "#F9CC14";
    else if (playModeBinaryGig >= 6 && playModeBinaryGig <= 8)
        levelText.fill = "#F16621";
    else if (playModeBinaryGig >= 9)
        levelText.fill = "#EE3E34";
}
//Changing Time Color
function playModeChangeTimeColor() {
    if (binaryTotalSeconds >= 0 && binaryTotalSeconds <= 2)
        playModeTimer.fill = "#EE3E34";
    else if (binaryTotalSeconds >= 3 && binaryTotalSeconds <= 6)
        playModeTimer.fill = "#F9CC14";
    else if (binaryTotalSeconds >= 7 && binaryTotalSeconds <= 10)
        playModeTimer.fill = "#33AF4A";
}
//Mapping Keyboard keys for Binary
function keyboardInputBinaryKeys() {
    this.playModeNumPad0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    this.playModeNumPad0.onDown.add(playModeKeyPad0, this);

    this.playModeNumPad1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.playModeNumPad1.onDown.add(playModeKeyPad1, this);

    this.playModeNumPadBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    this.playModeNumPadBackSpace.onDown.add(playModeKeyPadRemove, this);

    this.playModeNumPadEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.playModeNumPadEnter.onDown.add(playModeKeyPadSubmit, this);
}
//Removing Mapping Keyboard keys for Binary
function removeKeyboardInputBinaryKeys() {
    this.playModeNumPad0 = game.input.keyboard.removeKey(Phaser.Keyboard.ZERO);
    this.playModeNumPad1 = game.input.keyboard.removeKey(Phaser.Keyboard.ONE);
    this.playModeNumPadBackSpace = game.input.keyboard.removeKey(Phaser.Keyboard.BACKSPACE);
    this.playModeNumPadEnter = game.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
}
//Adding Binary into Input Boxes
function playModeAddUserBinaryInput() {
    if (isNumPadClicked) {
        let playModeTempCharHolder = playModeHiddenBinaryInputText.text;
        let playModeTempStringHolder;

        if (playModeBinaryResultLength <= 0)
            playModeBinaryResultLength = playModeStringfy.length;

        playModeTempStringHolder = playModeTempCharHolder.charAt(playModeStringfy.length - playModeBinaryResultLength);
        try {
            playModeBinaryUserInputText[playModeStringfy.length - playModeBinaryResultLength].text = playModeTempStringHolder;
        }
        catch (err) {
            console.log(err.message, (playModeStringfy.length - playModeBinaryResultLength))
            console.log(playModeStringfy.length, playModeBinaryResultLength)
        }

        isNumPadClicked = false;
        playModeBinaryResultLength--;
        // console.log("Remaining: " + playModeBinaryResultLength);
    }
}
//Binary Key 0 for KeyPad
function playModeKeyPad0() {
    // console.log("NUMPAD 0:", playModeStringfy.length, tempStr.length)
    if (playModeStringfy.length > tempStr.length) {
        if (!isNumPadClicked) {
            isNumPadClicked = true;
            playModeHiddenBinaryInputText.text += 0;
            keyPress.play();

            if (playModeStringfy.length > playModeHiddenBinaryInputText.text.length) {
                if (!game.device.desktop)
                    playModeUserInputCursor.x = playModeUserInputCursor.x + 90;
                else
                    playModeUserInputCursor.x = playModeUserInputCursor.x + 45;
            }
        }
    }
    else {
        //Do nothing
    }
}
//Binary Key 1 for KeyPad
function playModeKeyPad1() {
    // console.log("NUMPAD 1:", playModeStringfy.length, tempStr.length)
    if (playModeStringfy.length > tempStr.length) {
        if (!isNumPadClicked) {
            isNumPadClicked = true;
            playModeHiddenBinaryInputText.text += 1;
            keyPress.play();

            if (playModeStringfy.length > playModeHiddenBinaryInputText.text.length) {
                if (!game.device.desktop)
                    playModeUserInputCursor.x = playModeUserInputCursor.x + 90;
                else
                    playModeUserInputCursor.x = playModeUserInputCursor.x + 45;
            }
        }
    }
    else {
        //Do nothing
    }
}
//Binary BackSpace Key for KeyPad
function playModeKeyPadRemove() {
    if (!isNumPadClicked) {
        keyPress.play();
        playModeHiddenBinaryInputText.text = tempStr.substr(0, tempStr.length - 1);

        let tempDicr = tempStr.length;
        if (tempDicr <= 0) {
            //console.log("false");
        }
        else {
            playModeBinaryUserInputText[tempDicr - 1].text = "";
            if (playModeBinaryResultLength < playModeStringfy.length)
                playModeBinaryResultLength++;

            // console.log("Added: " + playModeBinaryResultLength);
            if (tempDicr <= playModeStringfy.length - 1) {
                if (!game.device.desktop)
                    playModeUserInputCursor.x = playModeUserInputCursor.x - 90;
                else
                    playModeUserInputCursor.x = playModeUserInputCursor.x - 45;
            }
        }
    }
}
//Limiting Input according to Binary Result Length
function playModeInputLimiter() {
    if (tempStr.length > playModeStringfy.length)
        playModeHiddenBinaryInputText.text = tempStr.substr(0, tempStr.length - 1);
}
//Toogle Button For Binary Cards
function playModeCardToogler() {
    if (cardToogler.frame == 0) {
        switchOn.play();
        cardToogler.frame = 1
        binaryCard.forEach(function (card) {
            card.visible = true
        });
        game.add.tween(targetText).to({ y: game.height / mobileDecimalHolderTweenHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
    } else {
        switchOff.play();
        cardToogler.frame = 0
        binaryCard.forEach(function (card) {
            card.visible = false
            card.frame = 0
        });
        game.add.tween(targetText).to({ y: game.height / mobileDecimalHolderHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
    }
}
//Binary Card Flip Animation
function playModeFlipCard(binaryCard) {
    let tween1 = this.game.add.tween(binaryCard.scale);
    tween1.to({ x: 0 }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.onComplete.addOnce(function (sprite, tween) {
        if (binaryCard.frame == 0) {
            binaryCard.frame = 1;
            cardflip.play();
        } else {
            binaryCard.frame = 0;
            cardflip.play();
        }
    }, this);
    let tween2 = this.game.add.tween(binaryCard.scale);
    tween2.to({ x: cardScaler }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.chain(tween2);
    tween1.start();
}
//Close this playModeBinaryGig and Return to PlayMode MainMenu Scene
function playModeCloseButton() {
    btnClick.play();
    playModeResetAll();
    binaryCard.length = 0;
    cardToogler.frame = 0;
    game.state.start("playmainmenu");
}
//Submit Button
function playModeKeyPadSubmit() {
    totalTimeCollector.push(binaryTotalSeconds);
    if (playModeStringfy.toString() === playModeHiddenBinaryInputText.text) {
        Key1.inputEnabled = false;
        Key0.inputEnabled = false;
        removeKeyboardInputBinaryKeys();

        playModeQuestionIncrementerValue++;
        binaryNumberOfCorrectAnswers++;
        binaryIndex++;
        playModeBinaryNumberOfTries++;
        playModeBinaryNumberOfCorrectAnswers++;
        NoOfTriesText.text = playModeBinaryNumberOfTries;
        NoOfCorrectAnswersText.text = playModeBinaryNumberOfCorrectAnswers;

        correct.play();
        correct.volume = 0.5;

        playModeCorrectAnswerAnimation();
        playModeresetValues();

        if ((binaryTotalSeconds > 0 && binaryTotalSeconds <= 10) && cardToogler.frame == 0) {
            binaryScore += 10;
            playModeBinaryNextLevelIn--;
            nextLevelText.text = playModeBinaryNextLevelIn;
            if (playModeQuestionIncrementerValue % playModeBinaryGigQuestionCount === 0 && playModeBinaryGig <= 9) {
                binaryIndex = 0;
                playModeQuestionIncrementerValue = 0;
                //To activate more questions for each GIG
                //playModeBinaryGigQuestionCount = playModeBinaryGigQuestionCount + 2;
                playModeBinaryGig++;
                levelText.angle = 35;
                levelText.text = playModeBinaryGig;
                if (!game.device.desktop) {
                    playModeDashUserInputTextPosition += 45;
                    playModeDashUserInputTextPosition1 += 45;
                }
                else {
                    playModeDashUserInputTextPosition += 20;
                    playModeDashUserInputTextPosition1 += 20;
                }

                this.game.add.tween(levelText.scale).from({ x: 10, y: 10 }, 200, Phaser.Easing.Linear.None, true, 0);
                smash.play();
                combofull.play();
                combofull.volume = 0.5;

                game.camera.shake(0.003, 250);
                this.game.add.tween(levelText).to({ angle: 0 }, 200, Phaser.Easing.Exponential.Out, true);
                shake.shake(9, levelText);
            }
            else {
                //console.log("2nd out");
            }
        }
        else {
            playModeBinaryNextLevelIn = playModeBinaryGigQuestionCount;
            playModeQuestionIncrementerValue = 0;
            nextLevelText.text = playModeBinaryNextLevelIn;
            //binaryScore += 5;
        }

        binaryTimer.stop();
        binaryTotalSeconds = 10;

        binaryTimer = game.time.create(false);
        binaryTimer.loop(1000, updateCounter, this);
        binaryTimer.start();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, playModeGenerateRandomNumber, this);
    }
    else {
        if (playModeHiddenBinaryInputText.text.length === playModeStringfy.length) {
            playModeWrongAnswerAnimation();
            wrong.play();

            playModeBinaryNumberOfTries++;
            playModeBinaryNumberOfWrongAnswers++;
            NoOfTriesText.text = playModeBinaryNumberOfTries;
            NoOfWrongAnswersText.text = playModeBinaryNumberOfWrongAnswers;

            game.time.events.add(Phaser.Timer.SECOND * 0.5, popupWindow, this);
        }
    }
}
//Opening GameOver Panel & Stop the Timer
function popupWindow() {
    bgGroup = game.add.group();
    bg = game.add.sprite(game.world.centerX, game.world.centerY, "bg");
    bg.anchor.setTo(0.5, 0.5);
    bg.scale.setTo(1, 2);
    bg.alpha = 0;
    bgGroup.add(bg);

    bugImage = game.add.sprite(game.width / bugWidth, game.height / bugHeight, "bug");
    bugImage.anchor.setTo(0.5, 0.5);
    bugImage.scale.setTo(bugScaler, bugScaler);
    bugImage.angle = 45;

    numberOfCorrectAnswerLabel = game.add.text(game.world.centerX, game.height / noOfCorrectAnswerHeightMultipler, "No. of Correct Answer:", { fontSize: statLabelFontSize, fill: "#e2e2e2", font: "Pixel Digivolve", fontWeight: "400" });
    numberOfCorrectAnswerLabel.anchor.setTo(0.5, 0.5);
    numberOfCorrectAnswerText = game.add.text(game.world.centerX, game.height / noOfCorrectAnswerTextHeightMultipler, binaryNumberOfCorrectAnswers, { fontSize: statTextFontSize, fill: "#e2e2e2", font: "Pixel Digivolve", fontWeight: "400" });
    numberOfCorrectAnswerText.anchor.setTo(0.5, 0.5);

    correctAnswerLabel = game.add.text(game.world.centerX, game.height / correctAnswerHeightMultipler, "Correct Answer:", { fontSize: statLabelFontSize, fill: "#e2e2e2", font: "Pixel Digivolve", fontWeight: "400" });
    correctAnswerLabel.anchor.setTo(0.5, 0.5);
    correctAnswerText = game.add.text(game.world.centerX, game.height / correctAnswerTextHeightMultipler, correctAnswer, { fontSize: statTextFontSize, fill: "#e2e2e2", font: "Pixel Digivolve", fontWeight: "400" });
    correctAnswerText.anchor.setTo(0.5, 0.5);

    let closeButton = game.add.button(game.width / 2, game.height / closeButtonHeightMultipler, "back", closeWindow, this);
    closeButton.anchor.setTo(0.5, 0.5);
    closeButton.scale.setTo(backBtnScaler, backBtnScaler);
    let closeButtonText = game.add.text(game.width / 2, game.height / closeButtonHeightMultipler, "back to main menu", { fontSize: backBtnFontSize, fill: "#ffffff", font: "Pixel Digivolve", fontWeight: "400" });
    closeButtonText.anchor.setTo(0.5, 0.5);

    openWindow();
    playModeBtnClose.inputEnabled = false;
    cardToogler.inputEnabled = false;
    Key0.inputEnabled = false;
    Key1.inputEnabled = false;
    KeyBackSpace.inputEnabled = false;
    KeyEnter.inputEnabled = false;
    btnMute.inputEnabled = false;
    binaryTimer.stop();
}
//GameOver Panel Opening Animation
function openWindow() {
    // if ((tween !== null && tween.isRunning)) return;

    bg.alpha = 0.9;
    // tween = game.add.tween(bg.scale).to({ x: 1, y: 2 }, 1000, Phaser.Easing.Elastic.Out, true);
}
//Hiding GameOver Panel 
function closeWindow() {
    // if ((tween && tween.isRunning)) return;

    bg.alpha = 0;
    // tween = null;
    playModeBinaryGameOver();
}
//Correct Answer Text Animation
function playModeCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Wrong Answer Text Animation
function playModeWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Adding LeftPad Zero to Binary Code 
function playModeBinaryZeroPad(number, size) {
    let s = number + "";
    while (s.length < size) s = "0" + s;
    return s;
}
//Generate Decimal Number
function playModeGenerateRandomNumber() {
    keyboardInputBinaryKeys();
    //JSON Reference
    binaryJsonDataDict = {
        "3": binaryPhaserJSON.PMGOCDecimal4BitList,
        "4": binaryPhaserJSON.PMGOCDecimal8BitList,
        "5": binaryPhaserJSON.PMGOCDecimal16BitList,
        "6": binaryPhaserJSON.PMGOCDecimal32BitList,
        "7": binaryPhaserJSON.PMGOCDecimal64BitList,
        "8": binaryPhaserJSON.PMGOCDecimal128BitList,
        "9": binaryPhaserJSON.PMGOCDecimal256BitList,
        "10": binaryPhaserJSON.PMGOCDecimal512BitList
    }
    Key1.inputEnabled = true;
    Key0.inputEnabled = true;
    let binary

    for (let i = 0; i <= binaryIndex; i++) {
        targetValue = binaryJsonDataDict[playModeBinaryGig][i];
        binary = parseInt(binaryJsonDataDict[playModeBinaryGig].length, 10).toString(2);
        playModeResult = parseInt(targetValue, 10).toString(2)
        playModeStringfy = playModeBinaryZeroPad(playModeResult, binary.length);
    }

    eachGigKidocodeColor();

    //console.log("gig: " + playModeBinaryGigQuestionCount);
    //console.log("Q# :" + playModeQuestionIncrementerValue);
    //console.log("binary: " + playModeStringfy);
    correctAnswer = playModeStringfy;

    playModeUserInputCursor = game.add.text(game.world.centerX - playModeDashUserInputTextPosition1, game.height / inputBoxHeightMultipler, "_", { fontSize: cursorFontSize, fill: "#00D928", font: "Pixel Digivolve", fontWeight: "400" });
    playModeUserInputCursor.anchor.setTo(0.5, 0.5);
    playModeUserInputCursor.tint = 0x00390a;
    game.add.tween(playModeUserInputCursor).to({ tint: 0x00bd23 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

    for (let i = 0; i < binary.length; i++) {
        playModeResult = playModeStringfy.charAt(i);
        playModeUserInputBox[i] = game.add.sprite(game.world.centerX - playModeDashUserInputTextPosition + i * playModeDashUserInputIncrementer, game.height / inputBoxHeightMultipler, "inputbox");
        playModeUserInputBox[i].anchor.setTo(0.5, 0.5);
        playModeUserInputBox[i].scale.setTo(inputBoxScalerX, inputBoxScalerY);
        playModeBinaryUserInputText[i] = game.add.text(game.world.centerX - playModeDashUserInputTextPosition + i * playModeDashUserInputIncrementer, game.height / inputBoxHeightMultipler, "", { fontSize: userInputFontSize, fill: "#00D928", font: "Pixel Digivolve", fontWeight: "400" });
        playModeBinaryUserInputText[i].anchor.setTo(0.5, 0.5);
    }
    //console.log(playModeUserInputCursor.x);
}
//Adding Color to kidocode name on new gig
function eachGigKidocodeColor() {
    if (playModeBinaryGig === 4) {
        playModeTitle.addColor("#33B04A", 1);
        playModeTitle.addColor("#ffffff", 2);
    } else if (playModeBinaryGig === 5) {
        playModeTitle.addColor("#33B04A", 2);
        playModeTitle.addColor("#ffffff", 3);
    } else if (playModeBinaryGig === 6) {
        playModeTitle.addColor("#33B04A", 3);
        playModeTitle.addColor("#ffffff", 4);
    } else if (playModeBinaryGig === 7) {
        playModeTitle.addColor("#33B04A", 4);
        playModeTitle.addColor("#ffffff", 5);
    } else if (playModeBinaryGig === 8) {
        playModeTitle.addColor("#EE3E34", 5);
        playModeTitle.addColor("#ffffff", 6);
    } else if (playModeBinaryGig === 9) {
        playModeTitle.addColor("#F9CD15", 6);
        playModeTitle.addColor("#ffffff", 7);
    } else if (playModeBinaryGig === 10) {
        playModeTitle.addColor("#00A3DF", 7);
    }
}
//Reset Values After Each Question
function playModeresetValues() {
    targetText.text = "";
    playModeUserInputCursor.text = "";
    for (let i = 0; i < playModeStringfy.length; i++) {
        playModeHiddenBinaryInputText.text = "";
        playModeBinaryUserInputText[i].text = "";
        playModeUserInputBox[i].destroy();
    }

    binaryCard.forEach(function (card) { card.frame = 0 })

    if (binaryIndex >= binaryJsonDataDict[playModeBinaryGig].length) binaryIndex = 0;
}
//Allowing to write on DB and Go to GameOver Scene
function playModeBinaryGameOver() {
    if (binaryScore < 0) {
        binaryScore = 0;
        isWriting = true;
        game.state.start("gameover");
    }
    else {
        isWriting = true;
        game.state.start("gameover");
    }
}
// Resetting to Default Values
function playModeResetAll() {
    playModeQuestionIncrementerValue = 0;
    playModeBinaryGig = 3;
    playModeBinaryNextLevelIn = 5;
    binaryScore = 0;
    binaryIndex = 0;
    binaryTotalSeconds = 10;
    playModeBinaryGigQuestionCount = 5;
    binaryNumberOfCorrectAnswers = 0;
    totalAccumalation = 0;
}
//When game status changes to false from firebase move to gameover state
function playModeBinaryOnGameEndChangeState() {
    socket.on("get_binary_game_end", function(data){
        if (data.binaryGame === false) {
            let stateName = game.state.getCurrentState().key
            if (stateName !== "gameover") {
                playModeBinaryGameOver();
            }
        }
    });
    socket.emit("get_binary_game_end", {});
}
//Input Cursor For All Devices Config
function inputCursorForDevices() {
    if (playModeBinaryGig === 3 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 3 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 403;
    else if (playModeBinaryGig === 3 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 200;

    if (playModeBinaryGig === 4 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 4 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 360;
    else if (playModeBinaryGig === 4 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 180;

    if (playModeBinaryGig === 5 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 5 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 313;
    else if (playModeBinaryGig === 5 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 160;

    if (playModeBinaryGig === 6 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 6 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 270;
    else if (playModeBinaryGig === 6 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 140;

    if (playModeBinaryGig === 7 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 7 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 223;
    else if (playModeBinaryGig === 7 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 120;

    if (playModeBinaryGig === 8 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 8 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 178;
    else if (playModeBinaryGig === 8 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 100;

    if (playModeBinaryGig === 9 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 9 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 134;
    else if (playModeBinaryGig === 9 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 80;

    if (playModeBinaryGig === 10 && playModeHiddenBinaryInputText.text === "" && game.device.android || playModeBinaryGig === 10 && playModeHiddenBinaryInputText.text === "" && game.device.iOS)
        playModeUserInputCursor.x = 90;
    else if (playModeBinaryGig === 10 && playModeHiddenBinaryInputText.text === "" && game.device.desktop)
        playModeUserInputCursor.x = 60;
}
//All Devices Config
function playModeBinaryDeviceConfig() {
    if (game.device.android) {
        mobileTimerHeightMultipler = 9;
        mobileLevelLabelMultipler = 15;
        mobileLevelTextMultipler = 5;
        mobileNextLevelLabelMultipler = 1.5;
        mobileNextLevelValueMultipler = 1.625;
        mobileNextLevelLabelPositionMultipler = 5.5;
        mobileNextLevelValuePositionMultipler = 6;

        UIFloatRight = 1.1;
        UIRow2Height = 9
        mobileHelperButtonHeightMultipler = 4.5;
        mobileDecimalHolderHeightMultipler = 2.3;
        mobileDecimalHolderTweenHeightMultipler = 3.5;
        decimalHolderFontSize = "60px";
        submitButtonHeightMultipler = 1.3;
        NumPadRowHeightMultipler = 1.55;
        closeButtonScaler = 1;
        muteScaler = 0.5;
        cardPositionMulitpler = 6.5;
        cardPositionIncrementer = 170;
        cardScaler = 0.65;
        cardHeightMultipler = 2.6;
        inputBoxScalerX = 1.3;
        inputBoxScalerY = 1.3
        inputBoxHeightMultipler = 1.83;
        noOfCorrectAnswerHeightMultipler = 2.6;
        noOfCorrectAnswerTextHeightMultipler = 2.35;
        correctAnswerHeightMultipler = 2.1;
        correctAnswerTextHeightMultipler = 1.95;
        closeButtonHeightMultipler = 1.7;
        submitFontSize = "50px";
        TimerFontSize = "50px";
        gigFontSize = "50px";
        firebaseTimeFontSize = "50px";
        bugWidth = 4;
        bugHeight = 2.6;
        triesIconScaler = 1;
        correctIconScaler = 1;
        questionTriesHeightMultipler = 6;
        correctHeightMultipler = 4.6;
        wrongHeightMultipler = 3.8;
        eraserHeightMultipler = 9;
        UIFloatLeft = 11;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        // tiresCorrectTextPositionMultipler = 5.25;
        resultFontSize = '35px';
        statsTextPosition = 6.5;
        keyScaler = 1
        tooglerScaler = 0.5
        titlePosition = 6.5
        firebaseTimePosition = 1.2
        UIRow1Height = 18;
        UITimerMutePosition = 1.35
        keyPadPosition = 110
        keyPadFontSize = "50px"
        playModeDashUserInputTextPosition = 90;
        playModeDashUserInputTextPosition1 = 95;
        playModeDashUserInputIncrementer = 90
        userInputFontSize = "50px"
        cursorFontSize = "50px"
        nextLevelFontSize = "50px"
        nextLevelLabelTemp = "to next gig"
        statLabelFontSize = "30px"
        statTextFontSize = "40px"
        backBtnFontSize = "40px"
        backBtnScaler = 1
        bugScaler = 1.5
    }
    else if (game.device.iOS) {
        mobileTimerHeightMultipler = 9;
        mobileLevelLabelMultipler = 15;
        mobileLevelTextMultipler = 5;
        mobileNextLevelLabelMultipler = 1.5;
        mobileNextLevelValueMultipler = 1.625;
        mobileNextLevelLabelPositionMultipler = 5.5;
        mobileNextLevelValuePositionMultipler = 6;

        UIFloatRight = 1.1;
        UIRow2Height = 9
        mobileHelperButtonHeightMultipler = 4.5;
        mobileDecimalHolderHeightMultipler = 2.3;
        mobileDecimalHolderTweenHeightMultipler = 3.5;
        decimalHolderFontSize = "60px";
        submitButtonHeightMultipler = 1.2;
        NumPadRowHeightMultipler = 1.4;
        closeButtonScaler = 0.8;
        muteScaler = 0.4;
        cardPositionMulitpler = 6.5;
        cardPositionIncrementer = 170;
        cardScaler = 0.65;
        cardHeightMultipler = 2.4;
        inputBoxScalerX = 1.3;
        inputBoxScalerY = 1.3
        inputBoxHeightMultipler = 1.73;
        noOfCorrectAnswerHeightMultipler = 2.6;
        noOfCorrectAnswerTextHeightMultipler = 2.35;
        correctAnswerHeightMultipler = 2.1;
        correctAnswerTextHeightMultipler = 1.95;
        closeButtonHeightMultipler = 1.7;
        submitFontSize = "50px";
        TimerFontSize = "50px";
        gigFontSize = "50px";
        firebaseTimeFontSize = "50px";
        bugWidth = 4;
        bugHeight = 2.6;
        triesIconScaler = 0.8;
        correctIconScaler = 0.8;
        questionTriesHeightMultipler = 6;
        correctHeightMultipler = 4.6;
        wrongHeightMultipler = 3.8;
        eraserHeightMultipler = 9;
        UIFloatLeft = 11;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        // tiresCorrectTextPositionMultipler = 5.25;
        resultFontSize = '35px';
        statsTextPosition = 6.5;
        keyScaler = 1
        tooglerScaler = 0.5
        titlePosition = 6.5
        firebaseTimePosition = 1.2
        UIRow1Height = 18;
        UITimerMutePosition = 1.35
        keyPadPosition = 110
        keyPadFontSize = "50px"
        playModeDashUserInputTextPosition = 90;
        playModeDashUserInputTextPosition1 = 95;
        playModeDashUserInputIncrementer = 90
        userInputFontSize = "50px"
        cursorFontSize = "50px"
        nextLevelFontSize = "50px"
        nextLevelLabelTemp = "to next gig"
        statLabelFontSize = "30px"
        statTextFontSize = "40px"
        backBtnFontSize = "40px"
        backBtnScaler = 1
        bugScaler = 1.5
    }
    else if (game.device.desktop) {
        mobileTimerHeightMultipler = 10;
        mobileLevelLabelMultipler = 25;
        mobileLevelTextMultipler = 13;
        mobileNextLevelLabelMultipler = 1.25;
        mobileNextLevelValueMultipler = 1.4;
        mobileNextLevelLabelPositionMultipler = 7;
        mobileNextLevelValuePositionMultipler = 8;
        submitFontSize = "30px";
        UIFloatRight = 1.1;
        UIRow2Height = 10
        mobileHelperButtonHeightMultipler = 4.3;
        mobileDecimalHolderHeightMultipler = 3;
        mobileDecimalHolderTweenHeightMultipler = 5;
        cardScaler = 0.4;
        cardHeightMultipler = 3;
        decimalHolderFontSize = "50px";
        submitButtonHeightMultipler = 1.08;
        NumPadRowHeightMultipler = 1.25;
        closeButtonScaler = 0.5;
        muteScaler = 0.25;
        cardScaler = 0.4;
        cardHeightMultipler = 2.4;
        cardPositionMulitpler = 8.8;
        cardPositionIncrementer = 97;
        inputBoxScalerX = 0.68;
        inputBoxScalerY = 0.75
        inputBoxHeightMultipler = 1.7;
        noOfCorrectAnswerHeightMultipler = 3.5;
        noOfCorrectAnswerTextHeightMultipler = 2.8;
        correctAnswerHeightMultipler = 2.2;
        correctAnswerTextHeightMultipler = 1.9;
        closeButtonHeightMultipler = 1.4;
        TimerFontSize = "30px";
        gigFontSize = "25px";
        firebaseTimeFontSize = "25px";
        bugWidth = 2.9;
        bugHeight = 3;
        triesIconScaler = 0.5;
        correctIconScaler = 0.5;
        eraserHeightMultipler = 10;
        UIFloatLeft = 18;
        triesCorrectFontSize = '30px';
        tiresCorrectPositionMultipler = 16;
        questionTriesHeightMultipler = 6;
        correctHeightMultipler = 4.6;
        wrongHeightMultipler = 3.7
        // tiresCorrectTextPositionMultipler = 4.5;
        resultFontSize = '30px';
        statsTextPosition = 8;
        keyScaler = 0.6
        tooglerScaler = 0.3
        titlePosition = 6.5
        firebaseTimePosition = 1.12
        UIRow1Height = 25;
        UITimerMutePosition = 1.3
        keyPadPosition = 80
        keyPadFontSize = "35px"
        playModeDashUserInputTextPosition = 50;
        playModeDashUserInputTextPosition1 = 55;
        playModeDashUserInputIncrementer = 45
        userInputFontSize = "30px"
        cursorFontSize = "35px"
        nextLevelFontSize = "40px"
        nextLevelLabelTemp = "to next\ngig"
        statLabelFontSize = "25px"
        statTextFontSize = "30px"
        backBtnFontSize = "25px"
        backBtnScaler = 0.7
        bugScaler = 1
    }
    game.load.crossOrigin = "Anonymous";
}