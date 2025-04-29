demo.typeselection = function () { };

let hasCard = true
let isGameOfCard = false;
let isNumberToCardToBinary = false;
let isBinaryToCardToNumber = false;
let isKeyInBinary = false;
let isKeyInDecimal = false;
let typeSelectionDict = {
    "0": "game of card",
    "1": "number > card > binary",
    "2": "binary > card > number",
    "3": "key in binary",
    "4": "key in number",
    "5": "back"
}

demo.typeselection.prototype = {
    preload: function () {
        //All Devices Config
        typeSelectionDeviceConfig();
    },
    create: function () {
        btnClick = game.add.audio('btnclick');

        var titleTextValue = "KIDOCODE";

        this.spellOutTitleTextColored(game.width / 2, game.height / 15, 10, titleTextValue, titleFontSize, 1, '#33AF4A', 'Pixel Digivolve');

        this.modeText = game.add.text(game.width / 2, game.height / 6.5, "Training Mode", { fontSize: modeTextFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.modeText.anchor.setTo(0.5, 0.5);

        //Type Selection Buttons
        for (let i = 0; i < 6; i++) {
            buttonType = game.add.button(game.width / 2, game.height / 3.5 + i * buttonTypeHeightIncrement, typeSelectionDict[i] === "back" ? 'back' : 'submit', onClickButtonType, this);
            buttonType.scale.setTo(typeButtonWidth, typeButtonHeight);
            buttonType.anchor.setTo(0.5, 0.5);
            buttonType.name = i;
            buttonTypeText = game.add.text(game.width / 2, game.height / 3.5 + i * buttonTypeHeightIncrement, typeSelectionDict[i], { fontSize: TypeButtonFontSize, fill: typeSelectionDict[i] === "back" ? '#ffffff' : '#00D928', font: 'Pixel Digivolve' });
            buttonTypeText.anchor.setTo(0.5, 0.5);
        }
    },
    spellOutTitleTextColored: function (x, y, width, text, fontSize, speed, fill, font) {
        var sentence = game.add.text(x, y, '', { fontSize: fontSize + 'px', fill: fill, font: font });
        sentence.anchor.setTo(0.5, 0.5);
        sentence.addColor('#EE3E34', 4);
        sentence.addColor('#F9CC14', 5);
        sentence.addColor('#01A3DE', 6);
        sentence.addColor('#F16621', 7);
        sentence.addColor('#00D928', 8);
        var currentLine = game.add.text(game.world.centerX, game.world.centerY - 450, '', { fontSize: fontSize + 'px', font: font });
        currentLine.alpha = 0;
        var loop = game.time.events.loop(speed, addCharColored);

        var index = 0;

        function addCharColored() {
            sentence.text += text[index];
            currentLine.text += text[index];

            if (currentLine.width > width && text[index] == ' ') {
                sentence.text += '\n';
                currentLine.text = '';
            }
            if (index >= text.length - 1) {
                game.time.events.remove(loop);
            }
            index++;
        }
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

function onClickButtonType(buttonType) {
    if (typeSelectionDict[buttonType.name] === "game of card")
        onClickGameOfCardButton()
    else if (typeSelectionDict[buttonType.name] === "number > card > binary")
        onClickToNumberToCardToBinaryButton()
    else if (typeSelectionDict[buttonType.name] === "binary > card > number")
        onClickToBinaryToCardToNumberButton()
    else if (typeSelectionDict[buttonType.name] === "key in binary")
        onClickToKeyInBinaryButton()
    else if (typeSelectionDict[buttonType.name] === "key in number")
        onClickToKeyInDecimalButton()
    else if (typeSelectionDict[buttonType.name] === "back")
        onClickBackButtonToModeSelection()
}

//Go to Game of Card Level Selection Scene
function onClickGameOfCardButton() {
    isGameOfCard = true
    btnClick.play()
    if (isGameOfCard) {
        isBinaryToCardToNumber = false
        isKeyInDecimal = false
        isNumberToCardToBinary = false
        isKeyInBinary = false
        game.state.start('levelselection')
    }
}
//Go to Number to Card to Binary Level Selection Scene
function onClickToNumberToCardToBinaryButton() {
    isNumberToCardToBinary = true
    hasCard = false
    btnClick.play()
    if (isNumberToCardToBinary) {
        isGameOfCard = false
        isKeyInDecimal = false;
        isBinaryToCardToNumber = false
        isKeyInBinary = false
        game.state.start('levelselection')
    }
}
//Go to Binary to Card to Number Level Selection Scene
function onClickToBinaryToCardToNumberButton() {
    isBinaryToCardToNumber = true
    hasCard = false
    btnClick.play()
    if (isBinaryToCardToNumber) {
        isGameOfCard = false
        isKeyInDecimal = false
        isNumberToCardToBinary = false
        isKeyInBinary = false;
        game.state.start('levelselection')
    }
}
//Go to Key in Decimal Level Selection Scene
function onClickToKeyInDecimalButton() {
    hasCard = true
    isKeyInDecimal = true
    btnClick.play()
    if (isKeyInDecimal) {
        isGameOfCard = false
        isBinaryToCardToNumber = false
        isNumberToCardToBinary = false
        isKeyInBinary = false
        game.state.start('levelselection')
    }
}
//Go to Key in Binary Level Selection Scene
function onClickToKeyInBinaryButton() {
    hasCard = true
    isKeyInBinary = true
    btnClick.play()
    if (isKeyInBinary) {
        isGameOfCard = false
        isBinaryToCardToNumber = false
        isNumberToCardToBinary = false
        isKeyInDecimal = false
        game.state.start('levelselection')
    }
}
//Go Back To Mode Selection Scene
function onClickBackButtonToModeSelection() {
    btnClick.play()
    game.state.start('modeselection')
}
//All Devices Config
function typeSelectionDeviceConfig() {
    if (game.device.android) {
        TypeButtonFontSize = '45px';
        trainingModeTitleMultipler = 5;
        numberToCardToBinaryMultipler = 2.55;
        binaryToCardToNumberMultipler = 2;
        keyInBinaryMultipler = 1.65;
        keyInNumberMultipler = 1.4;
        backButtonMultipler = 1.19;
        modeTextFontSize = '60px';
        titleFontSize = 100;
        typeButtonWidth = 1.5;
        typeButtonHeight = 1.5;
        buttonTypeHeightIncrement = 180;
    }
    else if (game.device.iOS) {
        TypeButtonFontSize = '40px';
        trainingModeTitleMultipler = 5;
        numberToCardToBinaryMultipler = 2.5;
        binaryToCardToNumberMultipler = 1.95;
        keyInBinaryMultipler = 1.6;
        keyInNumberMultipler = 1.35;
        backButtonMultipler = 1.10;
        modeTextFontSize = '60px';
        titleFontSize = 100;
        typeButtonWidth = 1.3;
        typeButtonHeight = 1.3;
        buttonTypeHeightIncrement = 180;
    }
    else if (game.device.desktop) {
        TypeButtonFontSize = '25px';
        trainingModeTitleMultipler = 5;
        numberToCardToBinaryMultipler = 2.4;
        binaryToCardToNumberMultipler = 1.83;
        keyInBinaryMultipler = 1.48;
        keyInNumberMultipler = 1.24;
        backButtonMultipler = 1.07;
        modeTextFontSize = '35px';
        titleFontSize = 60;
        typeButtonWidth = 0.8;
        typeButtonHeight = 0.7;
        buttonTypeHeightIncrement = 80;
    }
}
