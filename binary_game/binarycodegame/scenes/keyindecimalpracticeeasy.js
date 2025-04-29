demo.keyindecimalpracticeeasy = function () { };

let kidPracticeEasyUserInputText;
let kidPracticeEasyResult;
let kidPracticeEasyStringfy;
var bitLength;
let kidPracticeEasyModeNumberOfTries = 0;
let kidPracticeEasyModeNumberOfCorrectAnswers = 0;
let kidPracticeEasyModeNumberOfWrongAnswers = 0;

demo.keyindecimalpracticeeasy.prototype = {
    preload: function () {
        //All Devices Config
        kidPracticeEasyDeviceConfig();
    },
    create: function () {
        if (index > 0) index = 0;

        switchOn = game.add.audio('switchon');
        switchOff = game.add.audio('switchoff');
        btnClick = game.add.audio('btnClick');
        cardflip = game.add.audio('cardflip');
        keyPress = game.add.audio('keypress');
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');

        kidPracticeEasyCheckCardStatus();

        btnMute = game.add.button(game.width / btnMutePosition, game.height / 15, 'sound', kidPracticeEasyMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        this.PracticeTitle = game.add.text(game.width / 4, game.height / 15, 'Key in number', { fontSize: ModeFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.PracticeTitle.anchor.setTo(0.5, 0.5);

        //Close Button
        this.PracticeBtnClose = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / 15, 'close', kidPracticeEasyCloseButton, this);
        this.PracticeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        this.PracticeBtnClose.anchor.setTo(0.5, 0.5);

        //Card Toogler Button
        cardToogler = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / mobileHelperButtonHeightMultipler, 'button', kidPracticeEasyCardToogler, this);
        cardToogler.scale.setTo(tooglerScaler, tooglerScaler);
        cardToogler.anchor.setTo(0.5, 0.5);
        cardToogler.frame = 0;

        for (let i = 0; i < 3; i++) {
            binaryCard[i] = game.add.button(game.width / cardPositionMulitpler + i * cardPositionIncrementer, game.height / cardHeightMultipler, binaryCardDict[i], kidPracticeEasyFlipCard, this);
            binaryCard[i].scale.setTo(cardScaler, cardScaler);
            binaryCard[i].anchor.setTo(0.5, 0.5);
            binaryCard[i].frame = 0;
            binaryCard[i].visible = false;
            let bitText = i === 0 ? 1 : Math.pow(2, i)
            practiceBitText[i] = game.add.text(game.width / bitTextPositionMulitpler - i * cardPositionIncrementer, game.height / BitTextHeightMultipler, bitText, { fontSize: bitFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
            practiceBitText[i].anchor.setTo(0.5, 0.5);
            practiceBitText[i].visible = false;
        }

        //Keyboard Input Text
        kidPracticeEasyUserInputText = game.add.text(game.world.centerX, game.height / userInputTextHeightMultipler, '', { fontSize: UserInputFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        kidPracticeEasyUserInputText.anchor.setTo(0.5, 0.5);
        this.PracticeUserInputImage = game.add.sprite(game.world.centerX, game.height / userInputImageHeightMultipler, 'decimalinput');
        this.PracticeUserInputImage.anchor.setTo(0.5, 0.5);
        this.PracticeUserInputImage.scale.setTo(userInputImageScaler, userInputImageScaler);

        //NumPads
        Key1 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow1HeightMultipler, 'keypad', kidPracticeEasyKeyPad1, this);
        Key1.anchor.setTo(0.5, 0.5);
        Key1.scale.setTo(buttonWidth, buttonHeight);
        this.Key1Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow1HeightMultipler, '1', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key1Text.anchor.setTo(0.5, 0.5);

        Key2 = game.add.button(game.world.centerX, game.height / NumPadRow1HeightMultipler, 'keypad', kidPracticeEasyKeyPad2, this);
        Key2.anchor.setTo(0.5, 0.5);
        Key2.scale.setTo(buttonWidth, buttonHeight);
        this.Key2Text = game.add.text(game.world.centerX, game.height / NumPadRow1HeightMultipler, '2', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key2Text.anchor.setTo(0.5, 0.5);

        Key3 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow1HeightMultipler, 'keypad', kidPracticeEasyKeyPad3, this);
        Key3.anchor.setTo(0.5, 0.5);
        Key3.scale.setTo(buttonWidth, buttonHeight);
        this.Key3Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow1HeightMultipler, '3', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key3Text.anchor.setTo(0.5, 0.5);

        Key4 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow2HeightMultipler, 'keypad', kidPracticeEasyKeyPad4, this);
        Key4.anchor.setTo(0.5, 0.5);
        Key4.scale.setTo(buttonWidth, buttonHeight);
        this.Key4Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow2HeightMultipler, '4', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key4Text.anchor.setTo(0.5, 0.5);

        Key5 = game.add.button(game.world.centerX, game.height / NumPadRow2HeightMultipler, 'keypad', kidPracticeEasyKeyPad5, this);
        Key5.anchor.setTo(0.5, 0.5);
        Key5.scale.setTo(buttonWidth, buttonHeight);
        this.Key5Text = game.add.text(game.world.centerX, game.height / NumPadRow2HeightMultipler, '5', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key5Text.anchor.setTo(0.5, 0.5);

        Key6 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow2HeightMultipler, 'keypad', kidPracticeEasyKeyPad6, this);
        Key6.anchor.setTo(0.5, 0.5);
        Key6.scale.setTo(buttonWidth, buttonHeight);
        this.Key6Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow2HeightMultipler, '6', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key6Text.anchor.setTo(0.5, 0.5);

        Key7 = game.add.button(game.world.centerX - NumPadPosition, game.height / NumPadRow3HeightMultipler, 'keypad', kidPracticeEasyKeyPad7, this);
        Key7.anchor.setTo(0.5, 0.5);
        Key7.scale.setTo(buttonWidth, buttonHeight);
        this.Key7Text = game.add.text(game.world.centerX - NumPadPosition, game.height / NumPadRow3HeightMultipler, '7', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key7Text.anchor.setTo(0.5, 0.5);

        Key8 = game.add.button(game.world.centerX, game.height / NumPadRow3HeightMultipler, 'keypad', kidPracticeEasyKeyPad8, this);
        Key8.anchor.setTo(0.5, 0.5);
        Key8.scale.setTo(buttonWidth, buttonHeight);
        this.Key8Text = game.add.text(game.world.centerX, game.height / NumPadRow3HeightMultipler, '8', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key8Text.anchor.setTo(0.5, 0.5);

        Key9 = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow3HeightMultipler, 'keypad', kidPracticeEasyKeyPad9, this);
        Key9.anchor.setTo(0.5, 0.5);
        Key9.scale.setTo(buttonWidth, buttonHeight);
        this.Key9Text = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow3HeightMultipler, '9', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key9Text.anchor.setTo(0.5, 0.5);

        Key0 = game.add.button(game.world.centerX, game.height / NumPadRow4HeightMultipler, 'keypad', kidPracticeEasyKeyPad0, this);
        Key0.anchor.setTo(0.5, 0.5);
        Key0.scale.setTo(buttonWidth, buttonHeight);
        this.Key0Text = game.add.text(game.world.centerX, game.height / NumPadRow4HeightMultipler, '0', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.Key0Text.anchor.setTo(0.5, 0.5);

        KeyBackSpace = game.add.button(game.world.centerX + NumPadPosition, game.height / NumPadRow4HeightMultipler, 'keypad', kidPracticeEasyKeyPadRemove, this);
        KeyBackSpace.anchor.setTo(0.5, 0.5);
        KeyBackSpace.scale.setTo(buttonWidth, buttonHeight);
        this.KeyBackSpaceText = game.add.text(game.world.centerX + NumPadPosition, game.height / NumPadRow4HeightMultipler, '<', { fontSize: NumPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.KeyBackSpaceText.anchor.setTo(0.5, 0.5);

        KeyEnter = game.add.button(game.world.centerX, game.height / submitButtonHeightMultipler, 'submit', kidPracticeEasyKeyPadSubmit, this);
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
        this.PracticeEraserButton = game.add.button(game.width / eraserBtnPosition, game.height / eraserHeightMultipler, 'eraser', kidPracticeEasyRemoveStats, this);
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
        //Generate Random Binary Number
        kidPracticeEasyGenerateRandomNumber();
        //Mapping Keyboard keys for Decimal
        kidPracticeEasyKeyboardInputDecimalsKeys();
    },
    update: function () {
        //Input limited to 10 Digits 
        kidPracticeEasyInputLimiter();
        //Save & Load Stats to Browser LocalStorage
        kidPracticeEasyCurrentPlayerLocalStorage();
        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }
    }
};
//Save & Load Stats to Browser LocalStorage
function kidPracticeEasyCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('kideasytries');

    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('kideasytries', kidPracticeEasyModeNumberOfTries);
        localStorage.setItem('kideasyca', kidPracticeEasyModeNumberOfCorrectAnswers);
        localStorage.setItem('kideasywa', kidPracticeEasyModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kideasytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kideasyca');
        NoOfWrongAnswersText.text = localStorage.getItem('kideasywa');
    }
    else if (kidPracticeEasyModeNumberOfTries >= currentTries || kidPracticeEasyModeNumberOfTries <= currentTries) {
        localStorage.setItem('kideasytries', kidPracticeEasyModeNumberOfTries);
        localStorage.setItem('kideasyca', kidPracticeEasyModeNumberOfCorrectAnswers);
        localStorage.setItem('kideasywa', kidPracticeEasyModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('kideasytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('kideasyca');
        NoOfWrongAnswersText.text = localStorage.getItem('kideasywa');
    }
}
//Reset Stats to Zero
function kidPracticeEasyRemoveStats() {
    kidPracticeEasyModeNumberOfTries = 0;
    kidPracticeEasyModeNumberOfCorrectAnswers = 0;
    kidPracticeEasyModeNumberOfWrongAnswers = 0;

    localStorage.setItem('kideasytries', kidPracticeEasyModeNumberOfTries);
    localStorage.setItem('kideasyca', kidPracticeEasyModeNumberOfCorrectAnswers);
    localStorage.setItem('kideasywa', kidPracticeEasyModeNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('kideasytries');
    NoOfCorrectAnswersText.text = localStorage.getItem('kideasyca');
    NoOfWrongAnswersText.text = localStorage.getItem('kideasywa');
}
//Mute Server Sound Only
function kidPracticeEasyMuteButton() {
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
function kidPracticeEasyKeyboardInputDecimalsKeys() {
    Key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    Key0.onDown.add(kidPracticeEasyKeyPad0, this);

    Key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    Key1.onDown.add(kidPracticeEasyKeyPad1, this);

    Key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    Key2.onDown.add(kidPracticeEasyKeyPad2, this);

    Key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    Key3.onDown.add(kidPracticeEasyKeyPad3, this);

    Key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    Key4.onDown.add(kidPracticeEasyKeyPad4, this);

    Key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    Key5.onDown.add(kidPracticeEasyKeyPad5, this);

    Key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    Key6.onDown.add(kidPracticeEasyKeyPad6, this);

    Key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    Key7.onDown.add(kidPracticeEasyKeyPad7, this);

    Key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    Key8.onDown.add(kidPracticeEasyKeyPad8, this);

    Key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    Key9.onDown.add(kidPracticeEasyKeyPad9, this);

    KeyBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    KeyBackSpace.onDown.add(kidPracticeEasyKeyPadRemove, this);

    KeyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    KeyEnter.onDown.add(kidPracticeEasyKeyPadSubmit, this);
}
//Input limited to 10 Digits 
function kidPracticeEasyInputLimiter() {
    let str = kidPracticeEasyUserInputText.text;
    if (str.length > 10)
        kidPracticeEasyUserInputText.text = str.substr(0, str.length - 1);
}
//Close this Level and Return to Key in Decimal Level Selection Scene 
function kidPracticeEasyCloseButton() {
    btnClick.play();
    kidPracticeEasyresetValues();
    binaryCard.length = 0;
    practiceBitText.length = 0;
    PracticeBinaryHolder.length = 0;
    cardToogler.frame = 0;
    game.state.start('levelselection');
}
//Decimal Key 0 for KeyPad
function kidPracticeEasyKeyPad0() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 0;
}
//Decimal Key 1 for KeyPad
function kidPracticeEasyKeyPad1() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 1;
}
//Decimal Key 2 for KeyPad
function kidPracticeEasyKeyPad2() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 2;
}
//Decimal Key 3 for KeyPad
function kidPracticeEasyKeyPad3() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 3;
}
//Decimal Key 4 for KeyPad
function kidPracticeEasyKeyPad4() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 4;
}
//Decimal Key 5 for KeyPad
function kidPracticeEasyKeyPad5() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 5;
}
//Decimal Key 6 for KeyPad
function kidPracticeEasyKeyPad6() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 6;
}
//Decimal Key 7 for KeyPad
function kidPracticeEasyKeyPad7() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 7;
}
//Decimal Key 8 for KeyPad
function kidPracticeEasyKeyPad8() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 8;
}
//Decimal Key 9 for KeyPad
function kidPracticeEasyKeyPad9() {
    keyPress.play();
    kidPracticeEasyUserInputText.text += 9;
}
//Decimal Enter for KeyPad
function kidPracticeEasyKeyPadSubmit() {
    if (targetValue.toString() === kidPracticeEasyUserInputText.text) {
        kidPracticeEasyModeNumberOfTries++;
        NoOfTriesText.text = kidPracticeEasyModeNumberOfTries;

        index++;
        kidPracticeEasyModeNumberOfCorrectAnswers++;
        NoOfCorrectAnswersText.text = kidPracticeEasyModeNumberOfCorrectAnswers;
        correct.play();
        kidPracticeEasyCorrectAnswerAnimation();
        kidPracticeEasyresetValues();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, kidPracticeEasyGenerateRandomNumber, this);
    }
    else {
        if (kidPracticeEasyUserInputText.text !== "") {
            kidPracticeEasyModeNumberOfTries++;
            NoOfTriesText.text = kidPracticeEasyModeNumberOfTries;

            wrong.play();
            kidPracticeEasyModeNumberOfWrongAnswers++;
            NoOfWrongAnswersText.text = kidPracticeEasyModeNumberOfWrongAnswers;
            kidPracticeEasyWrongAnswerAnimation();
        }
    }
}
//Decimal BackSpace for KeyPad
function kidPracticeEasyKeyPadRemove() {
    keyPress.play();
    let str = kidPracticeEasyUserInputText.text;
    kidPracticeEasyUserInputText.text = str.substr(0, str.length - 1);
}
//Binary Card Flip Animation
function kidPracticeEasyFlipCard(binaryCard) {
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
//Correct Answer Text Animation
function kidPracticeEasyCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Wrong Answer Text Animation
function kidPracticeEasyWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 800);
}
//Check if Binary Card should be shown or no & adjust layout accordingly
function kidPracticeEasyCheckCardStatus() {
    if (hasCard)
        keyInDecimalBinaryheight = game.height / mobileBinaryHolderHeightMultipler;
    else
        keyInDecimalBinaryheight = game.height / mobileBinaryHolderCardHeightMultipler;
}
//Toogle Button For Binary Cards
function kidPracticeEasyCardToogler() {
    if (cardToogler.frame == 0) {
        if (hasCard) {
            switchOn.play();
            for (let i = 0; i < binaryCard.length; i++) {
                binaryCard[i].visible = true
                practiceBitText[i].visible = true
                game.add.tween(PracticeBinaryHolder[i]).to({ y: game.height / mobileBinaryHolderTweenHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
            }
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
                game.add.tween(PracticeBinaryHolder[i]).to({ y: game.height / mobileBinaryHolderHeightMultipler }, 500, Phaser.Easing.Bounce.Out, true);
            }
        }
        cardToogler.frame = 0;
    }
}
//Generate Binary Number
function kidPracticeEasyGenerateRandomNumber() {
    phaserJSON = game.cache.getJSON(jsonLoader);
    for (let i = 0; i <= index; i++) {
        bitLength = phaserJSON.GOCBinaryEasyList[i];
        kidPracticeEasyStringfy = bitLength;
    }

    targetValue = parseInt(kidPracticeEasyStringfy, 2);

    //console.log("binary: " + kidPracticeEasyStringfy);
    //console.log("decimal: " + targetValue);

    for (let i = 0; i < bitLength.length; i++) {
        let res = kidPracticeEasyStringfy.toString().charAt(i);
        kidPracticeEasyResult = res;
        PracticeBinaryHolder[i] = game.add.text(game.world.centerX - binaryHolderPosition + i * binaryHolderPosition, keyInDecimalBinaryheight, res, { fontSize: binaryHolderFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        PracticeBinaryHolder[i].anchor.setTo(0.5, 0.5);
    }

    if (hasCard) {
        cardToogler.visible = true;
    }
    else {
        cardToogler.visible = false;
        kidPracticeEasyCardToogler();
    }
}
//Resetting GameObjects and JSON Data Array to index 0 
function kidPracticeEasyresetValues() {
    kidPracticeEasyUserInputText.text = '';
    for (let i = 0; i < bitLength.length; i++) {
        PracticeBinaryHolder[i].text = '';
        binaryCard[i].frame = 0

        if (hasCard) {
            binaryCard[i].visible = false
            practiceBitText[i].visible = false
        }
        else {
            binaryCard[i].visible = true
            practiceBitText[i].visible = true
        }
        cardToogler.frame = 0;
    }

    if (index >= phaserJSON.GOCBinaryEasyList.length) index = 0;
}
//All Devices Config
function kidPracticeEasyDeviceConfig() {
    if (game.device.android) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 4.5;
        mobileBinaryHolderCardHeightMultipler = 3.5;
        mobileBinaryHolderHeightMultipler = 3;
        mobileBinaryHolderTweenHeightMultipler = 3.5;
        cardScaler = 0.7;
        cardHeightMultipler = 2.5;
        cardPositionMulitpler = 3.1;
        cardPositionIncrementer = 170;
        bitTextPositionMulitpler = 1.50;
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
        BitTextHeightMultipler = 2;
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
        tooglerScaler = 0.5
        eraserBtnPosition = 2;
        statsTextPosition = 5.25;
        resultFontSize = "35px"
        bitFontSize = "25px"
        binaryHolderPosition = 100
    }
    else if (game.device.iOS) {
        mobileCloseButtonwidthMulitper = 1.2;
        mobileHelperButtonHeightMultipler = 4.5;
        mobileBinaryHolderCardHeightMultipler = 3.5;
        mobileBinaryHolderHeightMultipler = 3;
        mobileBinaryHolderTweenHeightMultipler = 3.5;
        cardScaler = 0.65;
        cardHeightMultipler = 2.5;
        cardPositionMulitpler = 3.1;
        cardPositionIncrementer = 170;
        bitTextPositionMulitpler = 1.46;
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
        BitTextHeightMultipler = 1.97;
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
        tooglerScaler = 0.5
        eraserBtnPosition = 2;
        statsTextPosition = 5.25;
        resultFontSize = "35px"
        bitFontSize = "25px"
        binaryHolderPosition = 100
    }
    else if (game.device.desktop) {
        mobileCloseButtonwidthMulitper = 1.1;
        mobileHelperButtonHeightMultipler = 4.3;
        mobileBinaryHolderCardHeightMultipler = 6.5;
        mobileBinaryHolderHeightMultipler = 4.5;
        mobileBinaryHolderTweenHeightMultipler = 6.5;
        cardScaler = 0.45;
        cardHeightMultipler = 2.6;
        cardPositionMulitpler = 4;
        cardPositionIncrementer = 110;
        bitTextPositionMulitpler = 1.46;
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
        BitTextHeightMultipler = 2;
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
        binaryHolderPosition = 60
    }
    game.load.crossOrigin = "Anonymous";
}
//Adding LeftPad Zero to Binary Code
// function kidPracticeEasyZeroPad(number, size) 
// {
//     let s = number + "";
//     while (s.length < size) s = "0" + s;
//     return s;
// }
// Convert decimal number to binary
//kidPracticeEasyResult = parseInt(number, 10).toString(2);