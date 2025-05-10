demo.username = function () { };

var userNameInputFieldImage;
var userNameInputFieldBtn;

demo.username.prototype = {
    preload: function () {
        //All Devices Config
        userNameDeviceConfig();
    },
    create: function () {
        //Audio Reference
        btnClick = game.add.audio('btnClick');
        keyPress = game.add.audio('keypress');
        error = game.add.audio('error');

        let titleTextValue = "KIDOCODE";
        this.spellOutTitleTextColored(game.width / 2, game.height / 15, 10, titleTextValue, titleTextFontSize, 1, '#33AF4A', 'Pixel Digivolve');

        userNameInputFieldBtn = game.add.button(game.width / 2, game.height / 2, 'blank', emptyUserNameField1, this);
        userNameInputFieldBtn.anchor.setTo(0.5, 0.5);
        userNameInputFieldBtn.scale.setTo(0.5, 0.5);
        userNameInputFieldText = game.add.text(game.width / 2, game.height / 2.1, 'type username', { fontSize: buttonFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
        userNameInputFieldText.anchor.setTo(0.5, 0.5);
        userNameInputFieldImage = game.add.sprite(game.width / 2, game.height / 2, 'input', this);
        userNameInputFieldImage.anchor.setTo(0.5, 0.5);
        userNameInputFieldImage.scale.setTo(userNameInputImageScaler, 1);

        //Submit Button
        this.submitBtnUsername = game.add.button(game.width / 2, game.height / submitHeight, 'submit', onClickSubmitBtn, this);
        this.submitBtnUsername.scale.setTo(buttonWidth, buttonHeight);
        this.submitBtnUsername.anchor.setTo(0.5, 0.5);
        this.submitBtnUsernameText = game.add.text(game.width / 2, game.height / submitHeight, 'submit', { fontSize: buttonFontSize, fill: '#00D928', font: 'Pixel Digivolve' });
        this.submitBtnUsernameText.anchor.setTo(0.5, 0.5);

        //Back Button
        this.backBtn = game.add.button(game.width / 2, game.height / backHeight, 'back', onClickBackBtn, this);
        this.backBtn.scale.setTo(buttonWidth, buttonHeight);
        this.backBtn.anchor.setTo(0.5, 0.5);
        this.backBtnText = game.add.text(game.width / 2, game.height / backHeight, 'back', { fontSize: buttonFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
        this.backBtnText.anchor.setTo(0.5, 0.5);
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
            if (index >= text.length - 1)
                game.time.events.remove(loop);

            index++;
        }
    },
    update: function () {
        usernameInputLimiter();
        if (userNameInputFieldText.text != "type username") {
            keyboardInputAlphabets();
        }
    }
};
//Mapping Keyboard Keys
function keyboardInputAlphabets() {
    key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    key0.onDown.add(onClickBtn0, this);

    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(onClickBtn1, this);

    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key2.onDown.add(onClickBtn2, this);

    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key3.onDown.add(onClickBtn3, this);

    key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    key4.onDown.add(onClickBtn4, this);

    key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    key5.onDown.add(onClickBtn5, this);

    key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    key6.onDown.add(onClickBtn6, this);

    key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    key7.onDown.add(onClickBtn7, this);

    key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    key8.onDown.add(onClickBtn8, this);

    key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    key9.onDown.add(onClickBtn9, this);

    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyA.onDown.add(onClickBtnA, this);

    keyB = game.input.keyboard.addKey(Phaser.Keyboard.B);
    keyB.onDown.add(onClickBtnB, this);

    keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
    keyC.onDown.add(onClickBtnC, this);

    keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyD.onDown.add(onClickBtnD, this);

    keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
    keyE.onDown.add(onClickBtnE, this);

    keyF = game.input.keyboard.addKey(Phaser.Keyboard.F);
    keyF.onDown.add(onClickBtnF, this);

    keyG = game.input.keyboard.addKey(Phaser.Keyboard.G);
    keyG.onDown.add(onClickBtnG, this);

    keyH = game.input.keyboard.addKey(Phaser.Keyboard.H);
    keyH.onDown.add(onClickBtnH, this);

    keyI = game.input.keyboard.addKey(Phaser.Keyboard.I);
    keyI.onDown.add(onClickBtnI, this);

    keyJ = game.input.keyboard.addKey(Phaser.Keyboard.J);
    keyJ.onDown.add(onClickBtnJ, this);

    keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);
    keyK.onDown.add(onClickBtnK, this);

    keyL = game.input.keyboard.addKey(Phaser.Keyboard.L);
    keyL.onDown.add(onClickBtnL, this);

    keyM = game.input.keyboard.addKey(Phaser.Keyboard.M);
    keyM.onDown.add(onClickBtnM, this);

    keyN = game.input.keyboard.addKey(Phaser.Keyboard.N);
    keyN.onDown.add(onClickBtnN, this);

    keyO = game.input.keyboard.addKey(Phaser.Keyboard.O);
    keyO.onDown.add(onClickBtnO, this);

    keyP = game.input.keyboard.addKey(Phaser.Keyboard.P);
    keyP.onDown.add(onClickBtnP, this);

    keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    keyQ.onDown.add(onClickBtnQ, this);

    keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
    keyR.onDown.add(onClickBtnR, this);

    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyS.onDown.add(onClickBtnS, this);

    keyT = game.input.keyboard.addKey(Phaser.Keyboard.T);
    keyT.onDown.add(onClickBtnT, this);

    keyU = game.input.keyboard.addKey(Phaser.Keyboard.U);
    keyU.onDown.add(onClickBtnU, this);

    keyV = game.input.keyboard.addKey(Phaser.Keyboard.V);
    keyV.onDown.add(onClickBtnV, this);

    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyW.onDown.add(onClickBtnW, this);

    keyX = game.input.keyboard.addKey(Phaser.Keyboard.X);
    keyX.onDown.add(onClickBtnX, this);

    keyY = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    keyY.onDown.add(onClickBtnY, this);

    keyZ = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    keyZ.onDown.add(onClickBtnZ, this);

    keyBackSpace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    keyBackSpace.onDown.add(onClickBtnRemove, this);

    keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    keyEnter.onDown.add(onClickSubmitBtn, this);
}
//Input Limiter
function usernameInputLimiter() {
    let str = userNameInputFieldText.text;
    if (str.length > 14)
        userNameInputFieldText.text = str.substr(0, str.length - 1);
}
//Animation of UserName Field
function emptyUserNameField1() {
    keyPress.play();
    if (!game.device.desktop) {
        game.add.tween(userNameInputFieldBtn).to({ y: game.height / inputFieldMultipler }, 500, Phaser.Easing.Bounce.Out, true);
        game.add.tween(userNameInputFieldText).to({ y: game.height / inputFieldTextMultipler }, 500, Phaser.Easing.Bounce.Out, true);
        game.add.tween(userNameInputFieldImage).to({ y: game.height / inputFieldMultipler }, 500, Phaser.Easing.Bounce.Out, true);
        keyboard();
    }

    if (userNameInputFieldText.text === "type username")
        userNameInputFieldText.text = '';
}
//OnClick KeyBoard Keys
function onClickBtnA() { keyPress.play(); userNameInputFieldText.text += 'a'; }
function onClickBtnB() { keyPress.play(); userNameInputFieldText.text += 'b'; }
function onClickBtnC() { keyPress.play(); userNameInputFieldText.text += 'c'; }
function onClickBtnD() { keyPress.play(); userNameInputFieldText.text += 'd'; }
function onClickBtnE() { keyPress.play(); userNameInputFieldText.text += 'e'; }
function onClickBtnF() { keyPress.play(); userNameInputFieldText.text += 'f'; }
function onClickBtnG() { keyPress.play(); userNameInputFieldText.text += 'g'; }
function onClickBtnH() { keyPress.play(); userNameInputFieldText.text += 'h'; }
function onClickBtnI() { keyPress.play(); userNameInputFieldText.text += 'i'; }
function onClickBtnJ() { keyPress.play(); userNameInputFieldText.text += 'j'; }
function onClickBtnK() { keyPress.play(); userNameInputFieldText.text += 'k'; }
function onClickBtnL() { keyPress.play(); userNameInputFieldText.text += 'l'; }
function onClickBtnM() { keyPress.play(); userNameInputFieldText.text += 'm'; }
function onClickBtnN() { keyPress.play(); userNameInputFieldText.text += 'n'; }
function onClickBtnO() { keyPress.play(); userNameInputFieldText.text += 'o'; }
function onClickBtnP() { keyPress.play(); userNameInputFieldText.text += 'p'; }
function onClickBtnQ() { keyPress.play(); userNameInputFieldText.text += 'q'; }
function onClickBtnR() { keyPress.play(); userNameInputFieldText.text += 'r'; }
function onClickBtnS() { keyPress.play(); userNameInputFieldText.text += 's'; }
function onClickBtnT() { keyPress.play(); userNameInputFieldText.text += 't'; }
function onClickBtnU() { keyPress.play(); userNameInputFieldText.text += 'u'; }
function onClickBtnV() { keyPress.play(); userNameInputFieldText.text += 'v'; }
function onClickBtnW() { keyPress.play(); userNameInputFieldText.text += 'w'; }
function onClickBtnX() { keyPress.play(); userNameInputFieldText.text += 'x'; }
function onClickBtnY() { keyPress.play(); userNameInputFieldText.text += 'y'; }
function onClickBtnZ() { keyPress.play(); userNameInputFieldText.text += 'z'; }
function onClickBtn1() { keyPress.play(); userNameInputFieldText.text += 1; }
function onClickBtn2() { keyPress.play(); userNameInputFieldText.text += 2; }
function onClickBtn3() { keyPress.play(); userNameInputFieldText.text += 3; }
function onClickBtn4() { keyPress.play(); userNameInputFieldText.text += 4; }
function onClickBtn5() { keyPress.play(); userNameInputFieldText.text += 5; }
function onClickBtn6() { keyPress.play(); userNameInputFieldText.text += 6; }
function onClickBtn7() { keyPress.play(); userNameInputFieldText.text += 7; }
function onClickBtn8() { keyPress.play(); userNameInputFieldText.text += 8; }
function onClickBtn9() { keyPress.play(); userNameInputFieldText.text += 9; }
function onClickBtn0() { keyPress.play(); userNameInputFieldText.text += 0; }

//BackSpace Button
function onClickBtnRemove() {
    keyPress.play();
    let str = userNameInputFieldText.text;
    userNameInputFieldText.text = str.substr(0, str.length - 1);
}
//Submit Button
function onClickSubmitBtn() {
    if (userNameInputFieldText.text === "type username" || userNameInputFieldText.text === '')
        error.play();
    else {
        btnClick.play();
        generatingUserId();
        game.state.start('playmainmenu');
    }
}
//Generating User id
function generatingUserId() {
    socket.emit("new_user", { "username" : userNameInputFieldText.text });
}
//If New User, Push Name & ID to Firebase
function pushNameIDToFirebase() {
    leaderRef.child(userNameInputFieldText.text).set({
        username: userNameInputFieldText.text,
        binaryData: {
            binaryScore: 0,
            binaryCorrect: 0,
        },
        decimalData: {
            decimalScore: 0,
            decimalCorrect: 0,
        },
        totalScore: 0,
        totalCorrectAnswers: 0,
        gig: 3,
        time: 0,
        id: id,
        createdAt: Date(),
    }, function (error) {
        if (error) {
            console.log(error);
            pushNameIDToFirebase();
        } else {
            console.log("Data uploaded successfully");
        }
    });
}
// function pushNameIDToFirebase(){
//   leaderRef.child(userNameInputFieldText.text).set({
//     username: userNameInputFieldText.text,
//     score: {
//       binaryScore: 0,
//       decimalScore: 0,
//       totalScore: 0
//     },
//     correctAnswers:{
//       binaryCorrect: 0,
//       decimalCorrect: 0,
//       totalCorrectAnswers: 0
//     },
//     gig: 3,
//     time: 0,
//     id: id,
//     createdAt: Date(),
//   }, function(error) {
//     if (error) {
//       console.log(error);
//       pushNameIDToFirebase();
//     } else {
//       console.log("Data uploaded successfully");
//     }
//   });
// }
//Back Button
function onClickBackBtn() {
    btnClick.play();
    game.state.start('modeselection');
}
//Keyboard Button Creation
function keyboard() {
    this.numBtn1 = game.add.button(game.world.centerX - 315, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn1, this);
    this.numBtn1.anchor.setTo(0.5, 0.5);
    this.numBtn1.scale.setTo(0.3, 1);
    this.numBtn1Text = game.add.text(game.world.centerX - 315, game.height / usernameKeyboard1Line, '1', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn1Text.anchor.setTo(0.5, 0.5);

    this.numBtn2 = game.add.button(game.world.centerX - 245, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn2, this);
    this.numBtn2.anchor.setTo(0.5, 0.5);
    this.numBtn2.scale.setTo(0.3, 1);
    this.numBtn2Text = game.add.text(game.world.centerX - 245, game.height / usernameKeyboard1Line, '2', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn2Text.anchor.setTo(0.5, 0.5);

    this.numBtn3 = game.add.button(game.world.centerX - 175, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn3, this);
    this.numBtn3.anchor.setTo(0.5, 0.5);
    this.numBtn3.scale.setTo(0.3, 1);
    this.numBtn3Text = game.add.text(game.world.centerX - 175, game.height / usernameKeyboard1Line, '3', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn3Text.anchor.setTo(0.5, 0.5);

    this.numBtn4 = game.add.button(game.world.centerX - 105, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn4, this);
    this.numBtn4.anchor.setTo(0.5, 0.5);
    this.numBtn4.scale.setTo(0.3, 1);
    this.numBtn4Text = game.add.text(game.world.centerX - 105, game.height / usernameKeyboard1Line, '4', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn4Text.anchor.setTo(0.5, 0.5);

    this.numBtn5 = game.add.button(game.world.centerX - 35, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn5, this);
    this.numBtn5.anchor.setTo(0.5, 0.5);
    this.numBtn5.scale.setTo(0.3, 1);
    this.numBtn5Text = game.add.text(game.world.centerX - 35, game.height / usernameKeyboard1Line, '5', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn5Text.anchor.setTo(0.5, 0.5);

    this.numBtn6 = game.add.button(game.world.centerX + 35, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn6, this);
    this.numBtn6.anchor.setTo(0.5, 0.5);
    this.numBtn6.scale.setTo(0.3, 1);
    this.numBtn6Text = game.add.text(game.world.centerX + 35, game.height / usernameKeyboard1Line, '6', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn6Text.anchor.setTo(0.5, 0.5);

    this.numBtn7 = game.add.button(game.world.centerX + 105, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn7, this);
    this.numBtn7.anchor.setTo(0.5, 0.5);
    this.numBtn7.scale.setTo(0.3, 1);
    this.numBtn7Text = game.add.text(game.world.centerX + 105, game.height / usernameKeyboard1Line, '7', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn7Text.anchor.setTo(0.5, 0.5);

    this.numBtn8 = game.add.button(game.world.centerX + 175, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn8, this);
    this.numBtn8.anchor.setTo(0.5, 0.5);
    this.numBtn8.scale.setTo(0.3, 1);
    this.numBtn8Text = game.add.text(game.world.centerX + 175, game.height / usernameKeyboard1Line, '8', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn8Text.anchor.setTo(0.5, 0.5);

    this.numBtn9 = game.add.button(game.world.centerX + 245, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn9, this);
    this.numBtn9.anchor.setTo(0.5, 0.5);
    this.numBtn9.scale.setTo(0.3, 1);
    this.numBtn9Text = game.add.text(game.world.centerX + 245, game.height / usernameKeyboard1Line, '9', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn9Text.anchor.setTo(0.5, 0.5);

    this.numBtn0 = game.add.button(game.world.centerX + 315, game.height / usernameKeyboard1Line, 'keyboard', onClickBtn0, this);
    this.numBtn0.anchor.setTo(0.5, 0.5);
    this.numBtn0.scale.setTo(0.3, 1);
    this.numBtn0Text = game.add.text(game.world.centerX + 315, game.height / usernameKeyboard1Line, '0', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.numBtn0Text.anchor.setTo(0.5, 0.5);

    //Alphabets
    this.aplhaBtnQ = game.add.button(game.world.centerX - 405, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnQ, this);
    this.aplhaBtnQ.anchor.setTo(0.5, 0.5);
    this.aplhaBtnQ.scale.setTo(0.4, 0.8);
    this.aplhaBtnQText = game.add.text(game.world.centerX - 405, game.height / usernameKeyboard2Line, 'q', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnQText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnW = game.add.button(game.world.centerX - 315, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnW, this);
    this.aplhaBtnW.anchor.setTo(0.5, 0.5);
    this.aplhaBtnW.scale.setTo(0.4, 0.8);
    this.aplhaBtnWText = game.add.text(game.world.centerX - 315, game.height / usernameKeyboard2Line, 'w', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnWText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnE = game.add.button(game.world.centerX - 225, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnE, this);
    this.aplhaBtnE.anchor.setTo(0.5, 0.5);
    this.aplhaBtnE.scale.setTo(0.4, 0.8);
    this.aplhaBtnEText = game.add.text(game.world.centerX - 225, game.height / usernameKeyboard2Line, 'e', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnEText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnD = game.add.button(game.world.centerX - 135, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnR, this);
    this.aplhaBtnD.anchor.setTo(0.5, 0.5);
    this.aplhaBtnD.scale.setTo(0.4, 0.8);
    this.aplhaBtnDText = game.add.text(game.world.centerX - 135, game.height / usernameKeyboard2Line, 'r', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnDText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnT = game.add.button(game.world.centerX - 45, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnT, this);
    this.aplhaBtnT.anchor.setTo(0.5, 0.5);
    this.aplhaBtnT.scale.setTo(0.4, 0.8);
    this.aplhaBtnTText = game.add.text(game.world.centerX - 45, game.height / usernameKeyboard2Line, 't', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnTText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnY = game.add.button(game.world.centerX + 45, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnY, this);
    this.aplhaBtnY.anchor.setTo(0.5, 0.5);
    this.aplhaBtnY.scale.setTo(0.4, 0.8);
    this.aplhaBtnYText = game.add.text(game.world.centerX + 45, game.height / usernameKeyboard2Line, 'y', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnYText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnU = game.add.button(game.world.centerX + 135, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnU, this);
    this.aplhaBtnU.anchor.setTo(0.5, 0.5);
    this.aplhaBtnU.scale.setTo(0.4, 0.8);
    this.aplhaBtnUText = game.add.text(game.world.centerX + 135, game.height / usernameKeyboard2Line, 'u', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnUText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnI = game.add.button(game.world.centerX + 225, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnI, this);
    this.aplhaBtnI.anchor.setTo(0.5, 0.5);
    this.aplhaBtnI.scale.setTo(0.4, 0.8);
    this.aplhaBtnIText = game.add.text(game.world.centerX + 225, game.height / usernameKeyboard2Line, 'i', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnIText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnO = game.add.button(game.world.centerX + 315, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnO, this);
    this.aplhaBtnO.anchor.setTo(0.5, 0.5);
    this.aplhaBtnO.scale.setTo(0.4, 0.8);
    this.aplhaBtnOText = game.add.text(game.world.centerX + 315, game.height / usernameKeyboard2Line, 'o', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnOText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnP = game.add.button(game.world.centerX + 405, game.height / usernameKeyboard2Line, 'keyboard', onClickBtnP, this);
    this.aplhaBtnP.anchor.setTo(0.5, 0.5);
    this.aplhaBtnP.scale.setTo(0.4, 0.8);
    this.aplhaBtnPText = game.add.text(game.world.centerX + 405, game.height / usernameKeyboard2Line, 'p', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnPText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnA = game.add.button(game.world.centerX - 360, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnA, this);
    this.aplhaBtnA.anchor.setTo(0.5, 0.5);
    this.aplhaBtnA.scale.setTo(0.4, 0.8);
    this.aplhaBtnAText = game.add.text(game.world.centerX - 360, game.height / usernameKeyboard3Line, 'a', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnAText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnS = game.add.button(game.world.centerX - 270, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnS, this);
    this.aplhaBtnS.anchor.setTo(0.5, 0.5);
    this.aplhaBtnS.scale.setTo(0.4, 0.8);
    this.aplhaBtnSText = game.add.text(game.world.centerX - 270, game.height / usernameKeyboard3Line, 's', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnSText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnD = game.add.button(game.world.centerX - 180, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnD, this);
    this.aplhaBtnD.anchor.setTo(0.5, 0.5);
    this.aplhaBtnD.scale.setTo(0.4, 0.8);
    this.aplhaBtnDText = game.add.text(game.world.centerX - 180, game.height / usernameKeyboard3Line, 'd', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnDText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnF = game.add.button(game.world.centerX - 90, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnF, this);
    this.aplhaBtnF.anchor.setTo(0.5, 0.5);
    this.aplhaBtnF.scale.setTo(0.4, 0.8);
    this.aplhaBtnFText = game.add.text(game.world.centerX - 90, game.height / usernameKeyboard3Line, 'f', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnFText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnG = game.add.button(game.world.centerX, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnG, this);
    this.aplhaBtnG.anchor.setTo(0.5, 0.5);
    this.aplhaBtnG.scale.setTo(0.4, 0.8);
    this.aplhaBtnGText = game.add.text(game.world.centerX, game.height / usernameKeyboard3Line, 'g', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnGText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnH = game.add.button(game.world.centerX + 90, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnH, this);
    this.aplhaBtnH.anchor.setTo(0.5, 0.5);
    this.aplhaBtnH.scale.setTo(0.4, 0.8);
    this.aplhaBtnHText = game.add.text(game.world.centerX + 90, game.height / usernameKeyboard3Line, 'h', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnHText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnJ = game.add.button(game.world.centerX + 180, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnJ, this);
    this.aplhaBtnJ.anchor.setTo(0.5, 0.5);
    this.aplhaBtnJ.scale.setTo(0.4, 0.8);
    this.aplhaBtnJText = game.add.text(game.world.centerX + 180, game.height / usernameKeyboard3Line, 'j', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnJText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnK = game.add.button(game.world.centerX + 270, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnK, this);
    this.aplhaBtnK.anchor.setTo(0.5, 0.5);
    this.aplhaBtnK.scale.setTo(0.4, 0.8);
    this.aplhaBtnKText = game.add.text(game.world.centerX + 270, game.height / usernameKeyboard3Line, 'k', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnKText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnL = game.add.button(game.world.centerX + 360, game.height / usernameKeyboard3Line, 'keyboard', onClickBtnL, this);
    this.aplhaBtnL.anchor.setTo(0.5, 0.5);
    this.aplhaBtnL.scale.setTo(0.4, 0.8);
    this.aplhaBtnLText = game.add.text(game.world.centerX + 360, game.height / usernameKeyboard3Line, 'l', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnLText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnZ = game.add.button(game.world.centerX - 320, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnZ, this);
    this.aplhaBtnZ.anchor.setTo(0.5, 0.5);
    this.aplhaBtnZ.scale.setTo(0.4, 0.8);
    this.aplhaBtnZText = game.add.text(game.world.centerX - 320, game.height / usernameKeyboard4Line, 'z', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnZText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnX = game.add.button(game.world.centerX - 230, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnX, this);
    this.aplhaBtnX.anchor.setTo(0.5, 0.5);
    this.aplhaBtnX.scale.setTo(0.4, 0.8);
    this.aplhaBtnXText = game.add.text(game.world.centerX - 230, game.height / usernameKeyboard4Line, 'x', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnXText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnC = game.add.button(game.world.centerX - 140, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnC, this);
    this.aplhaBtnC.anchor.setTo(0.5, 0.5);
    this.aplhaBtnC.scale.setTo(0.4, 0.8);
    this.aplhaBtnCText = game.add.text(game.world.centerX - 140, game.height / usernameKeyboard4Line, 'c', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnCText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnV = game.add.button(game.world.centerX - 50, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnV, this);
    this.aplhaBtnV.anchor.setTo(0.5, 0.5);
    this.aplhaBtnV.scale.setTo(0.4, 0.8);
    this.aplhaBtnVText = game.add.text(game.world.centerX - 50, game.height / usernameKeyboard4Line, 'v', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnVText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnB = game.add.button(game.world.centerX + 40, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnB, this);
    this.aplhaBtnB.anchor.setTo(0.5, 0.5);
    this.aplhaBtnB.scale.setTo(0.4, 0.8);
    this.aplhaBtnBText = game.add.text(game.world.centerX + 40, game.height / usernameKeyboard4Line, 'b', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnBText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnN = game.add.button(game.world.centerX + 130, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnN, this);
    this.aplhaBtnN.anchor.setTo(0.5, 0.5);
    this.aplhaBtnN.scale.setTo(0.4, 0.8);
    this.aplhaBtnNText = game.add.text(game.world.centerX + 130, game.height / usernameKeyboard4Line, 'n', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnNText.anchor.setTo(0.5, 0.5);

    this.aplhaBtnm = game.add.button(game.world.centerX + 220, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnM, this);
    this.aplhaBtnm.anchor.setTo(0.5, 0.5);
    this.aplhaBtnm.scale.setTo(0.4, 0.8);
    this.aplhaBtnmText = game.add.text(game.world.centerX + 220, game.height / usernameKeyboard4Line, 'm', { fontSize: keyPadFontSize, fill: '#ffffff', font: 'Pixel Digivolve' });
    this.aplhaBtnmText.anchor.setTo(0.5, 0.5);

    this.numBtnRemove = game.add.button(game.world.centerX + 310, game.height / usernameKeyboard4Line, 'keyboard', onClickBtnRemove, this);
    this.numBtnRemove.anchor.setTo(0.5, 0.5);
    this.numBtnRemove.scale.setTo(0.4, 0.8);
    this.numBtnRemoveText = game.add.text(game.world.centerX + 310, game.height / usernameKeyboard4Line, '<', { fontSize: keyPadFontSize, fill: '#EE3E34', font: 'Pixel Digivolve' });
    this.numBtnRemoveText.anchor.setTo(0.5, 0.5);
}
//All Devices Config
function userNameDeviceConfig() {
    if (game.device.android) {
        titleTextFontSize = 100;
        usernameKeyboard1Line = 2;
        usernameKeyboard2Line = 1.8;
        usernameKeyboard3Line = 1.65;
        usernameKeyboard4Line = 1.52;
        inputFieldMultipler = 2.5;
        inputFieldTextMultipler = 2.6;
        buttonWidth = 1.5;
        buttonHeight = 1.5;
        buttonFontSize = '50px';
        keyPadFontSize = '40px';
        submitHeight = 1.25
        backHeight = 1.08
        userNameInputImageScaler = 0.8
    }
    if (game.device.iOS) {
        titleTextFontSize = 100;
        usernameKeyboard1Line = 2;
        usernameKeyboard2Line = 1.76;
        usernameKeyboard3Line = 1.59;
        usernameKeyboard4Line = 1.45;
        inputFieldMultipler = 2.5;
        inputFieldTextMultipler = 2.6;
        buttonWidth = 1.5;
        buttonHeight = 1.5;
        buttonFontSize = '50px';
        keyPadFontSize = '40px';
        submitHeight = 1.25
        backHeight = 1.08
        userNameInputImageScaler = 0.8
    }
    else if (game.device.desktop) {
        titleTextFontSize = 60;
        usernameKeyboard1Line = 2.5;
        usernameKeyboard2Line = 2;
        usernameKeyboard3Line = 1.7;
        usernameKeyboard4Line = 1.475;
        inputFieldMultipler = 3.3;
        inputFieldTextMultipler = 3.5;
        buttonWidth = 0.7;
        buttonHeight = 0.7;
        buttonFontSize = '30px';
        keyPadFontSize = '25px';
        submitHeight = 1.25
        backHeight = 1.08
        userNameInputImageScaler = 0.5
    }
}