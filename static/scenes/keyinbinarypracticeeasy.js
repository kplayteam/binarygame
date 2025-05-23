demo.keyinbinarypracticeeasy = function () { };

let kibPracticeEasyBinaryInputText;
let kibPracticeEasyResult;
let kibPracticeEasyStringfy;
let kibPracticeEasyModeNumberOfTries = 0;
let kibPracticeEasyModeNumberOfCorrectAnswers = 0;
let kibPracticeEasyModeNumberOfWrongAnswers = 0;

demo.keyinbinarypracticeeasy.prototype = {
    preload: function () {
        //All Devices Config
        kibPracticeEasyDeviceConfig();
    },
    create: function () {
        //Setting JSON Data Array to start to from index 0
        if (index > 0) index = 0;

        //Audio References
        switchOn = game.add.audio('switchon');
        switchOff = game.add.audio('switchoff');
        btnClick = game.add.audio('btnClick');
        cardflip = game.add.audio('cardflip');
        keyPress = game.add.audio('keypress');
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');

        //Check if Binary Code should be shown or no & adjust layout accordingly
        kibPracticeEasyCheckCardStatus();

        //Mute Button
        btnMute = game.add.button(game.width / btnMutePosition, game.height / 15, 'sound', kibPracticeEasyMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        this.PracticeTitle = game.add.text(game.width / 4, game.height / 15, 'Key in binary', { fontSize: ModeFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.PracticeTitle.anchor.setTo(0.5, 0.5);

        //Close Button
        this.PracticeBtnClose = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / 15, 'close', kibPracticeEasyCloseButton, this);
        this.PracticeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        this.PracticeBtnClose.anchor.setTo(0.5, 0.5);

        //Card Toogler Button
        cardToogler = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / mobileHelperButtonHeightMultipler, 'button', kibPracticeEasyCardToogler, this);
        cardToogler.scale.setTo(tooglerScaler, tooglerScaler);
        cardToogler.anchor.setTo(0.5, 0.5);
        cardToogler.frame = 0;

        //Binary Card & Bit Text
        for (let i = 0; i < 3; i++) {
            binaryCard[i] = game.add.button(game.width / cardPositionMulitpler + i * cardPositionIncrementer, game.height / cardHeightMultipler, binaryCardDict[i], kibPracticeEasyFlipCard, this);
            binaryCard[i].scale.setTo(cardScaler, cardScaler);
            binaryCard[i].anchor.setTo(0.5, 0.5);
            binaryCard[i].frame = 0;
            binaryCard[i].visible = false;
            let bitText = i === 0 ? 1 : Math.pow(2, i)
            practiceBitText[i] = game.add.text(game.width / bitTextPositionMulitpler - i * cardPositionIncrementer, game.height / BitTextHeightMultipler, bitText, { fontSize: bitFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
            practiceBitText[i].anchor.setTo(0.5, 0.5);
            practiceBitText[i].visible = false;
        }

        //NumPad Buttons
        Key1 = game.add.button(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeEasyKeyPad1, this);
        Key1.anchor.setTo(0.5, 0.5);
        Key1.scale.setTo(keyScaler, keyScaler);
        this.Key1Text = game.add.text(game.world.centerX - keyPadPosition, game.height / NumPadRowHeightMultipler, '1', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key1Text.anchor.setTo(0.5, 0.5);

        Key0 = game.add.button(game.world.centerX, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeEasyKeyPad0, this);
        Key0.anchor.setTo(0.5, 0.5);
        Key0.scale.setTo(keyScaler, keyScaler);
        this.Key0Text = game.add.text(game.world.centerX, game.height / NumPadRowHeightMultipler, '0', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key0Text.anchor.setTo(0.5, 0.5);

        KeyBackSpace = game.add.button(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, 'binarykeypad', kibPracticeEasyKeyPadRemove, this);
        KeyBackSpace.anchor.setTo(0.5, 0.5);
        KeyBackSpace.scale.setTo(keyScaler, keyScaler);
        this.KeyBackSpaceText = game.add.text(game.world.centerX + keyPadPosition, game.height / NumPadRowHeightMultipler, '<', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyBackSpaceText.anchor.setTo(0.5, 0.5);

        //Submit Button
        KeyEnter = game.add.button(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', kibPracticeEasyKeyPadSubmit, this);
        KeyEnter.anchor.setTo(0.5, 0.5);
        KeyEnter.scale.setTo(buttonWidth, buttonHeight);
        this.KeyEnterText = game.add.text(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', { fontSize: submitFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyEnterText.anchor.setTo(0.5, 0.5);

        //Single Hidden Binary Text 
        kibPracticeEasyBinaryInputText = game.add.text(game.world.centerX - 100, game.world.centerY - 100, '', { fontSize: '50px', fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        kibPracticeEasyBinaryInputText.anchor.setTo(0.5, 0.5);
        kibPracticeEasyBinaryInputText.alpha = 0;

        //Separated Binary Text Fields
        PracticeBinaryInputText4 = game.add.text(game.world.centerX - binaryInputTextPosition, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText4.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText2 = game.add.text(game.world.centerX, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText2.anchor.setTo(0.5, 0.5);

        PracticeBinaryInputText1 = game.add.text(game.world.centerX + binaryInputTextPosition, game.height / binaryInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryInputText1.anchor.setTo(0.5, 0.5);

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
        this.PracticeEraserButton = game.add.button(game.width / eraserBtnPosition, game.height / eraserHeightMultipler, 'eraser', kibPracticeEasyRemoveStats, this);
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
        kibPracticeEasyGenerateRandomNumber();
        //Mapping Keyboard keys for Binary
        kibPracticeEasyKeyboardInputBinaryKeys();
    },
    update: function () {
        //Limiting according to availability of Input Boxes
        kibPracticeEasyInputLimiter();

        //Updating Target Text for each generator decimal number
        kibPracticeEasyUpdateDecimalTargetText();

        //Adding Binary into Input Boxes
        kibPracticeEasyUpdateBinaryText();

        //Save & Load Stats to Browser LocalStorage 
        kibPracticeEasyCurrentPlayerLocalStorage();

        //Changing frame of Mute Button
        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }

        //Changing Blinking Cursor X-axis Position based on Devices
        if (game.device.android && kibPracticeEasyBinaryInputText.text === "" || game.device.iOS && kibPracticeEasyBinaryInputText.text === "")
            kibPracticeEasyUserInputCursor.x = 380;
        else if (game.device.desktop && kibPracticeEasyBinaryInputText.text === "")
            kibPracticeEasyUserInputCursor.x = 140;
    }
};
//Save & Load Stats to Browser LocalStorage
function kibPracticeEasyCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('kibeasytries');

    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('kibeasytries', kibPracticeEasyModeNumberOfTries);
        localStorage.setItem('kibeasyca', kibPracticeEasyModeNumberOfCorrectAnswers);
        localStorage.setItem('kibeasywa', kibPracticeEasyModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kibeasytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kibeasyca');
        NoOfWrongAnswersText.text = localStorage.getItem('kibeasywa');
    }
    else if (kibPracticeEasyModeNumberOfTries >= currentTries || kibPracticeEasyModeNumberOfTries <= currentTries) {
        localStorage.setItem('kibeasytries', kibPracticeEasyModeNumberOfTries);
        localStorage.setItem('kibeasyca', kibPracticeEasyModeNumberOfCorrectAnswers);
        localStorage.setItem('kibeasywa', kibPracticeEasyModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kibeasytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kibeasyca');
        NoOfWrongAnswersText.text = localStorage.getItem('kibeasywa');
    }
}
//Reset Stats to Zero
function kibPracticeEasyRemoveStats() {
    kibPracticeEasyModeNumberOfTries = 0;
    kibPracticeEasyModeNumberOfCorrectAnswers = 0;
    kibPracticeEasyModeNumberOfWrongAnswers = 0;

    localStorage.setItem('kibeasytries', kibPracticeEasyModeNumberOfTries);
    localStorage.setItem('kibeasyca', kibPracticeEasyModeNumberOfCorrectAnswers);
    localStorage.setItem('kibeasywa', kibPracticeEasyModeNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('kibeasytries');
    NoOfCorrectAnswersText.text = localStorage.getItem('kibeasyca');
    NoOfWrongAnswersText.text = localStorage.getItem('kibeasywa');
}
//Mute Server Sound Only
function kibPracticeEasyMuteButton() {
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
function kibPracticeEasyUpdateDecimalTargetText() {
    targetText.text = targetValue;
}
//Mapping Keyboard keys for Binary
function kibPracticeEasyKeyboardInputBinaryKeys() {
    Key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    Key0.onDown.add(kibPracticeEasyKeyPad0, this);

    Key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    Key1.onDown.add(kibPracticeEasyKeyPad1, this);

    KeyBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    KeyBackSpace.onDown.add(kibPracticeEasyKeyPadRemove, this);

    KeyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    KeyEnter.onDown.add(kibPracticeEasyKeyPadSubmit, this);
}
//Check if Binary Card should be shown or no & adjust layout accordingly
function kibPracticeEasyCheckCardStatus() {
    if (hasCard)
        keyInBinaryDecimalheight = game.height / mobileDecimalHolderHeightMultipler;
    else
        keyInBinaryDecimalheight = game.height / mobileDecimalHolderCardHeightMultipler;
}
//Close this Level and Return to Key in Binary Level Selection Scene 
function kibPracticeEasyCloseButton() {
    btnClick.play();
    kibPracticeEasyresetValues();
    binaryCard.length = 0;
    practiceBitText.length = 0;
    PracticeUserInputBoxes.length = 0;
    cardToogler.frame = 0;
    game.state.start('levelselection');
}
//Binary Key 0 for KeyPad
function kibPracticeEasyKeyPad0() {
    keyPress.play();
    kibPracticeEasyBinaryInputText.text += 0;
    if (kibPracticeEasyStringfy.length > kibPracticeEasyBinaryInputText.text.length)
        kibPracticeEasyUserInputCursor.x = kibPracticeEasyUserInputCursor.x + 110;
}
//Binary Key 1 for KeyPad
function kibPracticeEasyKeyPad1() {
    keyPress.play();
    kibPracticeEasyBinaryInputText.text += 1;
    if (kibPracticeEasyStringfy.length > kibPracticeEasyBinaryInputText.text.length)
        kibPracticeEasyUserInputCursor.x = kibPracticeEasyUserInputCursor.x + 110;
}
//Delete Key for KeypPad
function kibPracticeEasyKeyPadRemove() {
    keyPress.play();
    let str = kibPracticeEasyBinaryInputText.text;
    kibPracticeEasyBinaryInputText.text = str.substr(0, str.length - 1);

    if (str.length <= 0) {
        //console.log("false");
    }
    else if (str.length <= kibPracticeEasyStringfy.length - 1) {
        kibPracticeEasyUserInputCursor.x = kibPracticeEasyUserInputCursor.x - 110;
    }
}
//Limiting according to availability of Input Boxes
function kibPracticeEasyInputLimiter() {
    let str = kibPracticeEasyBinaryInputText.text;
    if (str.length > kibPracticeEasyStringfy.length)
        kibPracticeEasyBinaryInputText.text = str.substr(0, str.length - 1);
}
//Adding Binary into Input Boxes
function kibPracticeEasyUpdateBinaryText() {
    let temp4 = kibPracticeEasyBinaryInputText.text;
    temp4 = temp4.charAt(0);
    PracticeBinaryInputText4.text = temp4;

    let temp2 = kibPracticeEasyBinaryInputText.text;
    temp2 = temp2.charAt(1);
    PracticeBinaryInputText2.text = temp2;

    let temp1 = kibPracticeEasyBinaryInputText.text;
    temp1 = temp1.charAt(2);
    PracticeBinaryInputText1.text = temp1;
}
//Binary Card 1 Flip Animation
function kibPracticeEasyFlipCard(binaryCard) {
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
function kibPracticeEasyKeyPadSubmit() {
    if (kibPracticeEasyStringfy.toString() === kibPracticeEasyBinaryInputText.text) {
        kibPracticeEasyModeNumberOfTries++;
        NoOfTriesText.text = kibPracticeEasyModeNumberOfTries;

        index++;
        kibPracticeEasyModeNumberOfCorrectAnswers++;
        NoOfCorrectAnswersText.text = kibPracticeEasyModeNumberOfCorrectAnswers;
        correct.play();
        kibPracticeEasyCorrectAnswerAnimation();
        kibPracticeEasyresetValues();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, kibPracticeEasyGenerateRandomNumber, this);
    }
    else {
        if (kibPracticeEasyBinaryInputText.text.length === kibPracticeEasyStringfy.length) {
            kibPracticeEasyModeNumberOfTries++;
            NoOfTriesText.text = kibPracticeEasyModeNumberOfTries;

            wrong.play();
            kibPracticeEasyModeNumberOfWrongAnswers++;
            NoOfWrongAnswersText.text = kibPracticeEasyModeNumberOfWrongAnswers;
            kibPracticeEasyWrongAnswerAnimation();
        }
    }
}
//Correct Answer Text Animation
function kibPracticeEasyCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Wrong Answer Text Animation
function kibPracticeEasyWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Toogle Button For Binary Cards
function kibPracticeEasyCardToogler() {
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
function kibPracticeEasyZeroPad(number, size) {
    let s = number + "";
    while (s.length < size) s = "0" + s;
    return s;
}
//Generate Decimal Number
function kibPracticeEasyGenerateRandomNumber() {
    phaserJSON = game.cache.getJSON(jsonLoader);
    for (let i = 0; i <= index; i++) {
        targetText.text = phaserJSON.GOCEasyList[i];
        targetValue = phaserJSON.GOCEasyList[i];

        var bitLength = parseInt(phaserJSON.GOCEasyList.length, 10).toString(2);
        kibPracticeEasyStringfy = kibPracticeEasyZeroPad(kibPracticeEasyDEC2BIN(targetValue), bitLength.length);
    }
    //console.log("binary: " + kibPracticeEasyStringfy);

    kibPracticeEasyUserInputCursor = game.add.text(game.world.centerX - inputCursorWidthMultipler, game.height / binaryInputTextHeightMultipler, '_', { fontSize: cursorFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
    kibPracticeEasyUserInputCursor.anchor.setTo(0.5, 0.5)
    kibPracticeEasyUserInputCursor.tint = 0x00390a;
    game.add.tween(kibPracticeEasyUserInputCursor).to({ tint: 0x00bd23 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
    //console.log(kibPracticeEasyUserInputCursor.x);
    for (let i = 0; i < bitLength.length; i++) {
        kibPracticeEasyResult = kibPracticeEasyStringfy.charAt(i)
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
        kibPracticeEasyCardToogler();
    }
}
//Resetting GameObjects and JSON Data Array to index 0 
function kibPracticeEasyresetValues() {
    targetText.text = '';
    kibPracticeEasyUserInputCursor.text = '';
    for (let i = 0; i < kibPracticeEasyStringfy.length; i++) {
        kibPracticeEasyBinaryInputText.text = '';
    }

    binaryCard.forEach(function (card) {
        card.frame = 0
    });

    if (index >= phaserJSON.GOCEasyList.length) index = 0;
}
//Converting decimal Number To Binary to compare with User's Answer
function kibPracticeEasyDEC2BIN(number, places) {
    // Return error if number is not a number
    if (isNaN(number)) return '#VALUE!';

    // Return error if number is not decimal, is lower than -512, or is greater than 511
    if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) return '#NUM!';

    // Ignore places and return a 10-character binary number if number is negative
    if (number < 0) {
        return '1' + _s.repeat('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
    }

    // Convert decimal number to binary
    kibPracticeEasyResult = parseInt(number, 10).toString(2);

    // Return binary number using the minimum number of characters necessary if places is undefined
    if (typeof places === 'undefined') {
        return kibPracticeEasyResult;
    }
    else {
        // Return error if places is nonnumeric
        if (isNaN(places)) return '#VALUE!';

        // Return error if places is negative
        if (places < 0) return '#NUM!';

        // Truncate places in case it is not an integer
        places = Math.floor(places);

        // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
        return (places >= kibPracticeEasyResult.length) ? _s.repeat('0', places - kibPracticeEasyResult.length) + kibPracticeEasyResult : '#NUM!';
    }
}
//All Devices Config
function kibPracticeEasyDeviceConfig() {
    if (game.device.android) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 4.5;
        mobileDecimalHolderCardHeightMultipler = 4;
        mobileDecimalHolderHeightMultipler = 2.8;
        mobileDecimalHolderTweenHeightMultipler = 4;
        cardScaler = 0.7;
        cardHeightMultipler = 2.7;
        cardPositionMulitpler = 3;
        cardPositionIncrementer = 170;
        bitTextPositionMulitpler = 1.46;
        keyPositionIncrementer = 110;
        decimalHolderFontSize = '70px';
        submitButtonHeightMultipler = 1.3;
        NumPadRowHeightMultipler = 1.55;
        buttonWidth = 1.1;
        buttonHeight = 1.2;
        submitFontSize = '50px';
        binaryInputTextHeightMultipler = 1.85;
        BitTextHeightMultipler = 2.15;
        inputBoxScaler = 1.3;
        inputBoxHeightMultipler = 1.77;
        inputBoxWidthMultipler = 70;
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
        inputCursorWidthMultipler = 110;
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
    }
    else if (game.device.iOS) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 4.5;
        mobileDecimalHolderCardHeightMultipler = 5;
        mobileDecimalHolderHeightMultipler = 2.8;
        mobileDecimalHolderTweenHeightMultipler = 5;
        cardScaler = 0.7;
        cardHeightMultipler = 2.9;
        cardPositionMulitpler = 3;
        cardPositionIncrementer = 170;
        bitTextPositionMulitpler = 1.46;
        decimalHolderFontSize = '70px';
        submitButtonHeightMultipler = 1.2;
        NumPadRowHeightMultipler = 1.45;
        buttonWidth = 1.1;
        buttonHeight = 1.2;
        submitFontSize = '50px';
        binaryInputTextHeightMultipler = 1.77;
        BitTextHeightMultipler = 2.15;
        inputBoxScaler = 1.3;
        inputBoxHeightMultipler = 1.66;
        inputBoxWidthMultipler = 70;
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
        inputCursorWidthMultipler = 110;
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
    }
    else if (game.device.desktop) {
        mobileCloseButtonwidthMulitper = 1.1;
        mobileHelperButtonHeightMultipler = 4.3;
        mobileDecimalHolderCardHeightMultipler = 6.5;
        mobileDecimalHolderHeightMultipler = 4;
        mobileDecimalHolderTweenHeightMultipler = 6.5;
        window.innerHeight < 757 ? cardScaler = 0.45 : cardScaler = 0.5;
        cardHeightMultipler = 2.4;
        cardPositionMulitpler = 4;
        cardPositionIncrementer = 120;
        bitTextPositionMulitpler = 1.35;
        decimalHolderFontSize = '50px';
        submitButtonHeightMultipler = 1.08;
        NumPadRowHeightMultipler = 1.25;
        inputBoxHeightMultipler = 1.4;
        buttonWidth = 0.7;
        buttonHeight = 0.7;
        submitFontSize = '30px';
        binaryInputTextHeightMultipler = 1.47;
        inputBoxScaler = 1;
        BitTextHeightMultipler = 1.8;
        inputBoxWidthMultipler = 80;
        inputCursorWidthMultipler = 110;
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
        btnMutePosition = 1.3
        resultFontSize = '30px';
        ModeFontSize = '30px';
        statsTextPosition = 8;
        eraserBtnPosition = 1.7;
        keyScaler = 0.6
        keyPadFontSize = "35px"
        keyPadPosition = 80
        inputBoxIncrementer = 110
        binaryInputTextPosition = 110
        bitFontSize = "20px"
        cursorFontSize = "35px"
        tooglerScaler = 0.3
    }
    game.load.crossOrigin = "Anonymous";
}