demo.flipbinarypracticenormal = function () { };

let fbPracticeNormalModeNumberOfTries = 0;
let fbPracticeNormalModeNumberOfCorrectAnswers = 0;
let fbPracticeNormalModeNumberOfWrongAnswers = 0;
let allCardDict = {
    "dotbuttons16": 16,
    "dotbuttons8": 8,
    "dotbuttons4": 4,
    "dotbuttons2": 2,
    "dotbuttons1": 1
}

demo.flipbinarypracticenormal.prototype = {
    preload: function () {
        //All Devices Config
        fbPracticeNormalDeviceConfig();
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
        btnMute = game.add.button(game.width / btnMutePosition, game.height / 15, 'sound', onClickMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Round Title
        this.fbPracticeNormalTitle = game.add.text(game.width / 4, game.height / 15, 'Game of Card', { fontSize: ModeFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.fbPracticeNormalTitle.anchor.setTo(0.5, 0.5);

        //Close Button
        this.fbPracticeNormalBtnClose = game.add.button(game.width / mobileCloseButtonwidthMulitper, game.height / 15, 'close', fbPracticeNormalOnClickCloseButton, this);
        this.fbPracticeNormalBtnClose.scale.setTo(closeButtonScaler, closeButtonScaler);
        this.fbPracticeNormalBtnClose.anchor.setTo(0.5, 0.5);

        for (let i = 0; i < 5; i++) {
            binaryCard[i] = game.add.button(game.width / cardPositionMulitpler + i * cardPositionIncrementer, game.world.centerY + 50, allBinaryCardDict[i], fbPracticeNormalFlipCard, this);
            binaryCard[i].scale.setTo(cardScaler, cardScaler);
            binaryCard[i].anchor.setTo(0.5, 0.5);
            binaryCard[i].frame = 0;
            binaryCard[i].name = allBinaryCardDict[i];
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
        this.fbPracticeNormalBtnSubmit = game.add.button(game.world.centerX, game.world.centerY + 250, 'submit', fbPracticeNormalOnClickSubmitButton, this);
        this.fbPracticeNormalBtnSubmit.anchor.setTo(0.5, 0.5);
        this.fbPracticeNormalBtnSubmit.scale.setTo(buttonWidth, buttonHeight);
        this.fbPracticeNormalBtnSubmitText = game.add.text(game.world.centerX, game.world.centerY + 250, 'submit', { fontSize: submitFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.fbPracticeNormalBtnSubmitText.anchor.setTo(0.5, 0.5);

        //Decimal Target Text
        targetText = game.add.text(game.world.centerX, game.height / TargetTextHeightMultipler, '0', { fontSize: targetFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
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
        this.PracticeEraserButton = game.add.button(game.width / eraserBtnPosition, game.height / eraserHeightMultipler, 'eraser', fbPracticeNormalRemoveStats, this);
        this.PracticeEraserButton.anchor.setTo(0.5, 0.5);
        this.PracticeEraserButton.scale.setTo(correctIconScaler, correctIconScaler);

        //Generate Random Decimal Number
        fbPracticeNormalGenerateRandomNumber();
    },
    update: function () {
        if(game.device.desktop){
            if (game.input.activePointer.withinGame)
                game.input.enabled = true;
            else
                game.input.enabled = false;
        }

        //Changing frame of Mute Button
        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }

        //Save & Load Stats to Browser LocalStorage 
        fbPracticeNormalCurrentPlayerLocalStorage();
    }
};
//Save & Load Stats to Browser LocalStorage 
function fbPracticeNormalCurrentPlayerLocalStorage() {
    let currentTries = localStorage.getItem('fbnormaltries');
    if (currentTries === null || currentTries === undefined) {
        localStorage.setItem('fbnormaltries', fbPracticeNormalModeNumberOfTries);
        localStorage.setItem('fbnormalca', fbPracticeNormalModeNumberOfCorrectAnswers);
        localStorage.setItem('fbnormalwa', fbPracticeNormalModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('fbnormaltries');
        NoOfCorrectAnswersText.text = localStorage.getItem('fbnormalca');
        NoOfWrongAnswersText.text = localStorage.getItem('fbnormalwa');
    }
    else if (fbPracticeNormalModeNumberOfTries >= currentTries || fbPracticeNormalModeNumberOfTries <= currentTries) {
        localStorage.setItem('fbnormaltries', fbPracticeNormalModeNumberOfTries);
        localStorage.setItem('fbnormalca', fbPracticeNormalModeNumberOfCorrectAnswers);
        localStorage.setItem('fbnormalwa', fbPracticeNormalModeNumberOfWrongAnswers);

        NoOfTriesText.text = localStorage.getItem('fbnormaltries');
        NoOfCorrectAnswersText.text = localStorage.getItem('fbnormalca');
        NoOfWrongAnswersText.text = localStorage.getItem('fbnormalwa');
    }
}
//Reset Stats to Zero
function fbPracticeNormalRemoveStats() {
    fbPracticeNormalModeNumberOfTries = 0;
    fbPracticeNormalModeNumberOfCorrectAnswers = 0;
    fbPracticeNormalModeNumberOfWrongAnswers = 0;

    localStorage.setItem('fbnormaltries', fbPracticeNormalModeNumberOfTries);
    localStorage.setItem('fbnormalca', fbPracticeNormalModeNumberOfCorrectAnswers);
    localStorage.setItem('fbnormalwa', fbPracticeNormalModeNumberOfWrongAnswers);

    NoOfTriesText.text = localStorage.getItem('fbnormaltries');
    NoOfCorrectAnswersText.text = localStorage.getItem('fbnormalca');
    NoOfWrongAnswersText.text = localStorage.getItem('fbnormalwa');
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
//Close this Level and Return to Level Selection Scene 
function fbPracticeNormalOnClickCloseButton() {
    binaryCard.length = 0;
    btnClick.play();
    game.state.start('levelselection');
}
//Binary Card Flip Animation
function fbPracticeNormalFlipCard(binaryCard) {
    let tween1 = this.game.add.tween(binaryCard.scale);
    tween1.to({ x: 0 }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.onComplete.addOnce(function (sprite, tween) {
        if (binaryCard.frame == 0) {
            binaryCard.frame = 1;
            cardflip.play();
            isbinaryCardClicked = true;
            fbPracticeNormalPoints += allCardDict[binaryCard.name];
        }
        else {
            binaryCard.frame = 0;
            cardflip.play();
            isbinaryCardClicked = false;
            fbPracticeNormalPoints -= allCardDict[binaryCard.name];
        }
        console.log(binaryCard.name)
    }, this);
    let tween2 = this.game.add.tween(binaryCard.scale);
    tween2.to({ x: cardScaler }, 100, Phaser.Easing.Linear.None, false, 0);
    tween1.chain(tween2);
    tween1.start();
}
//Correct Answer Text Animation
function fbPracticeNormalCorrectAnswerAnimation() {
    game.add.tween(correctText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(correctText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 500);
}
//Wrong Answer Text Animation
function fbPracticeNormalWrongAnswerAnimation() {
    game.add.tween(wrongText.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Linear.None, true);
    game.add.tween(wrongText.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, true, 500);
}
//Submit Button
function fbPracticeNormalOnClickSubmitButton() {
    if (targetValue === fbPracticeNormalPoints.toString()) {
        fbPracticeNormalModeNumberOfTries++;
        NoOfTriesText.text = fbPracticeNormalModeNumberOfTries;

        index++;
        fbPracticeNormalModeNumberOfCorrectAnswers++;
        NoOfCorrectAnswersText.text = fbPracticeNormalModeNumberOfCorrectAnswers;
        correct.play();
        fbPracticeNormalCorrectAnswerAnimation();
        game.time.events.add(Phaser.Timer.SECOND * 0.5, fbPracticeNormalGenerateRandomNumber, this);
    }
    else {
        fbPracticeNormalModeNumberOfTries++;
        NoOfTriesText.text = fbPracticeNormalModeNumberOfTries;

        wrong.play();
        fbPracticeNormalModeNumberOfWrongAnswers++;
        NoOfWrongAnswersText.text = fbPracticeNormalModeNumberOfWrongAnswers;
        fbPracticeNormalWrongAnswerAnimation();
    }
}
//Generate Decimal Number
function fbPracticeNormalGenerateRandomNumber() {
    fbPracticeNormalresetValues();
    for (let i = 0; i <= index; i++) {
        targetText.text = phaserJSON.GOCNormalList[i];
    }
    targetValue = targetText.text;
}
//Reset Cards and JSON Data Array to index 0 
function fbPracticeNormalresetValues() {
    isFbPracticeNormalBtnClicked = false;
    fbPracticeNormalPoints = 0;
    binaryCard.forEach(function (card) {
        card.frame = 0
    });

    if (index >= phaserJSON.GOCNormalList.length) index = 0;
}
//All Devices Config
function fbPracticeNormalDeviceConfig() {
    if (game.device.android) {
        mobileCloseButtonwidthMulitper = 1.2;
        TargetTextHeightMultipler = 3;
        cardScaler = 0.7;
        cardPositionMulitpler = 6;
        cardPositionIncrementer = 170;
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
        TargetTextHeightMultipler = 3;
        cardScaler = 0.65;
        cardPositionMulitpler = 6;
        cardPositionIncrementer = 170;
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
        TargetTextHeightMultipler = 3;
        cardScaler = 0.4;
        cardPositionMulitpler = 8.8;
        cardPositionIncrementer = 97;
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
        eraserHeightMultipler = 15;
        triesCorrectFontSize = '30px';
        btnMutePosition = 1.3
        resultFontSize = '30px';
        ModeFontSize = '30px';
        statsTextPosition = 8;
        targetFontSize = "50px";
        eraserBtnPosition = 1.7;
    }
}
