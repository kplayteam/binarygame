demo.keyindecimalpracticehard = function () { };

let kidPracticeHardUserInputText;
let kidPracticeHardResult;
let kidPracticeHardStringfy;
var bitLength;
let kidPracticeHardModeNumberOfTries = 0;
let kidPracticeHardModeNumberOfCorrectAnswers = 0;
let kidPracticeHardModeNumberOfWrongAnswers = 0;

demo.keyindecimalpracticehard.prototype = {
    preload: function () {
        //All Device Config
        kidPracticeHardDeviceConfig()
    },
    create: function () {
        if (index > 0) index = 0;

        btnClick = game.add.audio('btnClick');
        keyPress = game.add.audio('keypress');
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');

        btnMute = game.add.button(game.width / btnMutePosition, game.height / 15, 'sound', kidPracticeHardMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        this.PracticeTitle = game.add.text(game.width / 4, game.height / 15, 'Key in number', { fontSize: ModeFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.PracticeTitle.anchor.setTo(0.5, 0.5);

        //Close Button
        this.PracticeBtnClose = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / 15, 'close', kidPracticeHardCloseButton, this);
        this.PracticeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        this.PracticeBtnClose.anchor.setTo(0.5, 0.5);

        for (let i = 0; i < 8; i++) {
            let bitText = i === 0 ? 1 : Math.pow(2, i);
            practiceBitText[i] = game.add.text(game.width / bitTextPositionMulitpler - i * cardPositionIncrementer, game.height / bitTextHeightMultipler, bitText, { fontSize: bitFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
            practiceBitText[i].anchor.setTo(0.5, 0.5);
        }

        //Keyboard Input Text
        kidPracticeHardUserInputText = game.add.text(game.world.centerX, game.height / userInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        kidPracticeHardUserInputText.anchor.setTo(0.5, 0.5);
        this.PracticeUserInputImage = game.add.sprite(game.world.centerX, game.height / userInputImageHeightMultipler, 'decimalinput');
        this.PracticeUserInputImage.anchor.setTo(0.5, 0.5);
        this.PracticeUserInputImage.scale.setTo(userInputImageScaler, userInputImageScaler);

        Key1 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow1HeightMultipler, 'keypad', kidPracticeHardKeyPad1, this);
        Key1.anchor.setTo(0.5, 0.5);
        Key1.scale.setTo(buttonWidth, buttonHeight);
        this.Key1Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow1HeightMultipler, '1', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key1Text.anchor.setTo(0.5, 0.5);

        Key2 = game.add.button(game.world.centerX, game.height / NumPadRow1HeightMultipler, 'keypad', kidPracticeHardKeyPad2, this);
        Key2.anchor.setTo(0.5, 0.5);
        Key2.scale.setTo(buttonWidth, buttonHeight);
        this.Key2Text = game.add.text(game.world.centerX, game.height / NumPadRow1HeightMultipler, '2', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key2Text.anchor.setTo(0.5, 0.5);

        Key3 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow1HeightMultipler, 'keypad', kidPracticeHardKeyPad3, this);
        Key3.anchor.setTo(0.5, 0.5);
        Key3.scale.setTo(buttonWidth, buttonHeight);
        this.Key3Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow1HeightMultipler, '3', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key3Text.anchor.setTo(0.5, 0.5);

        Key4 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow2HeightMultipler, 'keypad', kidPracticeHardKeyPad4, this);
        Key4.anchor.setTo(0.5, 0.5);
        Key4.scale.setTo(buttonWidth, buttonHeight);
        this.Key4Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow2HeightMultipler, '4', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key4Text.anchor.setTo(0.5, 0.5);

        Key5 = game.add.button(game.world.centerX, game.height / NumPadRow2HeightMultipler, 'keypad', kidPracticeHardKeyPad5, this);
        Key5.anchor.setTo(0.5, 0.5);
        Key5.scale.setTo(buttonWidth, buttonHeight);
        this.Key5Text = game.add.text(game.world.centerX, game.height / NumPadRow2HeightMultipler, '5', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key5Text.anchor.setTo(0.5, 0.5);

        Key6 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow2HeightMultipler, 'keypad', kidPracticeHardKeyPad6, this);
        Key6.anchor.setTo(0.5, 0.5);
        Key6.scale.setTo(buttonWidth, buttonHeight);
        this.Key6Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow2HeightMultipler, '6', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key6Text.anchor.setTo(0.5, 0.5);

        Key7 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow3HeightMultipler, 'keypad', kidPracticeHardKeyPad7, this);
        Key7.anchor.setTo(0.5, 0.5);
        Key7.scale.setTo(buttonWidth, buttonHeight);
        this.Key7Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow3HeightMultipler, '7', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key7Text.anchor.setTo(0.5, 0.5);

        Key8 = game.add.button(game.world.centerX, game.height / NumPadRow3HeightMultipler, 'keypad', kidPracticeHardKeyPad8, this);
        Key8.anchor.setTo(0.5, 0.5);
        Key8.scale.setTo(buttonWidth, buttonHeight);
        this.Key8Text = game.add.text(game.world.centerX, game.height / NumPadRow3HeightMultipler, '8', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key8Text.anchor.setTo(0.5, 0.5);

        Key9 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow3HeightMultipler, 'keypad', kidPracticeHardKeyPad9, this);
        Key9.anchor.setTo(0.5, 0.5);
        Key9.scale.setTo(buttonWidth, buttonHeight);
        this.Key9Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow3HeightMultipler, '9', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key9Text.anchor.setTo(0.5, 0.5);

        Key0 = game.add.button(game.world.centerX, game.height / NumPadRow4HeightMultipler, 'keypad', kidPracticeHardKeyPad0, this);
        Key0.anchor.setTo(0.5, 0.5);
        Key0.scale.setTo(buttonWidth, buttonHeight);
        this.Key0Text = game.add.text(game.world.centerX, game.height / NumPadRow4HeightMultipler, '0', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key0Text.anchor.setTo(0.5, 0.5);

        KeyBackSpace = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow4HeightMultipler, 'keypad', kidPracticeHardKeyPadRemove, this);
        KeyBackSpace.anchor.setTo(0.5, 0.5);
        KeyBackSpace.scale.setTo(buttonWidth, buttonHeight);
        this.KeyBackSpaceText = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow4HeightMultipler, '<', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyBackSpaceText.anchor.setTo(0.5, 0.5);

        KeyEnter = game.add.button(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', kidPracticeHardKeyPadSubmit, this);
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

        //Number of Tries Text
        this.PracticeNoOfTriesImage = game.add.sprite(game.width / tiresCorrectPositionMultipler, game.height / questionTriesHeightMultipler, 'tries');
        this.PracticeNoOfTriesImage.anchor.setTo(0.5, 0.5);
        this.PracticeNoOfTriesImage.scale.setTo(triesIconScaler, triesIconScaler);
        NoOfTriesText = game.add.text(game.width / statsTextPosition, game.height / questionTriesHeightMultipler, '', { fontSize: triesCorrectFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        NoOfTriesText.anchor.setTo(0, 0.5);

        //Number of Correct Answers Text
        this.PracticeCorrectAnswerImage = game.add.sprite(game.width / tiresCorrectPositionMultipler, game.height / correctHeightMultipler, 'correctanswers');
        this.PracticeCorrectAnswerImage.anchor.setTo(0.5, 0.5);
        this.PracticeCorrectAnswerImage.scale.setTo(correctIconScaler, correctIconScaler);
        NoOfCorrectAnswersText = game.add.text(game.width / statsTextPosition, game.height / correctHeightMultipler, '', { fontSize: triesCorrectFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        NoOfCorrectAnswersText.anchor.setTo(0, 0.5);

        //Number of Wrong Answers Text
        this.PracticeWrongAnswerImage = game.add.sprite(game.width / tiresCorrectPositionMultipler, game.height / wrongHeightMultipler, 'wronganswer');
        this.PracticeWrongAnswerImage.anchor.setTo(0.5, 0.5);
        this.PracticeWrongAnswerImage.scale.setTo(correctIconScaler, correctIconScaler);
        NoOfWrongAnswersText = game.add.text(game.width / statsTextPosition, game.height / wrongHeightMultipler, '', { fontSize: triesCorrectFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        NoOfWrongAnswersText.anchor.setTo(0, 0.5);

        //Eraser Button
        this.PracticeEraserButton = game.add.button(game.width / eraserBtnPosition, game.height / eraserHeightMultipler, 'eraser', kidPracticeHardRemoveStats, this);
        this.PracticeEraserButton.anchor.setTo(0.5, 0.5);
        this.PracticeEraserButton.scale.setTo(correctIconScaler, correctIconScaler);

        kidPracticeHardGenerateRandomNumber();
        kidPracticeHardKeyboardInputDecimalsKeys();
        kidPracticeHardCurrentPlayerLocalStorage();
    },
    update: function () {
        //Input limited to 10 Digits 
        kidPracticeHardInputLimiter();
        //Save & Load Stats to Browser LocalStorage
        kidPracticeHardCurrentPlayerLocalStorage();
        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }
    }
};
//Save & Load Stats to Browser LocalStorage
function kidPracticeHardCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('kidhardtries');

    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('kidhardtries', kidPracticeHardModeNumberOfTries);
        localStorage.setItem('kidhardca', kidPracticeHardModeNumberOfCorrectAnswers);
        localStorage.setItem('kidhardwa', kidPracticeHardModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kidhardtries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kidhardca');
        NoOfWrongAnswersText.text = localStorage.getItem('kidhardwa');
    }
    else if (kidPracticeHardModeNumberOfTries >= currentTries || kidPracticeHardModeNumberOfTries <= currentTries) {
        localStorage.setItem('kidhardtries', kidPracticeHardModeNumberOfTries);
        localStorage.setItem('kidhardca', kidPracticeHardModeNumberOfCorrectAnswers);
        localStorage.setItem('kidhardwa', kidPracticeHardModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kidhardtries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kidhardca');
        NoOfWrongAnswersText.text = localStorage.getItem('kidhardwa');
    }
}
//Reset Stats to Zero
function kidPracticeHardRemoveStats() {
    kidPracticeHardModeNumberOfTries = 0;
    kidPracticeHardModeNumberOfCorrectAnswers = 0;
    kidPracticeHardModeNumberOfWrongAnswers = 0;

    localStorage.setItem('kidhardtries', kidPracticeHardModeNumberOfTries);
    localStorage.setItem('kidhardca', kidPracticeHardModeNumberOfCorrectAnswers);
    localStorage.setItem('kidhardwa', kidPracticeHardModeNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('kidhardtries');
    NoOfCorrectAnswersText.text = localStorage.getItem('kidhardca');
    NoOfWrongAnswersText.text = localStorage.getItem('kidhardwa');
}
//Mute Server Sound Only
function kidPracticeHardMuteButton() {
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
//Mapping Keyboard keys for Decimal
function kidPracticeHardKeyboardInputDecimalsKeys() {
    Key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    Key0.onDown.add(kidPracticeHardKeyPad0, this);

    Key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    Key1.onDown.add(kidPracticeHardKeyPad1, this);

    Key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    Key2.onDown.add(kidPracticeHardKeyPad2, this);

    Key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    Key3.onDown.add(kidPracticeHardKeyPad3, this);

    Key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    Key4.onDown.add(kidPracticeHardKeyPad4, this);

    Key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    Key5.onDown.add(kidPracticeHardKeyPad5, this);

    Key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    Key6.onDown.add(kidPracticeHardKeyPad6, this);

    Key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    Key7.onDown.add(kidPracticeHardKeyPad7, this);

    Key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    Key8.onDown.add(kidPracticeHardKeyPad8, this);

    Key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    Key9.onDown.add(kidPracticeHardKeyPad9, this);

    KeyBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    KeyBackSpace.onDown.add(kidPracticeHardKeyPadRemove, this);

    KeyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    KeyEnter.onDown.add(kidPracticeHardKeyPadSubmit, this);
}
//Input limited to 10 Digits 
function kidPracticeHardInputLimiter() {
    let str = kidPracticeHardUserInputText.text;
    if (str.length > 10)
        kidPracticeHardUserInputText.text = str.substr(0, str.length - 1);
}
//Close this Level and Return to Key in Decimal Level Selection Scene 
function kidPracticeHardCloseButton() {
    btnClick.play();
    kidPracticeHardresetValues();
    practiceBitText.length = 0;
    PracticeBinaryHolder.length = 0;
    game.state.start('levelselection');
}
//Decimal Key 0 for KeyPad
function kidPracticeHardKeyPad0() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 0;
}
//Decimal Key 1 for KeyPad
function kidPracticeHardKeyPad1() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 1;
}
//Decimal Key 2 for KeyPad
function kidPracticeHardKeyPad2() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 2;
}
//Decimal Key 3 for KeyPad
function kidPracticeHardKeyPad3() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 3;
}
//Decimal Key 4 for KeyPad
function kidPracticeHardKeyPad4() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 4;
}
//Decimal Key 5 for KeyPad
function kidPracticeHardKeyPad5() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 5;
}
//Decimal Key 6 for KeyPad
function kidPracticeHardKeyPad6() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 6;
}
//Decimal Key 7 for KeyPad
function kidPracticeHardKeyPad7() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 7;
}
//Decimal Key 8 for KeyPad
function kidPracticeHardKeyPad8() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 8;
}
//Decimal Key 9 for KeyPad
function kidPracticeHardKeyPad9() {
    keyPress.play();
    kidPracticeHardUserInputText.text += 9;
}
//Decimal BackSpace for KeyPad
function kidPracticeHardKeyPadRemove() {
    keyPress.play();
    let str = kidPracticeHardUserInputText.text;
    kidPracticeHardUserInputText.text = str.substr(0, str.length - 1);
}
//Decimal Enter for KeyPad
function kidPracticeHardKeyPadSubmit() {
    if (targetValue.toString() === kidPracticeHardUserInputText.text) {
        kidPracticeHardModeNumberOfTries++;
        NoOfTriesText.text = kidPracticeHardModeNumberOfTries;

        index++;
        kidPracticeHardModeNumberOfCorrectAnswers++;
        NoOfCorrectAnswersText.text = kidPracticeHardModeNumberOfCorrectAnswers;
        correct.play();
        kidPracticeHardCorrectAnswerAnimation();
        kidPracticeHardresetValues();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, kidPracticeHardGenerateRandomNumber, this);
    }
    else {
        if (kidPracticeHardUserInputText.text !== "") {
            kidPracticeHardModeNumberOfTries++;
            NoOfTriesText.text = kidPracticeHardModeNumberOfTries;

            wrong.play();
            kidPracticeHardModeNumberOfWrongAnswers++;
            NoOfWrongAnswersText.text = kidPracticeHardModeNumberOfWrongAnswers;
            kidPracticeHardWrongAnswerAnimation();
        }
    }
}
//Correct Answer Text Animation
function kidPracticeHardCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Wrong Answer Text Animation
function kidPracticeHardWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Generate Binary Number
function kidPracticeHardGenerateRandomNumber() {
    phaserJSON = game.cache.getJSON(jsonLoader);
    for (let i = 0; i <= index; i++) {
        bitLength = phaserJSON.GOCBinaryHardList[i];
        kidPracticeHardStringfy = bitLength;
    }

    targetValue = parseInt(kidPracticeHardStringfy, 2);

    //console.log("binary: " + kidPracticeHardStringfy);
    //console.log("decimal: " + targetValue);

    for (let i = 0; i < kidPracticeHardStringfy.length; i++) {
        let res = kidPracticeHardStringfy.charAt(i)
        kidPracticeHardResult = res;
        PracticeBinaryHolder[i] = game.add.text(game.world.centerX - binaryHolderPosition + i * binaryHolderIncrement, game.height / mobileBinaryHolderHeightMultipler, res, { fontSize: binaryHolderFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryHolder[i].anchor.setTo(0.5, 0.5);
    }
}
//Resetting GameObjects and JSON Data Array to index 0
function kidPracticeHardresetValues() {
    phaserJSON = game.cache.getJSON(jsonLoader);
    kidPracticeHardUserInputText.text = '';
    for (let i = 0; i < kidPracticeHardStringfy.length; i++) {
        PracticeBinaryHolder[i].text = '';
    }

    if (index >= phaserJSON.GOCBinaryHardList.length) index = 0;
}
//All Devices Config
function kidPracticeHardDeviceConfig() {
    if (game.device.android) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileBinaryHolderHeightMultipler = 3;
        binaryHolderFontSize = '70px';
        userInputTextHeightMultipler = 1.8;
        userInputImageHeightMultipler = 1.75;
        userInputImageScaler = 0.85;
        cardPositionIncrementer = 100;
        bitTextPositionMulitpler = 1.17;
        bitTextHeightMultipler = 2.55
        NumPadPosition = 183;
        NumPadRow1HeightMultipler = 1.6;
        NumPadRow2HeightMultipler = 1.44;
        NumPadRow3HeightMultipler = 1.31;
        NumPadRow4HeightMultipler = 1.2;
        submitButtonHeightMultipler = 1.05;
        buttonWidth = 1.25;
        buttonHeight = 1.4;
        submitFontSize = '50px';
        NumPadFontSize = '40px';
        UserInputFontSize = '50px';
        closeButtonScaler = 1;
        muteScaler = 0.5;
        triesIconScaler = 1;
        correctIconScaler = 1;
        questionTriesHeightMultipler = 8.5;
        correctHeightMultipler = 6;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        wrongHeightMultipler = 4.6;
        eraserHeightMultipler = 15;
        btnMutePosition = 1.5;
        ModeFontSize = '40px';
        tooglerScaler = 0.3
        eraserBtnPosition = 2;
        statsTextPosition = 5.25;
        resultFontSize = "30px"
        bitFontSize = "20px"
        binaryHolderPosition = 350
        binaryHolderIncrement = 100
    }
    if (game.device.iOS) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileBinaryHolderHeightMultipler = 3;
        binaryHolderFontSize = '65px';
        userInputTextHeightMultipler = 2.1;
        userInputImageHeightMultipler = 2;
        userInputImageScaler = 0.85;
        cardPositionIncrementer = 100;
        bitTextPositionMulitpler = 1.17;
        bitTextHeightMultipler = 2.55
        NumPadPosition = 183;
        NumPadRow1HeightMultipler = 1.76;
        NumPadRow2HeightMultipler = 1.55;
        NumPadRow3HeightMultipler = 1.38;
        NumPadRow4HeightMultipler = 1.245;
        submitButtonHeightMultipler = 1.07;
        buttonWidth = 1.25;
        buttonHeight = 1.4;
        submitFontSize = '50px';
        NumPadFontSize = '40px';
        UserInputFontSize = '50px';
        closeButtonScaler = 0.8;
        muteScaler = 0.4;
        triesIconScaler = 0.8;
        correctIconScaler = 0.8;
        questionTriesHeightMultipler = 8.5;
        correctHeightMultipler = 6;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        wrongHeightMultipler = 4.6;
        eraserHeightMultipler = 15;
        btnMutePosition = 1.5;
        ModeFontSize = '40px';
        tooglerScaler = 0.3
        eraserBtnPosition = 2;
        statsTextPosition = 5.25;
        resultFontSize = "30px"
        bitFontSize = "20px"
        binaryHolderPosition = 350
        binaryHolderIncrement = 100
    }
    else if (game.device.desktop) {
        mobileCloseButtonwidthMulitper = 1.1;
        mobileBinaryHolderHeightMultipler = 2.9;
        binaryHolderFontSize = '40px';
        userInputTextHeightMultipler = 1.75;
        userInputImageHeightMultipler = 1.7;
        userInputImageScaler = 0.49;
        cardPositionIncrementer = 60;
        bitTextPositionMulitpler = 1.08;
        bitTextHeightMultipler = 2.45
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
        UserInputFontSize = '30px';
        closeButtonScaler = 0.5;
        muteScaler = 0.25;
        triesIconScaler = 0.4;
        correctIconScaler = 0.4;
        tiresCorrectPositionMultipler = 16;
        questionTriesHeightMultipler = 7;
        correctHeightMultipler = 5;
        wrongHeightMultipler = 4;
        triesCorrectFontSize = '30px';
        eraserHeightMultipler = 15;
        btnMutePosition = 1.3;
        ModeFontSize = '30px';
        tooglerScaler = 0.3
        eraserBtnPosition = 1.7;
        statsTextPosition = 8;
        resultFontSize = "30px"
        bitFontSize = "20px"
        binaryHolderPosition = 210
        binaryHolderIncrement = 60
    }
    game.load.crossOrigin = "Anonymous";
}