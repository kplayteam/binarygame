demo.levelselection = function () { };

demo.levelselection.prototype = {
    preload: function () {
        //All Devices Config
        LevelSelectionDeviceConfig();
    },
    create: function () {
        //Audio Reference
        this.btnClick = game.add.audio('btnclick');

        //Easy Level Button
        this.BtnEasy = game.add.button(game.world.centerX, game.world.centerY - modeButtonHeight, 'submit', onClickLevelSelectionEasyButton, this);
        this.BtnEasy.scale.setTo(typeButtonWidth, typeButtonHeight);
        this.BtnEasy.anchor.setTo(0.5, 0.5);
        this.BtnEasyText = game.add.text(game.world.centerX, game.world.centerY - modeButtonHeight, 'easy', { fontSize: typeButtonFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.BtnEasyText.anchor.setTo(0.5, 0.5);

        //Normal Level Button
        this.BtnNormal = game.add.button(game.world.centerX, game.world.centerY, 'submit', onClickLevelSelectionNormalButton, this);
        this.BtnNormal.scale.setTo(typeButtonWidth, typeButtonHeight);
        this.BtnNormal.anchor.setTo(0.5, 0.5);
        this.BtnNormalText = game.add.text(game.world.centerX, game.world.centerY, 'normal', { fontSize: typeButtonFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.BtnNormalText.anchor.setTo(0.5, 0.5);

        if (!isGameOfCard) {
            //Hard Level Button
            this.BtnHard = game.add.button(game.world.centerX, game.world.centerY + modeButtonHeight, 'submit', onClickLevelSelectionHardButton, this);
            this.BtnHard.scale.setTo(typeButtonWidth, typeButtonHeight);
            this.BtnHard.anchor.setTo(0.5, 0.5);
            this.BtnHardText = game.add.text(game.world.centerX, game.world.centerY + modeButtonHeight, 'hard', { fontSize: typeButtonFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
            this.BtnHardText.anchor.setTo(0.5, 0.5);
        }

        //Back Button
        this.BtnBackButton = game.add.button(game.world.centerX, game.world.centerY + backButtonHeight, 'back', onClickLevelSelectionBackButton, this);
        this.BtnBackButton.scale.setTo(typeButtonWidth, typeButtonHeight);
        this.BtnBackButton.anchor.setTo(0.5, 0.5);
        this.BtnBackButtonText = game.add.text(game.world.centerX, game.world.centerY + backButtonHeight, 'back', { fontSize: typeButtonFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
        this.BtnBackButtonText.anchor.setTo(0.5, 0.5);
    },
    update: function () {
        if(game.device.desktop){
            if (game.input.activePointer.withinGame)
                game.input.enabled = true;
            else
                game.input.enabled = false;
        }
    }
};

//Go to Practice Key in Binary Easy Scene
function onClickLevelSelectionEasyButton() {
    btnClick.play();
    if (isGameOfCard)
        game.state.start('flipbinarypracticeeasy');
    else if (isNumberToCardToBinary || isKeyInBinary)
        game.state.start('keyinbinarypracticeeasy');
    else if (isBinaryToCardToNumber || isKeyInDecimal)
        game.state.start('keyindecimalpracticeeasy');
}
//Go to Practice Key in Binary Normal Scene
function onClickLevelSelectionNormalButton() {
    btnClick.play();
    if (isGameOfCard)
        game.state.start('flipbinarypracticenormal');
    else if (isNumberToCardToBinary || isKeyInBinary)
        game.state.start('keyinbinarypracticenormal');
    else if (isBinaryToCardToNumber || isKeyInDecimal)
        game.state.start('keyindecimalpracticenormal');
}
//Go to Practice Key in Binary Hard Scene
function onClickLevelSelectionHardButton() {
    btnClick.play();
    if (isNumberToCardToBinary || isKeyInBinary)
        game.state.start('keyinbinarypracticehard');
    else if (isBinaryToCardToNumber || isKeyInDecimal)
        game.state.start('keyindecimalpracticehard');
}
//Go Back to Type Selection Scene
function onClickLevelSelectionBackButton() {
    btnClick.play();
    game.state.start('typeselection');
}
//All Devices Config
function LevelSelectionDeviceConfig() {
    if (game.device.android) {
        typeButtonWidth = 1.5;
        typeButtonHeight = 1.5;
        typeButtonFontSize = '50px';
        modeButtonHeight = 160;
        backButtonHeight = 350;
    }
    else if (game.device.iOS) {
        typeButtonWidth = 1.3;
        typeButtonHeight = 1.3;
        typeButtonFontSize = '50px';
        modeButtonHeight = 160;
        backButtonHeight = 350;
    }
    else if (game.device.desktop) {
        typeButtonWidth = 0.7;
        typeButtonHeight = 0.7;
        typeButtonFontSize = '25px';
        modeButtonHeight = 100;
        backButtonHeight = 250;
    }
}
