demo.modeselection = function () { };

let titleText;
let easterEggText;

demo.modeselection.prototype = {
    preload: function () {
        //All Devices Config
        modeSelectionDeviceConfig();
    },
    create: function () {
        phaserJSON = game.cache.getJSON(jsonLoader);
        //Audio Reference
        btnClick = game.add.audio('btnclick');
        typing = game.add.audio('typing');
        typing.play();

        //Mute Button
        btnMute = game.add.button(game.width / muteBtnPosition, game.height / 15, 'sound', onClickMuteButton, this);
        btnMute.scale.setTo(muteScaler, muteScaler);
        btnMute.anchor.setTo(0.5, 0.5);

        //Level Selection Practice Button
        this.btnPractice = game.add.button(game.width / 2, game.height / btnPracticeHeightMultiper, 'submit', onClickToDifficultyLevelButton, this);
        this.btnPractice.anchor.setTo(0.5, 0.5);
        this.btnPractice.scale.setTo(typeButtonWidth, typeButtonHeight);
        this.btnPracticeText = game.add.text(game.width / 2, game.height / btnPracticeHeightMultiper, 'i need coding = training', { fontSize: TypeButtonFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.btnPracticeText.anchor.setTo(0.5, 0.5);

        //Level Selection PlayMode Button
        this.btnGameRound = game.add.button(game.width / 2, game.height / btnGameRoundHeightMultiper, 'submit', onClickToPlayGame, this);
        this.btnGameRound.anchor.setTo(0.5, 0.5);
        this.btnGameRound.scale.setTo(typeButtonWidth, typeButtonHeight);
        this.btnGameRoundText = game.add.text(game.width / 2, game.height / btnGameRoundHeightMultiper, 'i know coding = play', { fontSize: TypeButtonFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.btnGameRoundText.anchor.setTo(0.5, 0.5);

        //Title Text
        titleText = 'KIDOCODE';

        //Title Typing Effect 
        this.spellOutTitleText(game.width / 2, game.height / 15, 500, titleText, titleTextFontSize, 1, '#00D928', 'Pixel Digivolve');
        //EasterEgg Typing Effect
        this.spellOutEasterEggText(game.width / 2, game.height / 2.6, 500, easterEggText, easterEggTextFontSize, 1, '#00D928', 'Pixel Digivolve');
    },
    //Title Typing Effect 
    spellOutTitleText: function (x, y, width, text, fontSize, speed, fill, font) {
        var sentence = game.add.text(x, y, '', { fontSize: fontSize + 'px', fill: fill, font: font });
        sentence.anchor.setTo(0.5, 0.5);
        var currentLine = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: fontSize + 'px', font: font });
        currentLine.anchor.setTo(0.5, 0.5);
        currentLine.anchor.setTo(0.5, 0.5);
        currentLine.alpha = 0;
        var loop = game.time.events.loop(speed, addChar1);

        var index = 0;

        function addChar1() {
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
    //EasterEgg Typing Effect
    spellOutEasterEggText: function (x, y, width, text, fontSize, speed, fill, font) {
        var sentence = game.add.text(x, y, '', { fontSize: fontSize + 'px', fill: fill, font: font });
        sentence.anchor.setTo(0.5, 0.5);
        var currentLine = game.add.text(game.world.centerX, game.world.centerY, '', { fontSize: fontSize + 'px', font: font });
        currentLine.anchor.setTo(0.5, 0.5);
        currentLine.alpha = 0;
        var loop = game.time.events.loop(speed, addChar2);

        var index = 0;

        function addChar2() {
            sentence.text += text[index];
            currentLine.text += text[index];

            if (currentLine.width > width && text[index] == ' ') {
                sentence.text += '\n';
                currentLine.text = '';
            }
            if (index >= text.length - 1) {
                game.time.events.remove(loop);
                typing.stop();
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

        //Changing frame of Mute Button
        if (server.isPlaying)
            btnMute.frame = 0;
        else {
            server.stop();
            btnMute.frame = 1;
        }
    }
};
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
//Go to Training Type Selection Scene
function onClickToDifficultyLevelButton() {
    btnClick.play();
    typing.stop();
    game.state.start('typeselection');
}
//Go to PlayMode Username Scene
function onClickToPlayGame() {
    btnClick.play();
    typing.stop();
    game.state.start('username');
}
//All Devices Config
function modeSelectionDeviceConfig() {
    if (!this.game.device.desktop) {
        titleTextFontSize = 120;
        easterEggTextFontSize = 50;
        btnPracticeHeightMultiper = 1.5;
        btnGameRoundHeightMultiper = 1.25;
        typeButtonWidth = 1.5;
        typeButtonHeight = 1.4;
        TypeButtonFontSize = '45px';
        muteBtnPosition = 1.1;
        muteScaler = 0.5
        easterEggText = 'there are 10 types of people in the\nworld:\nthose who understand binary and those who dont\n...';
    }
    else {
        titleTextFontSize = 60;
        easterEggTextFontSize = 25;
        btnPracticeHeightMultiper = 1.40;
        btnGameRoundHeightMultiper = 1.2;
        typeButtonWidth = 0.7;
        typeButtonHeight = 0.7;
        TypeButtonFontSize = '20px';
        muteBtnPosition = 1.1;
        muteScaler = 0.25;
        easterEggText = 'there are 10 types of\npeople in the world:\nthose who understand\nbinary and those who\ndont\n...';
    }
}
