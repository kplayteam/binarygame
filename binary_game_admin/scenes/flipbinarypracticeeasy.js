demo.flipbinarypracticeeasy = function () { };

let fbPracticeEasyModeNumberOfTries = 0;
let fbPracticeEasyModeNumberOfCorrectAnswers = 0;
let fbPracticeEasyModeNumberOfWrongAnswers = 0;
let cardDict = {
    "dotbuttons4": 4,
    "dotbuttons2": 2,
    "dotbuttons1": 1
}

demo.flipbinarypracticeeasy.prototype = {
    preload: function () {
        //All Devices Config
        fbPracticeEasyDeviceConfig();
    },
    create: function () {
        //Setting JSON Data Array to start to from index 0
        if (index > 0) index = 0;

        //Audio References
        btnClick = game.add.audio('btnclick');
        cardflip = game.add.audio('cardflip');
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');

        //Mute Button
        btnMute = game.add.button(game.width / btnMutePosition, game.height / 15, 'sound', fbPracticeEasyMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        this.PracticeTitle = game.add.text(game.width / 4, game.height / 15, 'Game of Card', { fontSize: ModeFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.PracticeTitle.anchor.setTo(0.5, 0.5)

        //Close Button
        this.PracticeBtnClose = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / 15, 'close', fbPracticeEasyCloseButton, this);
        this.PracticeBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        this.PracticeBtnClose.anchor.setTo(0.5, 0.5);

        for (let i = 0; i < 3; i++) {
            binaryCard[i] = game.add.button(game.width / cardPositionMulitpler + i * cardPositionIncrementer, game.world.centerY + 50, binaryCardDict[i], fbPracticeEasyFlipCard, this);
            binaryCard[i].scale.setTo(cardScaler, cardScaler);
            binaryCard[i].anchor.setTo(0.5, 0.5);
            binaryCard[i].frame = 0;
            binaryCard[i].name = binaryCardDict[i];
        }

        //Correct Text
        correctText = game.add.text(game.world.centerX, game.world.centerY + 240, 'correct!', { fontSize: resultFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        correctText.anchor.setTo(0.5, 0.5);
        correctText.scale.setTo(0, 0);

        //Wrong Text
        wrongText = game.add.text(game.world.centerX, game.world.centerY + 240, 'wrong!', { fontSize: resultFontSize, fill: 'red', font: 'Pixel Digivolve' });
        wrongText.anchor.setTo(0.5, 0.5);
        wrongText.scale.setTo(0, 0);

        //Submit Button
        this.PracticeBtnSubmit = game.add.button(game.world.centerX, game.world.centerY + 250, 'submit', fbPracticeEasySubmitButton, this);
        this.PracticeBtnSubmit.anchor.setTo(0.5, 0.5);
        this.PracticeBtnSubmit.scale.setTo(buttonWidth, buttonHeight);
        this.PracticeBtnSubmitText = game.add.text(game.world.centerX, game.world.centerY + 250, 'submit', { fontSize: submitFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.PracticeBtnSubmitText.anchor.setTo(0.5, 0.5);

        //Decimal Target Text
        targetText = game.add.text(game.world.centerX, game.height / targetTextHeightMultipler, '0', { fontSize: targetFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        targetText.anchor.setTo(0.5, 0.5);

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
        this.PracticeEraserButton = game.add.button(game.width / eraserBtnPosition, game.height / eraserHeightMultipler, 'eraser', fbPracticeEasyRemoveStats, this);
        this.PracticeEraserButton.anchor.setTo(0.5, 0.5);
        this.PracticeEraserButton.scale.setTo(correctIconScaler, correctIconScaler);

        //Generate Random Decimal Number
        fbPracticeEasyGenerateRandomNumber();
    },
    update: function () {
        if(game.device.desktop){
            if (game.input.activePointer.withinGame)
                game.input.enabled = true;
            else
                game.input.enabled = false;
        }

        //Changing frame of Mute Button
        if (server.isPlaying) {
            btnMute.frame = 0;
        }
        else {
            server.stop();
            btnMute.frame = 1;
        }

        //Save & Load Stats to Browser LocalStorage 
        fbPracticeEasyCurrentPlayerLocalStorage();
    }
};
//Save & Load Stats to Browser LocalStorage 
function fbPracticeEasyCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('fbeasytries');

    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('fbeasytries', fbPracticeEasyModeNumberOfTries);
        localStorage.setItem('fbeasyca', fbPracticeEasyModeNumberOfCorrectAnswers);
        localStorage.setItem('fbeasywa', fbPracticeEasyModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('fbeasytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('fbeasyca');
        NoOfWrongAnswersText.text = localStorage.getItem('fbeasywa');
    }
    else if (fbPracticeEasyModeNumberOfTries >= currentTries || fbPracticeEasyModeNumberOfTries <= currentTries) {
        localStorage.setItem('fbeasytries', fbPracticeEasyModeNumberOfTries);
        localStorage.setItem('fbeasyca', fbPracticeEasyModeNumberOfCorrectAnswers);
        localStorage.setItem('fbeasywa', fbPracticeEasyModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('fbeasytries');
        NoOfCorrectAnswersText.text = localStorage.getItem('fbeasyca');
        NoOfWrongAnswersText.text = localStorage.getItem('fbeasywa');
    }
}
//Reset Stats to Zero
function fbPracticeEasyRemoveStats() {
    fbPracticeEasyModeNumberOfTries = 0;
    fbPracticeEasyModeNumberOfCorrectAnswers = 0;
    fbPracticeEasyModeNumberOfWrongAnswers = 0;

    localStorage.setItem('fbeasytries', fbPracticeEasyModeNumberOfTries);
    localStorage.setItem('fbeasyca', fbPracticeEasyModeNumberOfCorrectAnswers);
    localStorage.setItem('fbeasywa', fbPracticeEasyModeNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('fbeasytries');
    NoOfCorrectAnswersText.text = localStorage.getItem('fbeasyca');
    NoOfWrongAnswersText.text = localStorage.getItem('fbeasywa');
}
//Mute Server Sound Only
function fbPracticeEasyMuteButton() {
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
//Close this Level and Return to Level Selection Scene 
function fbPracticeEasyCloseButton() {
    binaryCard.length = 0;
    btnClick.play();
    game.state.start('levelselection');
}
//Binary Card Flip Animation
function fbPracticeEasyFlipCard(binaryCard) {
    let tween1 = this.game.add.tween(binaryCard.scale);
    tween1.to({ x: 0 }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.onComplete.addOnce(function (sprite, tween) {
        if (binaryCard.frame == 0) {
            binaryCard.frame = 1;
            cardflip.play();
            isbinaryCardClicked = true;
            PracticeEasyPoints += cardDict[binaryCard.name];
        }
        else {
            binaryCard.frame = 0;
            cardflip.play();
            isbinaryCardClicked = false;
            PracticeEasyPoints -= cardDict[binaryCard.name];
        }
    }, this);
    let tween2 = this.game.add.tween(binaryCard.scale);
    tween2.to({ x: cardScaler }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.chain(tween2);
    tween1.start();
}
//Correct Answer Text Animation
function fbPracticeEasyCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 500);
}
//Wrong Answer Text Animation
function fbPracticeEasyWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 500);
}
//Submit Button
function fbPracticeEasySubmitButton() {
    if (targetValue === PracticeEasyPoints.toString()) {
        fbPracticeEasyModeNumberOfTries++;
        NoOfTriesText.text = fbPracticeEasyModeNumberOfTries;

        index++;
        fbPracticeEasyModeNumberOfCorrectAnswers++;
        NoOfCorrectAnswersText.text = fbPracticeEasyModeNumberOfCorrectAnswers;
        correct.play();
        fbPracticeEasyCorrectAnswerAnimation();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, fbPracticeEasyGenerateRandomNumber, this);
    }
    else {
        fbPracticeEasyModeNumberOfTries++;
        NoOfTriesText.text = fbPracticeEasyModeNumberOfTries;

        wrong.play();
        fbPracticeEasyModeNumberOfWrongAnswers++;
        NoOfWrongAnswersText.text = fbPracticeEasyModeNumberOfWrongAnswers;
        fbPracticeEasyWrongAnswerAnimation();
    }
}
//Generate Decimal Number
function fbPracticeEasyGenerateRandomNumber() {
    fbPracticeEasyresetValues();
    for (let i = 0; i <= index; i++) {
        targetText.text = phaserJSON.GOCEasyList[i];
    }
    targetValue = targetText.text;
}
//Reset Cards and JSON Data Array to index 0 
function fbPracticeEasyresetValues() {
    isbinaryCardClicked = false;
    PracticeEasyPoints = 0;
    binaryCard.forEach(function (card) {
        card.frame = 0
    });

    if (index >= phaserJSON.GOCEasyList.length) index = 0;
}
//All Devices Config
function fbPracticeEasyDeviceConfig() {
    if (game.device.android) {
        mobileCloseButtonwidthMulitper = 1.2;
        targetTextHeightMultipler = 3;
        cardScaler = 0.8;
        cardPositionMulitpler = 3.4;
        cardPositionIncrementer = 200;
        closeButtonScaler = 1;
        buttonWidth = 1.1;
        buttonHeight = 1.2;
        submitFontSize = '50px';
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
        resultFontSize = '35px';
        ModeFontSize = '40px';
        statsTextPosition = 5.25;
        targetFontSize = "70px";
        eraserBtnPosition = 2;
    }
    else if (game.device.iOS) {
        mobileCloseButtonwidthMulitper = 1.2;
        targetTextHeightMultipler = 3;
        cardScaler = 0.8;
        cardPositionMulitpler = 3.4;
        cardPositionIncrementer = 200;
        closeButtonScaler = 0.8;
        buttonWidth = 1.1;
        buttonHeight = 1.2;
        submitFontSize = '50px';
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
        resultFontSize = '35px';
        ModeFontSize = '40px';
        statsTextPosition = 5.25;
        targetFontSize = "70px";
        eraserBtnPosition = 2;
    }
    else if (game.device.desktop) {
        mobileCloseButtonwidthMulitper = 1.1;
        targetTextHeightMultipler = 3;
        cardScaler = 0.5;
        cardPositionMulitpler = 4;
        cardPositionIncrementer = 120;
        closeButtonScaler = 0.5;
        buttonWidth = 0.7;
        buttonHeight = 0.7;
        submitFontSize = '30px';
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
        targetFontSize = "50px";
        eraserBtnPosition = 1.7;
    }
    game.load.crossOrigin = "Anonymous";
}
