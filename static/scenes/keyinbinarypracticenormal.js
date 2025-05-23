demo.keyinbinarypracticenormal = function () { };

let kibPracticeNormalBinaryInputText;
let kibPracticeNormalResult;
let kibPracticeNormalStringfy;
let kibPracticeNormalModeNumberOfTries = 0;
let kibPracticeNormalModeNumberOfCorrectAnswers = 0;
let kibPracticeNormalModeNumberOfWrongAnswers = 0;

demo.keyinbinarypracticenormal.prototype = {

    preload: function () {
        //All Devices Config
        kibPracticeNormalDeviceConfig();
    },
    create: function () {
        //Setting JSON Data Array to start to from index 0
        if (index > 0) index = 0;

        //Audio Reference
        switchOn = game.add.audio('switchon');
        switchOff = game.add.audio('switchoff');
        btnClick = game.add.audio('btnClick');
        cardflip = game.add.audio('cardflip');
        keyPress = game.add.audio('keypress');
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');

        //Check if Binary Code should be shown or no & adjust layout accordingly
        kibPracticeNormalCheckCardStatus();

        //Mute Button
        btnMute = game.add.button(game.width / btnMutePosition, game.height / 15, 'sound', kibPracticeNormalMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        this.PracticeTitle = game.add.text(game.width / 4, game.height / 15, 'Key in binary', { fontSize: ModeFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.PracticeTitle.anchor.setTo(0.5, 0.5);

        //Close Button
        this.PracticeBtnClose = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / 15, 'close', kibPracticeNormalCloseButton, this);
        this.PracticeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        this.PracticeBtnClose.anchor.setTo(0.5, 0.5);

        //Card Toogler Button
        cardToogler = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / mobileHelperButtonHeightMultipler, 'button', kibPracticeNormalCardToogler, this);
        cardToogler.scale.setTo(tooglerScaler, tooglerScaler);
        cardToogler.anchor.setTo(0.5, 0.5);
        cardToogler.frame = 0;

        for (let i = 0; i < 5; i++) {
            binaryCard[i] = game.add.button(game.width / cardPositionMulitpler + i * cardPositionIncrementer, game.height / cardHeightMultipler, allBinaryCardDict[i], kibPracticeNormalFlipCard, this);
            binaryCard[i].scale.setTo(cardScaler, cardScaler);
            binaryCard[i].anchor.setTo(0.5, 0.5);
            binaryCard[i].frame = 0;
            binaryCard[i].visible = false;
            let bitText = i === 0 ? 1 : Math.pow(2, i);
            practiceBitText[i] = game.add.text(game.width / bitTextPositionMulitpler - i * cardPositionIncrementer, game.height / BitTextHeightMultipler, bitText, { fontSize: bitFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
            practiceBitText[i].anchor.setTo(0.5, 0.5);
            practiceBitText[i].visible = false;
        }

        //Single Hidden Binary Text 
        kibPracticeNormalBinaryInputText = game.add.text(game.world.centerX - 100, game.world.centerY - 100, '', { fontSize: '50px', fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        kibPracticeNormalBinaryInputText.anchor.setTo(0.5, 0.5);
        kibPracticeNormalBinaryInputText.alpha = 0;

        //Separated Binary Text Fields
        PracticeBinaryInputText16 = game.add.text(game.world.centerX - binaryInputText16, game.height / binaryInputTextHeightMultipler, '', { fontSize: resultFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText16.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText8 = game.add.text(game.world.centerX - binaryInputText8, game.height / binaryInputTextHeightMultipler, '', { fontSize: resultFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText8.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText4 = game.add.text(game.world.centerX - binaryInputText4, game.height / binaryInputTextHeightMultipler, '', { fontSize: resultFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText4.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText2 = game.add.text(game.world.centerX + binaryInputText2, game.height / binaryInputTextHeightMultipler, '', { fontSize: resultFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText2.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText1 = game.add.text(game.world.centerX + binaryInputText1, game.height / binaryInputTextHeightMultipler, '', { fontSize: resultFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText1.anchor.setTo(0.5, 0.5);

        //NumPad Buttons
        Key1 = game.add.button(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeNormalKeyPad1, this);
        Key1.anchor.setTo(0.5, 0.5);
        Key1.scale.setTo(keyScaler, keyScaler);
        this.Key1Text = game.add.text(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, '1', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key1Text.anchor.setTo(0.5, 0.5);

        Key0 = game.add.button(game.world.centerX, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeNormalKeyPad0, this);
        Key0.anchor.setTo(0.5, 0.5);
        Key0.scale.setTo(keyScaler, keyScaler);
        this.Key0Text = game.add.text(game.world.centerX, game.height / NumPadRowHeightMultipler, '0', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key0Text.anchor.setTo(0.5, 0.5);

        KeyBackSpace = game.add.button(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeNormalKeyPadRemove, this);
        KeyBackSpace.anchor.setTo(0.5, 0.5);
        KeyBackSpace.scale.setTo(buttonWidth, buttonHeight);
        this.KeyBackSpaceText = game.add.text(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, '<', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyBackSpaceText.anchor.setTo(0.5, 0.5);

        //Submit Button
        KeyEnter = game.add.button(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', kibPracticeNormalKeyPadSubmit, this);
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
        targetText = game.add.text(game.world.centerX, keyInBinaryDecimalheight, targetValue, { fontSize: decimalHolderFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
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
        this.PracticeEraserButton = game.add.button(game.width / eraserBtnPosition, game.height / eraserHeightMultipler, 'eraser', kibPracticeNormalRemoveStats, this);
        this.PracticeEraserButton.anchor.setTo(0.5, 0.5);
        this.PracticeEraserButton.scale.setTo(correctIconScaler, correctIconScaler);

        //With || Without Binary Card Logic 
        if (hasCard) {
            cardToogler.visible = true;
            for (let i = 0; i < binaryCard.length; i++) {
                binaryCard[i].visible = false
                practiceBitText[i].visible = false
            }
        }
        else {
            cardToogler.visible = false;
            for (let i = 0; i < binaryCard.length; i++) {
                binaryCard[i].visible = true
                practiceBitText[i].visible = true
            }
        }

        //Generate Random Decimal Number
        kibPracticeNormalGenerateRandomNumber();

        //Mapping Keyboard keys for Binary
        kibPracticeNormalKeyboardInputBinaryKeys();
    },
    update: function () {
        //Limiting according to availability of Input Boxes
        kibPracticeNormalInputLimiter();

        //Updating Target Text for each generator decimal number
        kibPracticeNormalUpdateDecimalTargetText();

        //Adding Binary into Input Boxes
        kibPracticeNormalUpdateBinaryText();

        //Save & Load Stats to Browser LocalStorage 
        kibPracticeNormalCurrentPlayerLocalStorage();

        //Changing frame of Mute Button
        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }

        //Changing Blinking Cursor X-axis Position based on Devices
        if (game.device.android && kibPracticeNormalBinaryInputText.text === "" || game.device.iOS && kibPracticeNormalBinaryInputText.text === "")
            kibPracticeNormalUserInputCursor.x = 270;
        else if (game.device.desktop && kibPracticeNormalBinaryInputText.text === "")
            kibPracticeNormalUserInputCursor.x = 85;
    }
};

//Save & Load Stats to Browser LocalStorage
function kibPracticeNormalCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('kibnormaltries');

    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('kibnormaltries', kibPracticeNormalModeNumberOfTries);
        localStorage.setItem('kibnormalca', kibPracticeNormalModeNumberOfCorrectAnswers);
        localStorage.setItem('kibnormalwa', kibPracticeNormalModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kibnormaltries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kibnormalca');
        NoOfWrongAnswersText.text = localStorage.getItem('kibnormalwa');
    }
    else if (kibPracticeNormalModeNumberOfTries >= currentTries || kibPracticeNormalModeNumberOfTries <= currentTries) {
        localStorage.setItem('kibnormaltries', kibPracticeNormalModeNumberOfTries);
        localStorage.setItem('kibnormalca', kibPracticeNormalModeNumberOfCorrectAnswers);
        localStorage.setItem('kibnormalwa', kibPracticeNormalModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kibnormaltries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kibnormalca');
        NoOfWrongAnswersText.text = localStorage.getItem('kibnormalwa');
    }
}
//Reset Stats to Zero
function kibPracticeNormalRemoveStats() {
    kibPracticeNormalModeNumberOfTries = 0;
    kibPracticeNormalModeNumberOfCorrectAnswers = 0;
    kibPracticeNormalModeNumberOfWrongAnswers = 0;

    localStorage.setItem('kibnormaltries', kibPracticeNormalModeNumberOfTries);
    localStorage.setItem('kibnormalca', kibPracticeNormalModeNumberOfCorrectAnswers);
    localStorage.setItem('kibnormalwa', kibPracticeNormalModeNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('kibnormaltries');
    NoOfCorrectAnswersText.text = localStorage.getItem('kibnormalca');
    NoOfWrongAnswersText.text = localStorage.getItem('kibnormalwa');
}
//Mute Server Sound Only
function kibPracticeNormalMuteButton() {
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
function kibPracticeNormalUpdateDecimalTargetText() {
    targetText.text = targetValue;
}
//Mapping Keyboard keys for Binary
function kibPracticeNormalKeyboardInputBinaryKeys() {
    Key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    Key0.onDown.add(kibPracticeNormalKeyPad0, this);

    Key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    Key1.onDown.add(kibPracticeNormalKeyPad1, this);

    KeyBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    KeyBackSpace.onDown.add(kibPracticeNormalKeyPadRemove, this);

    KeyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    KeyEnter.onDown.add(kibPracticeNormalKeyPadSubmit, this);
}
//Check if Binary Code should be shown or no & adjust layout accordingly
function kibPracticeNormalCheckCardStatus() {
    if (hasCard)
        keyInBinaryDecimalheight = game.height / mobileDecimalHolderHeightMultipler;
    else
        keyInBinaryDecimalheight = game.height / mobileDecimalHolderCardHeightMultipler;
}
//Close this Level and Return to Key in Binary Level Selection Scene 
function kibPracticeNormalCloseButton() {
    btnClick.play();
    kibPracticeNormalresetValues();
    binaryCard.length = 0;
    practiceBitText.length = 0;
    cardToogler.frame = 0;
    game.state.start('levelselection');
}
//Binary Key 0 for KeyPad
function kibPracticeNormalKeyPad0() {
    keyPress.play();
    kibPracticeNormalBinaryInputText.text += 0;
    if (kibPracticeNormalStringfy.length > kibPracticeNormalBinaryInputText.text.length) {
        if (!game.device.desktop)
            kibPracticeNormalUserInputCursor.x = kibPracticeNormalUserInputCursor.x + 110;
        else
            kibPracticeNormalUserInputCursor.x = kibPracticeNormalUserInputCursor.x + 85;
    }
}
//Binary Key 1 for KeyPad
function kibPracticeNormalKeyPad1() {
    keyPress.play();
    kibPracticeNormalBinaryInputText.text += 1;
    if (kibPracticeNormalStringfy.length > kibPracticeNormalBinaryInputText.text.length) {
        if (!game.device.desktop)
            kibPracticeNormalUserInputCursor.x = kibPracticeNormalUserInputCursor.x + 110;
        else
            kibPracticeNormalUserInputCursor.x = kibPracticeNormalUserInputCursor.x + 85;
    }
}
//Limiting according to availability of Input Boxes
function kibPracticeNormalInputLimiter() {
    let str = kibPracticeNormalBinaryInputText.text;
    if (str.length > kibPracticeNormalStringfy.length)
        kibPracticeNormalBinaryInputText.text = str.substr(0, str.length - 1);
}
//Adding Binary into Input Boxes
function kibPracticeNormalUpdateBinaryText() {
    let temp16 = kibPracticeNormalBinaryInputText.text;
    temp16 = temp16.charAt(0);
    PracticeBinaryInputText16.text = temp16;

    let temp8 = kibPracticeNormalBinaryInputText.text;
    temp8 = temp8.charAt(1);
    PracticeBinaryInputText8.text = temp8;

    let temp4 = kibPracticeNormalBinaryInputText.text;
    temp4 = temp4.charAt(2);
    PracticeBinaryInputText4.text = temp4;

    let temp2 = kibPracticeNormalBinaryInputText.text;
    temp2 = temp2.charAt(3);
    PracticeBinaryInputText2.text = temp2;

    let temp1 = kibPracticeNormalBinaryInputText.text;
    temp1 = temp1.charAt(4);
    PracticeBinaryInputText1.text = temp1;
}
//Delete Key for KeypPad
function kibPracticeNormalKeyPadRemove() {
    keyPress.play();
    let str = kibPracticeNormalBinaryInputText.text;
    kibPracticeNormalBinaryInputText.text = str.substr(0, str.length - 1);

    if (str.length <= 0) {
        //console.log("false");
    }
    else if (str.length <= kibPracticeNormalStringfy.length - 1) {
        if (!game.device.desktop)
            kibPracticeNormalUserInputCursor.x = kibPracticeNormalUserInputCursor.x - 110;
        else
            kibPracticeNormalUserInputCursor.x = kibPracticeNormalUserInputCursor.x - 85;
    }
}
//Binary Card 1 Flip Animation
function kibPracticeNormalFlipCard(binaryCard) {
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
function kibPracticeNormalKeyPadSubmit() {
    if (kibPracticeNormalStringfy.toString() === kibPracticeNormalBinaryInputText.text) {
        kibPracticeNormalModeNumberOfTries++;
        NoOfTriesText.text = kibPracticeNormalModeNumberOfTries;

        index++;
        kibPracticeNormalModeNumberOfCorrectAnswers++;
        NoOfCorrectAnswersText.text = kibPracticeNormalModeNumberOfCorrectAnswers;
        correct.play();
        kibPracticeNormalCorrectAnswerAnimation();
        kibPracticeNormalresetValues();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, kibPracticeNormalGenerateRandomNumber, this);
    }
    else {
        if (kibPracticeNormalBinaryInputText.text.length === kibPracticeNormalStringfy.length) {
            kibPracticeNormalModeNumberOfTries++;
            NoOfTriesText.text = kibPracticeNormalModeNumberOfTries;

            wrong.play();
            kibPracticeNormalModeNumberOfWrongAnswers++;
            NoOfWrongAnswersText.text = kibPracticeNormalModeNumberOfWrongAnswers;
            kibPracticeNormalWrongAnswerAnimation();
        }
    }
}
//Correct Answer Text Animation
function kibPracticeNormalCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Wrong Answer Text Animation
function kibPracticeNormalWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Toogle Button For Binary Cards
function kibPracticeNormalCardToogler() {
    if (cardToogler.frame == 0) {
        if (hasCard) {
            switchOn.play();
            for (let i = 0; i < binaryCard.length; i++) {
                binaryCard[i].visible = true
                practiceBitText[i].visible = true
            }
            game.add.tween(targetText).to({ y: game.height / mobileDecimalHolderTweenHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
        }
        cardToogler.frame = 1;
    }
    else {
        if (hasCard) {
            switchOff.play();
            for (let i = 0; i < binaryCard.length; i++) {
                binaryCard[i].visible = false
                binaryCard[i].frame = 0
                practiceBitText[i].visible = false
            }
            game.add.tween(targetText).to({ y: game.height / mobileDecimalHolderHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
        }
        cardToogler.frame = 0;
    }
}
//Adding LeftPad Zero to Binary Code
function kibPracticeNormalZeroPad(number, size) {
    let s = number + "";
    while (s.length < size) s = "0" + s;
    return s;
}
//Generate Decimal Number
function kibPracticeNormalGenerateRandomNumber() {
    for (let i = 0; i <= index; i++) {
        targetText.text = phaserJSON.GOCNormalList[i];
        targetValue = phaserJSON.GOCNormalList[i];

        var bitLength = parseInt(phaserJSON.GOCNormalList.length, 10).toString(2);
        kibPracticeNormalStringfy = kibPracticeNormalZeroPad(kibPracticeNormalDEC2BIN(targetValue), bitLength.length);
    }
    //console.log("binary: " + kibPracticeNormalStringfy);

    kibPracticeNormalUserInputCursor = game.add.text(game.world.centerX - inputCursorWidthMultipler, game.height / binaryInputTextHeightMultipler, '_', { fontSize: cursorFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
    kibPracticeNormalUserInputCursor.anchor.setTo(0.5, 0.5)
    kibPracticeNormalUserInputCursor.tint = 0x00390a;
    game.add.tween(kibPracticeNormalUserInputCursor).to({ tint: 0x00bd23 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

    for (let i = 0; i < bitLength.length; i++) {
        kibPracticeNormalResult = kibPracticeNormalStringfy.charAt(i)
        PracticeUserInputBoxes[i] = game.add.sprite(game.world.centerX - inputBoxWidthMultipler + i * inputBoxIncrementer, game.height / inputBoxHeightMultipler, 'inputbox');
        PracticeUserInputBoxes[i].anchor.setTo(1, 1);
        PracticeUserInputBoxes[i].scale.setTo(inputBoxScaler, inputBoxScaler);
        //PracticeUserInputBoxes[i].tint = 0x00390a;
        //game.add.tween(PracticeUserInputBoxes[i]).to( { tint: 0x00bd23 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }

    if (hasCard) {
        cardToogler.visible = true;
    }
    else {
        cardToogler.visible = false;
        kibPracticeNormalCardToogler();
    }
}
//Resetting GameObjects and JSON Data Array to index 0 
function kibPracticeNormalresetValues() {
    targetText.text = '';
    kibPracticeNormalUserInputCursor.text = '';
    for (let i = 0; i < kibPracticeNormalStringfy.length; i++) {
        kibPracticeNormalBinaryInputText.text = '';
    }

    binaryCard.forEach(function (card) {
        card.frame = 0
    });

    if (index >= phaserJSON.GOCNormalList.length) index = 0;
}
//Converting decimal Number To Binary to compare with User's Answer
function kibPracticeNormalDEC2BIN(number, places) {
    // Return error if number is not a number
    if (isNaN(number)) return '#VALUE!';

    // Return error if number is not decimal, is lower than -512, or is greater than 511
    if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) return '#NUM!';

    // Ignore places and return a 10-character binary number if number is negative
    if (number < 0) {
        return '1' + _s.repeat('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
    }

    // Convert decimal number to binary
    kibPracticeNormalResult = parseInt(number, 10).toString(2);

    // Return binary number using the minimum number of characters necessary if places is undefined
    if (typeof places === 'undefined') {
        return kibPracticeNormalResult;
    }
    else {
        // Return error if places is nonnumeric
        if (isNaN(places)) return '#VALUE!';

        // Return error if places is negative
        if (places < 0) return '#NUM!';

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= kibPracticeNormalResult.length) ? _s.repeat('0', places - kibPracticeNormalResult.length) + kibPracticeNormalResult : '#NUM!';
    }
}
//All Devices Config
function kibPracticeNormalDeviceConfig() {
    if (game.device.android) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 4.5;
        mobileDecimalHolderCardHeightMultipler = 4;
        mobileDecimalHolderHeightMultipler = 2.8;
        mobileDecimalHolderTweenHeightMultipler = 4;
        decimalHolderFontSize = '70px';
        submitButtonHeightMultipler = 1.3;
        NumPadRowHeightMultipler = 1.55;
        cardScaler = 0.7;
        cardHeightMultipler = 2.7;
        cardPositionMulitpler = 6;
        cardPositionIncrementer = 170;
        bitTextPositionMulitpler = 1.16;
        inputBoxHeightMultipler = 1.77;
        buttonWidth = 1;
        buttonHeight = 1;
        submitFontSize = '50px';
        binaryInputTextHeightMultipler = 1.85;
        inputBoxScaler = 1.3;
        BitTextHeightMultipler = 2.15;
        closeButtonScaler = 1;
        muteScaler = 0.5
        triesIconScaler = 1;
        correctIconScaler = 1;
        questionTriesHeightMultipler = 8.5;
        correctHeightMultipler = 6;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        UserInputFontSize = '50px';
        inputBoxWidthMultipler = 180;
        wrongHeightMultipler = 4.6;
        inputCursorWidthMultipler = 220;
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
        binaryInputTextPosition = 110
        bitFontSize = "25px"
        cursorFontSize = "50px"
        tooglerScaler = 0.5
        binaryInputText16 = 215
        binaryInputText8 = 105
        binaryInputText4 = 0
        binaryInputText2 = 110
        binaryInputText1 = 220
    }
    else if (game.device.iOS) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 5;
        mobileDecimalHolderCardHeightMultipler = 5;
        mobileDecimalHolderHeightMultipler = 2.8;
        mobileDecimalHolderTweenHeightMultipler = 5;
        decimalHolderFontSize = '70px';
        submitButtonHeightMultipler = 1.2;
        NumPadRowHeightMultipler = 1.45;
        cardScaler = 0.65;
        cardHeightMultipler = 2.7;
        cardPositionMulitpler = 6;
        cardPositionIncrementer = 170;
        bitTextPositionMulitpler = 1.16;
        inputBoxHeightMultipler = 1.66;
        buttonWidth = 1;
        buttonHeight = 1;
        submitFontSize = '50px';
        binaryInputTextHeightMultipler = 1.77;
        inputBoxScaler = 1.3;
        BitTextHeightMultipler = 2.1;
        closeButtonScaler = 0.8;
        muteScaler = 0.4
        triesIconScaler = 0.8;
        correctIconScaler = 0.8;
        questionTriesHeightMultipler = 8.5;
        correctHeightMultipler = 6;
        triesCorrectFontSize = '50px';
        tiresCorrectPositionMultipler = 7.1;
        UserInputFontSize = '50px';
        inputBoxWidthMultipler = 180;
        wrongHeightMultipler = 4.6;
        inputCursorWidthMultipler = 220;
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
        binaryInputTextPosition = 110
        bitFontSize = "25px"
        cursorFontSize = "50px"
        tooglerScaler = 0.5
        binaryInputText16 = 215
        binaryInputText8 = 105
        binaryInputText4 = 0
        binaryInputText2 = 110
        binaryInputText1 = 220
    }
    else if (game.device.desktop) {
        mobileCloseButtonwidthMulitper = 1.1;
        mobileHelperButtonHeightMultipler = 4.3;
        mobileDecimalHolderCardHeightMultipler = 6.5;
        mobileDecimalHolderHeightMultipler = 4;
        mobileDecimalHolderTweenHeightMultipler = 6.5;
        decimalHolderFontSize = '50px';
        submitButtonHeightMultipler = 1.08;
        NumPadRowHeightMultipler = 1.25;
        if (window.innerHeight < 757) {
            cardScaler = 0.38
            cardHeightMultipler = 2.55;
            BitTextHeightMultipler = 1.95;
        }
        else {
            cardScaler = 0.4;
            cardHeightMultipler = 2.4;
            BitTextHeightMultipler = 1.9;
        }
        cardPositionMulitpler = 8.8;
        cardPositionIncrementer = 97;
        bitTextPositionMulitpler = 1.125;
        inputBoxHeightMultipler = 1.5;
        buttonWidth = 0.6;
        buttonHeight = 0.6;
        submitFontSize = '30px';
        binaryInputTextHeightMultipler = 1.6;
        inputBoxScaler = 1;
        closeButtonScaler = 0.5;
        muteScaler = 0.25;
        triesIconScaler = 0.5;
        correctIconScaler = 0.5;
        tiresCorrectPositionMultipler = 16;
        questionTriesHeightMultipler = 7;
        correctHeightMultipler = 5;
        wrongHeightMultipler = 4;
        triesCorrectFontSize = '30px';
        UserInputFontSize = '30px';
        inputBoxWidthMultipler = 135;
        inputCursorWidthMultipler = 220;
        eraserHeightMultipler = 15;
        btnMutePosition = 1.3
        resultFontSize = '30px';
        ModeFontSize = '30px';
        statsTextPosition = 8;
        eraserBtnPosition = 1.7;
        keyScaler = 0.6
        keyPadFontSize = "35px"
        keyPadPosition = 80
        inputBoxIncrementer = 85
        binaryInputTextPosition = 110
        bitFontSize = "20px"
        cursorFontSize = "35px"
        tooglerScaler = 0.3
        binaryInputText16 = 165
        binaryInputText8 = 80
        binaryInputText4 = -5
        binaryInputText2 = 90
        binaryInputText1 = 175
    }
    game.load.crossOrigin = "Anonymous";
}