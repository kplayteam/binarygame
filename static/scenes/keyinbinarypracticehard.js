demo.keyinbinarypracticehard = function () { };

let kibPracticeHardBinaryInputText;
let kibPracticeHardResult;
let kibPracticeHardStringfy;
let kibPracticeHardModeNumberOfTries = 0;
let kibPracticeHardModeNumberOfCorrectAnswers = 0;
let kibPracticeHardModeNumberOfWrongAnswers = 0;

demo.keyinbinarypracticehard.prototype = {
    preload: function () {
        //All Devices Config
        kibPracticeHardDeviceConfig();
    },
    create: function () {
        //Setting JSON Data Array to start to from index 0
        if (index > 0) index = 0;

        //Audio Reference
        btnClick = game.add.audio('btnClick');
        keyPress = game.add.audio('keypress');
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');

        //Mute Button
        btnMute = game.add.button(game.width / btnMutePosition, game.height / 15, 'sound', onClickMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        this.PracticeTitle = game.add.text(game.width / 4, game.height / 15, 'Key in binary', { fontSize: ModeFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.PracticeTitle.anchor.setTo(0.5, 0.5);

        //Close Button
        this.PracticeBtnClose = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / 15, 'close', kibPracticeHardCloseButton, this);
        this.PracticeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        this.PracticeBtnClose.anchor.setTo(0.5, 0.5);

        for (let i = 0; i < 8; i++) {
            let bitText = i === 0 ? 1 : Math.pow(2, i);
            practiceBitText[i] = game.add.text(game.width / bitTextPositionMulitpler - i * cardPositionIncrementer, game.height / BitTextHeightMultipler, bitText, { fontSize: bitFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
            practiceBitText[i].anchor.setTo(0.5, 0.5);
        }

        //Single Hidden Binary Text 
        kibPracticeHardBinaryInputText = game.add.text(game.world.centerX - 100, game.world.centerY - 100, '', { fontSize: '50px', fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        kibPracticeHardBinaryInputText.anchor.setTo(0.5, 0.5);
        kibPracticeHardBinaryInputText.alpha = 0;

        //Separated Binary Text Fields
        PracticeBinaryInputText128 = game.add.text(game.world.centerX - binaryInputPosition128, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText128.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText64 = game.add.text(game.world.centerX - binaryInputPosition64, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText64.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText32 = game.add.text(game.world.centerX - binaryInputPosition32, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText32.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText16 = game.add.text(game.world.centerX - binaryInputPosition16, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText16.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText8 = game.add.text(game.world.centerX + binaryInputPosition8, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText8.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText4 = game.add.text(game.world.centerX + binaryInputPosition4, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText4.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText2 = game.add.text(game.world.centerX + binaryInputPosition2, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText2.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText1 = game.add.text(game.world.centerX + binaryInputPosition1, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText1.anchor.setTo(0.5, 0.5);

        //NumPad Buttons
        Key1 = game.add.button(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeHardKeyPad1, this);
        Key1.anchor.setTo(0.5, 0.5);
        Key1.scale.setTo(keyScaler, keyScaler);
        this.Key1Text = game.add.text(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, '1', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key1Text.anchor.setTo(0.5, 0.5);

        Key0 = game.add.button(game.world.centerX, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeHardKeyPad0, this);
        Key0.anchor.setTo(0.5, 0.5);
        Key0.scale.setTo(keyScaler, keyScaler);
        this.Key0Text = game.add.text(game.world.centerX, game.height / NumPadRowHeightMultipler, '0', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key0Text.anchor.setTo(0.5, 0.5);

        KeyBackSpace = game.add.button(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeHardKeyPadRemove, this);
        KeyBackSpace.anchor.setTo(0.5, 0.5);
        KeyBackSpace.scale.setTo(keyScaler, keyScaler);
        this.KeyBackSpaceText = game.add.text(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, '<', { fontSize: '50px', fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyBackSpaceText.anchor.setTo(0.5, 0.5);

        //Submit Button
        KeyEnter = game.add.button(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', kibPracticeHardKeyPadSubmit, this);
        KeyEnter.anchor.setTo(0.5, 0.5);
        KeyEnter.scale.setTo(buttonWidth, buttonHeight);
        this.KeyEnterText = game.add.text(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', { fontSize: submitFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyEnterText.anchor.setTo(0.5, 0.5);

        //Correct Text
        correctText = game.add.text(game.world.centerX, game.height / 1.82, 'correct!', { fontSize: resultFontSize, fill: 'green', font: 'Pixel Digivolve' });
        correctText.anchor.setTo(0.5, 0.5);
        correctText.scale.setTo(0, 0);

        //Wrong Text
        wrongText = game.add.text(game.world.centerX, game.height / 1.82, 'wrong!', { fontSize: resultFontSize, fill: 'red', font: 'Pixel Digivolve' });
        wrongText.anchor.setTo(0.5, 0.5);
        wrongText.scale.setTo(0, 0);

        //Decimal Number Text
        targetText = game.add.text(game.world.centerX, game.height / mobileDecimalHolderHeightMultipler, targetValue, { fontSize: decimalHolderFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        targetText.anchor.setTo(0.5, 0.5);

        //Number of Tries Text
        this.PracticeNoOfTriesImage = game.add.sprite(game.width / tiresCorrectPositionMultipler, game.height / questionTriesHeightMultipler, 'tries');
        this.PracticeNoOfTriesImage.scale.setTo(triesIconScaler, triesIconScaler);
        this.PracticeNoOfTriesImage.anchor.setTo(0.5, 0.5);
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
        this.PracticeEraserButton = game.add.button(game.width / eraserBtnPosition, game.height / eraserHeightMultipler, 'eraser', kibPracticeHardRemoveStats, this);
        this.PracticeEraserButton.anchor.setTo(0.5, 0.5);
        this.PracticeEraserButton.scale.setTo(correctIconScaler, correctIconScaler);

        //Generate Random Decimal Number
        kibPracticeHardGenerateRandomNumber();

        //Mapping Keyboard keys for Binary
        kibPracticeHardKeyboardInputBinaryKeys();
    },
    update: function () {
        //Limiting according to availability of Input Boxes
        kibPracticeHardInputLimiter();

        //Updating Target Text for each generator decimal number
        kibPracticeHardUpdateDecimalTargetText();

        //Adding Binary into Input Boxes
        kibPracticeHardUpdateBinaryText();

        //Save & Load Stats to Browser LocalStorage
        kibPracticeHardCurrentPlayerLocalStorage();

        //Changing frame of Mute Button
        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }

        //Changing Blinking Cursor X-axis Position based on Devices
        if (game.device.android && kibPracticeHardBinaryInputText.text === "" || game.device.iOS && kibPracticeHardBinaryInputText.text === "")
            kibPracticeHardUserInputCursor.x = 112;
        else if (game.device.desktop && kibPracticeHardBinaryInputText.text === "")
            kibPracticeHardUserInputCursor.x = 40;
    }
};
//Save & Load Stats to Browser LocalStorage
function kibPracticeHardCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('kibhardtries');

    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('kibhardtries', kibPracticeHardModeNumberOfTries);
        localStorage.setItem('kibhardca', kibPracticeHardModeNumberOfCorrectAnswers);
        localStorage.setItem('kibhardwa', kibPracticeHardModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kibhardtries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kibhardca');
        NoOfWrongAnswersText.text = localStorage.getItem('kibhardwa');
    }
    else if (kibPracticeHardModeNumberOfTries >= currentTries || kibPracticeHardModeNumberOfTries <= currentTries) {
        localStorage.setItem('kibhardtries', kibPracticeHardModeNumberOfTries);
        localStorage.setItem('kibhardca', kibPracticeHardModeNumberOfCorrectAnswers);
        localStorage.setItem('kibhardwa', kibPracticeHardModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kibhardtries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kibhardca');
        NoOfWrongAnswersText.text = localStorage.getItem('kibhardwa');
    }
}
//Reset Stats to Zero
function kibPracticeHardRemoveStats() {
    kibPracticeHardModeNumberOfTries = 0;
    kibPracticeHardModeNumberOfCorrectAnswers = 0;
    kibPracticeHardModeNumberOfWrongAnswers = 0;

    localStorage.setItem('kibhardtries', kibPracticeHardModeNumberOfTries);
    localStorage.setItem('kibhardca', kibPracticeHardModeNumberOfCorrectAnswers);
    localStorage.setItem('kibhardwa', kibPracticeHardModeNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('kibhardtries');
    NoOfCorrectAnswersText.text = localStorage.getItem('kibhardca');
    NoOfWrongAnswersText.text = localStorage.getItem('kibhardwa');
}
//Mute Server Sound Only
function onClickMuteButton() {
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
//Updating Target Text for each generator decimal number
function kibPracticeHardUpdateDecimalTargetText() {
    targetText.text = targetValue;
}
//Mapping Keyboard keys for Binary
function kibPracticeHardKeyboardInputBinaryKeys() {
    Key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    Key0.onDown.add(kibPracticeHardKeyPad0, this);

    Key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    Key1.onDown.add(kibPracticeHardKeyPad1, this);

    KeyBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    KeyBackSpace.onDown.add(kibPracticeHardKeyPadRemove, this);

    KeyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    KeyEnter.onDown.add(kibPracticeHardKeyPadSubmit, this);
}
//Close this Level and Return to Key in Binary Level Selection Scene 
function kibPracticeHardCloseButton() {
    btnClick.play();
    practiceModeNumberOfTries = 0;
    practiceModeNumberOfCorrectAnswers = 0;
    practiceModeNumberOfWrongAnswers = 0;
    PracticeUserInputBoxes.length = 0;
    practiceBitText.length = 0;
    kibPracticeHardresetValues();
    game.state.start('levelselection');
}
//Binary Key 0 for KeyPad
function kibPracticeHardKeyPad0() {
    keyPress.play();
    kibPracticeHardBinaryInputText.text += 0;
    if (kibPracticeHardStringfy.length > kibPracticeHardBinaryInputText.text.length) {
        if (!game.device.desktop)
            kibPracticeHardUserInputCursor.x = kibPracticeHardUserInputCursor.x + 110;
        else
            kibPracticeHardUserInputCursor.x = kibPracticeHardUserInputCursor.x + 60;
    }

}
//Binary Key 1 for KeyPad
function kibPracticeHardKeyPad1() {
    keyPress.play();
    kibPracticeHardBinaryInputText.text += 1;
    if (kibPracticeHardStringfy.length > kibPracticeHardBinaryInputText.text.length) {
        if (!game.device.desktop)
            kibPracticeHardUserInputCursor.x = kibPracticeHardUserInputCursor.x + 110;
        else
            kibPracticeHardUserInputCursor.x = kibPracticeHardUserInputCursor.x + 60;
    }
}
//Limiting according to availability of Input Boxes
function kibPracticeHardInputLimiter() {
    let str = kibPracticeHardBinaryInputText.text;
    if (str.length > kibPracticeHardStringfy.length)
        kibPracticeHardBinaryInputText.text = str.substr(0, str.length - 1);
}
//Adding Binary into Input Boxes
function kibPracticeHardUpdateBinaryText() {
    let temp128 = kibPracticeHardBinaryInputText.text;
    temp128 = temp128.charAt(0);
    PracticeBinaryInputText128.text = temp128;

    let temp64 = kibPracticeHardBinaryInputText.text;
    temp64 = temp64.charAt(1);
    PracticeBinaryInputText64.text = temp64;

    let temp32 = kibPracticeHardBinaryInputText.text;
    temp32 = temp32.charAt(2);
    PracticeBinaryInputText32.text = temp32;

    let temp16 = kibPracticeHardBinaryInputText.text;
    temp16 = temp16.charAt(3);
    PracticeBinaryInputText16.text = temp16;

    let temp8 = kibPracticeHardBinaryInputText.text;
    temp8 = temp8.charAt(4);
    PracticeBinaryInputText8.text = temp8;

    let temp4 = kibPracticeHardBinaryInputText.text;
    temp4 = temp4.charAt(5);
    PracticeBinaryInputText4.text = temp4;

    let temp2 = kibPracticeHardBinaryInputText.text;
    temp2 = temp2.charAt(6);
    PracticeBinaryInputText2.text = temp2;

    let temp1 = kibPracticeHardBinaryInputText.text;
    temp1 = temp1.charAt(7);
    PracticeBinaryInputText1.text = temp1;
}
//Delete Key for KeypPad
function kibPracticeHardKeyPadRemove() {
    keyPress.play();
    let str = kibPracticeHardBinaryInputText.text;
    kibPracticeHardBinaryInputText.text = str.substr(0, str.length - 1);

    if (str.length <= 0) {
        //console.log("false");
    }
    else if (str.length <= kibPracticeHardStringfy.length - 1) {
        if (!game.device.desktop)
            kibPracticeHardUserInputCursor.x = kibPracticeHardUserInputCursor.x - 110;
        else
            kibPracticeHardUserInputCursor.x = kibPracticeHardUserInputCursor.x - 60;
    }
}
//Submit Button
function kibPracticeHardKeyPadSubmit() {
    if (kibPracticeHardStringfy.toString() === kibPracticeHardBinaryInputText.text) {
        kibPracticeHardModeNumberOfTries++;
        NoOfTriesText.text = kibPracticeHardModeNumberOfTries;

        index++;
        kibPracticeHardModeNumberOfCorrectAnswers++;
        NoOfCorrectAnswersText.text = kibPracticeHardModeNumberOfCorrectAnswers;
        correct.play();
        kibPracticeHardCorrectAnswerAnimation();
        kibPracticeHardresetValues();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, kibPracticeHardGenerateRandomNumber, this);
    }
    else {
        if (kibPracticeHardBinaryInputText.text.length === kibPracticeHardStringfy.length) {
            kibPracticeHardModeNumberOfTries++;
            NoOfTriesText.text = kibPracticeHardModeNumberOfTries;

            wrong.play();
            kibPracticeHardModeNumberOfWrongAnswers++;
            NoOfWrongAnswersText.text = kibPracticeHardModeNumberOfWrongAnswers;
            kibPracticeHardWrongAnswerAnimation();
        }
    }
}
//Correct Answer Text Animation
function kibPracticeHardCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Wrong Answer Text Animation
function kibPracticeHardWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Adding LeftPad Zero to Binary Code
function kibPracticeHardZeroPad(number, size) {
    let s = number + "";
    while (s.length < size) s = "0" + s;
    return s;
}
//Generate Decimal Number
function kibPracticeHardGenerateRandomNumber() {
    for (let i = 0; i <= index; i++) {
        targetText.text = phaserJSON.GOCHardList[i];
        targetValue = phaserJSON.GOCHardList[i];

        var bitLength = parseInt(phaserJSON.GOCHardList.length + 1, 10).toString(2);
        kibPracticeHardStringfy = kibPracticeHardZeroPad(kibPracticeHardDEC2BIN(targetValue), bitLength.length);
    }
    //console.log("binary: " + kibPracticeHardStringfy);

    kibPracticeHardUserInputCursor = game.add.text(game.world.centerX - inputCursorWidthMultipler, game.height / binaryInputTextHeightMultipler, '_', { fontSize: cursorFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
    kibPracticeHardUserInputCursor.anchor.setTo(0.5, 0.5)
    kibPracticeHardUserInputCursor.tint = 0x00390a;
    game.add.tween(kibPracticeHardUserInputCursor).to({ tint: 0x00bd23 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

    for (let i = 0; i < bitLength.length; i++) {
        kibPracticeHardResult = kibPracticeHardStringfy.charAt(i)
        PracticeUserInputBoxes[i] = game.add.sprite(game.world.centerX - inputBoxWidthMultipler + i * inputBoxIncrementer, game.height / inputBoxHeightMultipler, 'inputbox');
        PracticeUserInputBoxes[i].anchor.setTo(0.5, 0.5);
        PracticeUserInputBoxes[i].scale.setTo(inputBoxScaler, inputBoxScaler);
        //PracticeUserInputBoxes[i].tint = 0x00390a;
        //game.add.tween(PracticeUserInputBoxes[i]).to( { tint: 0x00bd23 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }
}
//Resetting GameObjects and JSON Data Array to index 0
function kibPracticeHardresetValues() {
    targetText.text = '';
    kibPracticeHardUserInputCursor.text = '';
    for (let i = 0; i < kibPracticeHardStringfy.length; i++) {
        kibPracticeHardBinaryInputText.text = '';
    }

    if (index >= phaserJSON.GOCNormalList.length) index = 0;
}
//Converting decimal Number To Binary to compare with User's Answer
function kibPracticeHardDEC2BIN(number, places) {
    // Return error if number is not a number
    if (isNaN(number)) return '#VALUE!';

    // Return error if number is not decimal, is lower than -512, or is greater than 511
    if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) return '#NUM!';

    // Ignore places and return a 10-character binary number if number is negative
    if (number < 0) {
        return '1' + _s.repeat('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
    }

    // Convert decimal number to binary
    kibPracticeHardResult = parseInt(number, 10).toString(2);

    // Return binary number using the minimum number of characters necessary if places is undefined
    if (typeof places === 'undefined') {
        return kibPracticeHardResult;
    }
    else {
        // Return error if places is nonnumeric
        if (isNaN(places)) return '#VALUE!';

        // Return error if places is negative
        if (places < 0) return '#NUM!';

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= kibPracticeHardResult.length) ? _s.repeat('0', places - kibPracticeHardResult.length) + kibPracticeHardResult : '#NUM!';
    }
}
//All Devices Config
function kibPracticeHardDeviceConfig() {
    if (game.device.android) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileDecimalHolderHeightMultipler = 2.8;
        NumPadRowHeightMultipler = 1.55;
        cardPositionIncrementer = 110;
        bitTextPositionMulitpler = 1.12;
        decimalHolderFontSize = '70px';
        submitButtonHeightMultipler = 1.3;
        inputBoxHeightMultipler = 1.87;
        buttonWidth = 1.1;
        buttonHeight = 1.2;
        submitFontSize = '50px';
        binaryInputTextHeightMultipler = 1.85;
        inputBoxScaler = 1.3;
        closeButtonScaler = 1;
        muteScaler = 0.5;
        triesIconScaler = 1;
        correctIconScaler = 1;
        questionTriesHeightMultipler = 8.5;
        correctHeightMultipler = 6;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        wrongHeightMultipler = 4.6;
        inputCursorWidthMultipler = 350;
        inputBoxWidthMultipler = 380;
        eraserHeightMultipler = 15;
        btnMutePosition = 1.5;
        resultFontSize = '35px';
        ModeFontSize = '40px';
        statsTextPosition = 5.25;
        eraserBtnPosition = 2;
        keyScaler = 1
        keyPadFontSize = "50px"
        keyPadPosition = 110
        inputBoxIncrementer = 110
        bitFontSize = "25px"
        cursorFontSize = "50px"
        BitTextHeightMultipler = 2.25
        UserInputFontSize = '50px';
        binaryInputPosition128 = 375
        binaryInputPosition64 = 265
        binaryInputPosition32 = 155
        binaryInputPosition16 = 45
        binaryInputPosition8 = 60
        binaryInputPosition4 = 170
        binaryInputPosition2 = 280
        binaryInputPosition1 = 390
    }
    else if (game.device.iOS) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileDecimalHolderHeightMultipler = 2.8;
        NumPadRowHeightMultipler = 1.5;
        cardPositionIncrementer = 110;
        bitTextPositionMulitpler = 1.12;
        decimalHolderFontSize = '70px';
        submitButtonHeightMultipler = 1.25;
        inputBoxHeightMultipler = 1.87;
        buttonWidth = 1.1;
        buttonHeight = 1.2;
        submitFontSize = '50px';
        binaryInputTextHeightMultipler = 1.85;
        inputBoxScaler = 1.3;
        closeButtonScaler = 0.8;
        muteScaler = 0.4;
        triesIconScaler = 0.8;
        correctIconScaler = 0.8;
        questionTriesHeightMultipler = 8.5;
        correctHeightMultipler = 6;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        wrongHeightMultipler = 4.6;
        inputCursorWidthMultipler = 350;
        inputBoxWidthMultipler = 380;
        eraserHeightMultipler = 15;
        btnMutePosition = 1.5;
        resultFontSize = '35px';
        ModeFontSize = '40px';
        statsTextPosition = 5.25;
        eraserBtnPosition = 2;
        keyScaler = 1
        keyPadFontSize = "50px"
        keyPadPosition = 110
        inputBoxIncrementer = 110
        bitFontSize = "25px"
        cursorFontSize = "50px"
        BitTextHeightMultipler = 2.25
        UserInputFontSize = '50px';
        binaryInputPosition128 = 375
        binaryInputPosition64 = 265
        binaryInputPosition32 = 155
        binaryInputPosition16 = 45
        binaryInputPosition8 = 60
        binaryInputPosition4 = 170
        binaryInputPosition2 = 280
        binaryInputPosition1 = 390
    }
    else if (game.device.desktop) {
        mobileCloseButtonwidthMulitper = 1.1;
        mobileDecimalHolderHeightMultipler = 4;
        cardPositionIncrementer = 60;
        bitTextPositionMulitpler = 1.1;
        decimalHolderFontSize = '50px';
        submitButtonHeightMultipler = 1.08;
        NumPadRowHeightMultipler = 1.25;
        inputBoxHeightMultipler = 1.6;
        buttonWidth = 0.7;
        buttonHeight = 0.7;
        submitFontSize = '30px';
        binaryInputTextHeightMultipler = 1.6;
        inputBoxScaler = 0.8;
        closeButtonScaler = 0.5;
        muteScaler = 0.25;
        triesIconScaler = 0.5;
        correctIconScaler = 0.5;
        tiresCorrectPositionMultipler = 16;
        questionTriesHeightMultipler = 7;
        correctHeightMultipler = 5;
        wrongHeightMultipler = 4;
        triesCorrectFontSize = '30px';
        inputCursorWidthMultipler = 350;
        inputBoxWidthMultipler = 210;
        eraserHeightMultipler = 15;
        btnMutePosition = 1.3
        resultFontSize = '30px';
        ModeFontSize = '30px';
        statsTextPosition = 8;
        eraserBtnPosition = 1.7;
        keyScaler = 0.6
        keyPadFontSize = "35px"
        keyPadPosition = 80
        inputBoxIncrementer = 60
        bitFontSize = "20px"
        cursorFontSize = "35px"
        BitTextHeightMultipler = 2
        UserInputFontSize = '30px';
        binaryInputPosition128 = 210
        binaryInputPosition64 = 150
        binaryInputPosition32 = 90
        binaryInputPosition16 = 30
        binaryInputPosition8 = 30
        binaryInputPosition4 = 90
        binaryInputPosition2 = 150
        binaryInputPosition1 = 210
    }
    game.load.crossOrigin = "Anonymous";
}