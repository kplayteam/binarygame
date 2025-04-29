demo.loading = function () { };

let binaryText = [];
let text = [
    "001001000000110111001100001011011010110010100",
    "101010000000101110011101001010001010010101010",
    "010010111110101010101010101001000101111010101",
    "100011110111100000101010100010101001000100011",
    "001110101110101100010001100010101011101000100",
    "101010011111011101000110011101000100010100101",
    "000011010011101010001110010001010101000010010",
    "101010010001000101010101010101111100000000000",
    "101010101111100001010111110100011110001101010",
    "110010111110001110101000100101111100011010101",
    "111100010111110100000101010101000010101101000",
    "010100010110101010111101000100010010000001111",
    "000101011101010000101101000010101111010100101",
    "101010001011010110101010110101010101001010010"];

// let sentence;
// let currentLine;

demo.loading.prototype = {
    preload: function () {
        //All Devices Config
        loadingDeviceConfig();
    },
    create: function () {
        this.loadingAudio = game.add.audio('loading');
        server = game.add.audio("server");
        this.loadingAudio.play();
        game.stage.backgroundColor = '#000000';

        for (let i = 0; i < text.length; i++) {
            binaryText[i] = game.add.text(game.width / 2, game.height / binaryTextHeightMultipler + i * binaryTextIncrementMultipler, '', { fontSize: binaryTextFontSize, font: 'Pixel Digivolve', fill: '#00D928' });
            binaryText[i].text = text[i];
            binaryText[i].anchor.setTo(0.5, 0.5);
            this.game.add.tween(binaryText[i].scale).from({ x: 10, y: 10 }, 1000, Phaser.Easing.Linear.None, true, 0);
        }

        binaryText[0].addColor('#ffff00', 10);
        binaryText[0].addColor('#00D928', 15);
        binaryText[3].addColor('#EE3E34', 20);
        binaryText[3].addColor('#00D928', 26);
        binaryText[8].addColor('#00A3DF', 30);
        binaryText[8].addColor('#00D928', 37);
        binaryText[12].addColor('#F16522', 20);
        binaryText[12].addColor('#00D928', 28);

        game.time.events.add(Phaser.Timer.SECOND * 2, proceedToNextState, this);

        //spellOutText(game.width/2, game.height/2, 10, text, 38, 5, '#33B04A', 'Space Mono');
    },
    update: function () {
    }
};
//Go to ModeSelection Scene and Looping the Server Audio
function proceedToNextState() {
    game.state.start('modeselection');
    server.play();
    server.loopFull();
    server.volume = 0.2;
}
//All Devices Config
function loadingDeviceConfig() {
    if (game.device.android) {
        binaryTextHeightMultipler = 10;
        binaryTextFontSize = '90px';
        binaryTextIncrementMultipler = 90;
    }
    else if (game.device.iOS) {
        binaryTextHeightMultipler = 5;
        binaryTextFontSize = '60px';
        binaryTextIncrementMultipler = 50;
    }
    else if (game.device.desktop) {
        binaryTextHeightMultipler = 15;
        binaryTextFontSize = '60px';
        binaryTextIncrementMultipler = 50;
    }
}
// function spellOutText(x, y, width, text, fontSize, speed, fill,  font)
// {
//   let sentence = game.add.text(x, y, '', {fontSize: fontSize + 'px', fill: fill, font: font});
//   let currentLine = game.add.text(game.width/2, game.height/2, '', {fontSize: fontSize + 'px', font: font});
//   sentence.anchor.setTo(0.5, 0.5);
//   currentLine.alpha = 1;

//   sentence.addColor('#ffff00', 200); // yellow
//   sentence.addColor('#33B04A', 210); // green  
//   sentence.addColor('#EE3E34', 560); // red  
//   sentence.addColor('#33B04A', 570); // green
//   sentence.addColor('#00A3DF', 770); // blue
//   sentence.addColor('#33B04A', 780); // green
//   sentence.addColor('#F16522', 920); // orange
//   sentence.addColor('#33B04A', 930); // green

//   let loop = game.time.events.loop(speed, addChar);

//   let index = 0;

//   function addChar() 
//   {
//    sentence.text += text[index];
//    currentLine.text += text[index];

//    if (currentLine.width > width && text[index] % 10 === 0) {
//      sentence.text += '\n';
//      currentLine.text = '';
//    }
//    if (index >= text.length - 1) {
//      game.time.events.remove(loop);
//      game.state.start('modeselection');
//      server.play();
//      server.loopFull();
//      server.volume = 0.2;
//    }
//    index++;
//   }
// }