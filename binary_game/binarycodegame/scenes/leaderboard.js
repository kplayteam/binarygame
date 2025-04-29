/*demo.leaderboard = function(){};

let initY;
let serialInitY;
var ref;
let items = []
let isReadAvailable = false

demo.leaderboard.prototype = {
  init: function ()
  {
    //this.scale.pageAlignHorizontally = true;

    //Load the Scroller plugin
    this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);

    //Configure the Scroller plugin
    this.game.kineticScrolling.configure({
        kineticMovement: true,
        verticalScroll: true,
        horizontalScroll: false,
        verticalWheel: true,
        timeConstantScroll: 325,
        deltaWheel: 40
    });
  },
  preload: function()
  {
    //All Device Config
    leaderboardDevicesConfig();
  },
  create: function()
  {
    btnClick = game.add.audio('btnClick');

    leaderBoardLabelGroups = game.add.group();
    leaderBoardTitle = game.add.text(game.width/leaderBoardTitleMultipler, game.height/15, 'LeadBoard', { fontSize: titleFontSize, fill: '#00FF2F', font: 'Pixel Digivolve'});
    leaderBoardTitle.anchor.setTo(0, 0.5);
    leaderBoardTitle.fixedToCamera = true;
    leaderBoardLabelGroups.add(leaderBoardTitle);

    leaderBoardScoreGroup = game.add.group();
    leaderBoardHighScoreLabel = game.add.text(game.width/leaderBoardScoreMultipler, game.height/8, 'Your Score: '+totalScore, { fontSize: scoreFontSize, fill: '#ffffff', font: 'Pixel Digivolve'});
    leaderBoardHighScoreLabel.anchor.setTo(0, 0.5);
    leaderBoardHighScoreLabel.fixedToCamera = true;
    leaderBoardScoreGroup.add(leaderBoardHighScoreLabel);

    leaderBoardCloseButtonGroup = game.add.group();
    leadBoardCloseButton = game.add.button(game.width/mobileCloseButtonwidthMulitper, game.height/15, 'close', leaderBoardCloseButton, this);
    leadBoardCloseButton.scale.setTo(closeButtonScaler, closeButtonScaler);
    leadBoardCloseButton.anchor.setTo(0.5, 0.5);
    leadBoardCloseButton.fixedToCamera = true;
    leaderBoardCloseButtonGroup.add(leadBoardCloseButton);

    currentPlayerLevelGroup = game.add.group();
    currentPlayerLevelText = this.game.add.text(this.game.width/leaderBoardSerialNumberMultipler, currentPlayerStats, "-", { fontSize: serialRankFontSize, font: 'Space Mono', align: "left", fill: '#fbbc05' });
    currentPlayerLevelText.anchor.set(0.4, 0.5);
    currentPlayerLevelText.fixedToCamera = true;
    currentPlayerLevelGroup.add(currentPlayerLevelText);

    currentUsernameTextGroup = game.add.group();
    currentUsernameText = this.game.add.text(this.game.width/leaderBoardUserNameMultipler, currentPlayerStats, "-", { fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#fbbc05' });
    currentUsernameText.anchor.set(0, 0.5);
    currentUsernameText.fixedToCamera = true;
    currentUsernameTextGroup.add(currentUsernameText);

    currentPointsTextGroup = game.add.group();
    currentPointsText = this.game.add.text(this.game.width/leaderBoardScorePosition, currentPlayerStats, "-", {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#fbbc05' });
    currentPointsText.anchor.set(0.5, 0.5);
    currentPointsText.fixedToCamera = true;
    currentPointsTextGroup.add(currentPointsText);

    currentRankTextGroup = game.add.group();
    currentRankText = this.game.add.text(this.game.width/leaderBoardLevelMultipler, currentPlayerStats, "-", {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#fbbc05' });
    currentRankText.anchor.set(0.5, 0.5);
    currentRankText.fixedToCamera = true;
    currentRankTextGroup.add(currentRankText);

    currentCorrectNumberOfAnswerTextGroup = game.add.group();
    currentCorrectNumberOfAnswerText = this.game.add.text(this.game.width/leaderBoardCorrectAnswerMutliper, currentPlayerStats, "-", {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#fbbc05' });
    currentCorrectNumberOfAnswerText.anchor.set(0.5, 0.5);
    currentCorrectNumberOfAnswerText.fixedToCamera = true;
    currentCorrectNumberOfAnswerTextGroup.add(currentCorrectNumberOfAnswerText);

    currentTimeTextGroup = game.add.group();
    currentTimeText = this.game.add.text(this.game.width/leaderBoardTimelMultipler, currentPlayerStats, "-", {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#fbbc05' });
    currentTimeText.anchor.set(0.5, 0.5);
    currentTimeText.fixedToCamera = true;
    currentTimeTextGroup.add(currentTimeText);

    requiredScoreToNextLevelGroup = game.add.group();
    requiredScoreToNextLevel = this.game.add.text(this.game.width/leaderBoardSerialNumberMultipler, currentPlayerScoreToNextGiG, "", {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#fbbc05' });
    requiredScoreToNextLevel.anchor.set(0, 0.5);
    requiredScoreToNextLevel.fixedToCamera = true;
    requiredScoreToNextLevelGroup.add(requiredScoreToNextLevel);

    panel = game.add.sprite(0,0,'toppanel');

    leaderBoardPanelGroup = game.add.group();
    panel1 = game.add.sprite(0,0,'toppanel');
    panel1.scale.setTo(1, panelScalerY)
    panel1.fixedToCamera = true;
    leaderBoardPanelGroup.add(panel1);

    leaderBoardCoinIconGroup = game.add.group();
    scoreImg = game.add.sprite(game.width/leaderBoardScorePosition, game.height/5, 'points');
    scoreImg.anchor.setTo(0.5, 0.5);
    scoreImg.scale.setTo(iconScaler, iconScaler);
    scoreImg.fixedToCamera = true;
    leaderBoardCoinIconGroup.add(scoreImg);

    leaderBoardRankIconGroup = game.add.group();
    levelImg = game.add.sprite(game.width/leaderBoardLevelMultipler, game.height/5, 'rank');
    levelImg.anchor.setTo(0.5, 0.5);
    levelImg.scale.setTo(iconScaler, iconScaler);
    levelImg.fixedToCamera = true;
    leaderBoardRankIconGroup.add(levelImg);

    leaderBoardCorrectAnswersIconGroup = game.add.group();
    correctAnswerImg = game.add.sprite(game.width/leaderBoardCorrectAnswerMutliper, game.height/5, 'correctanswers');
    correctAnswerImg.anchor.setTo(0.5, 0.5);
    correctAnswerImg.scale.setTo(iconScaler, iconScaler);
    correctAnswerImg.fixedToCamera = true;
    leaderBoardCorrectAnswersIconGroup.add(correctAnswerImg);

    leaderBoardTimeIconGroup = game.add.group();
    timeImg = game.add.sprite(game.width/leaderBoardTimelMultipler, game.height/5, 'time');
    timeImg.anchor.setTo(0.5, 0.5);
    timeImg.scale.setTo(iconScaler, iconScaler);
    timeImg.fixedToCamera = true;
    leaderBoardTimeIconGroup.add(timeImg);

    //Retrieving Data from Firebase
    getUserDataAfterWrite();
    //Current Player Serial Number
    currentPlayerLeaderBoardSerialNumber();
  },
  update: function()
  {
    //Keeping UI at the Top Layer
    isUIAtTop();
    if(isReadAvailable && game.state.getCurrentState().key === 'leaderboard'){
      isReadAvailable = false
      console.log("once called in update function")
    }
  }
};
//Keeping UI at the Top Layer in Update Function
function isUIAtTop()
{
  if(items.length > 0)
  {
    leaderBoardTitle.visible = true;
    leaderBoardHighScoreLabel.visible = true;
    leadBoardCloseButton.visible = true;
    scoreImg.visible = true;
    levelImg.visible = true;
    correctAnswerImg.visible = true;
    timeImg.visible = true;
  }
  else
  {
    leaderBoardTitle.visible = false;
    leaderBoardHighScoreLabel.visible = false;
    leadBoardCloseButton.visible = false;
    scoreImg.visible = false;
    levelImg.visible = false;
    correctAnswerImg.visible = false;
    timeImg.visible = false;
  }
  game.world.bringToTop(leaderBoardPanelGroup);

  game.world.bringToTop(leaderBoardLabelGroups);
  game.world.bringToTop(leaderBoardScoreGroup);
  game.world.bringToTop(leaderBoardCloseButtonGroup);

  game.world.bringToTop(leaderBoardCoinIconGroup);
  game.world.bringToTop(leaderBoardRankIconGroup);
  game.world.bringToTop(leaderBoardCorrectAnswersIconGroup);
  game.world.bringToTop(leaderBoardTimeIconGroup);

  game.world.bringToTop(currentUsernameTextGroup);
  game.world.bringToTop(currentPointsTextGroup);
  game.world.bringToTop(currentRankTextGroup);
  game.world.bringToTop(currentCorrectNumberOfAnswerTextGroup);
  game.world.bringToTop(currentTimeTextGroup);
  game.world.bringToTop(currentPlayerLevelGroup);
  game.world.bringToTop(requiredScoreToNextLevelGroup);
}
//Generating Serial Number for LeaderBoard
function currentPlayerLeaderBoardSerialNumber()
{
  let currentplayerData

  ref = firebase.database().ref("leaders/").orderByChild('totalScore');
  ref.on("value", function(snapshot) {
    let dbPlayerData = []
    snapshot.forEach(function(childSnapshot) {
      currentplayerData = childSnapshot.val();
      dbPlayerData.push(currentplayerData);
    });

    dbPlayerData.reverse().forEach(i => {
      if(i.username === userNameInputFieldText.text){
        currentUsernameText.text = i.username;
        currentPointsText.text = i.totalScore;
        currentRankText.text = i.gig;
        currentCorrectNumberOfAnswerText.text = i.correctAnswers.totalCorrectAnswers;
        currentTimeText.text = i.time;
        currentPlayerLevelText.text = "#"+ (dbPlayerData.indexOf(i) + 1);
        return
      }
    })
  });
}
//Retrieving Data from Firebase
function getUserDataAfterWrite()
{
  ref = firebase.database().ref("leaders/").orderByChild('totalScore');

  ref.on("value", function(snapshot) {
    isReadAvailable = true
    items = []

    recordLength = snapshot.numChildren();
    for(let serialNumberRank = 1; serialNumberRank <= recordLength; serialNumberRank++)
    {
      serialNumberText = this.game.add.text(this.game.width/leaderBoardSerialNumberMultipler, serialInitY + serialNumberRank*serialRankIncrementer, '#'+serialNumberRank, { fontSize: serialRankFontSize, font: 'Space Mono', align: "left", fill: '#00FF2F' });
      serialNumberText.anchor.set(0.4, 0.5);
      !game.device.desktop ? serialInitY += 75 : serialInitY += 48
    }

    this.game.kineticScrolling.start();
    snapshot.forEach(function(childSnapshot) {
      items.push(childSnapshot.val())
    });

    items.reverse().forEach(i => {
      usernameText = this.game.add.text(this.game.width/leaderBoardUserNameMultipler, initY + initYIncrementer, '', { fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#cecece' });
      usernameText.anchor.set(0, 0.5);

      pointsText = this.game.add.text(this.game.width/leaderBoardScorePosition, initY + initYIncrementer, '', {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#ffffff' });
      pointsText.anchor.set(0.5, 0.5);

      rankText = this.game.add.text(this.game.width/leaderBoardLevelMultipler, initY + initYIncrementer, '', {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#ffffff' });
      rankText.anchor.set(0.5, 0.5);

      correctNumberOfAnswerText = this.game.add.text(this.game.width/leaderBoardCorrectAnswerMutliper, initY + initYIncrementer , '', {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#ffffff' });
      correctNumberOfAnswerText.anchor.set(0.5, 0.5);

      timeText = this.game.add.text(this.game.width/leaderBoardTimelMultipler, initY + initYIncrementer, '', {fontSize: leaderBoardStatsFontSize, font: 'Space Mono', align: "left", fill: '#ffffff' });
      timeText.anchor.set(0.5, 0.5);

      usernameText.text = i.username;
      pointsText.text = i.totalScore;
      rankText.text = i.gig;
      correctNumberOfAnswerText.text = i.correctAnswers.totalCorrectAnswers;
      timeText.text = i.time;

      !game.device.desktop ? initY += 100 : initY += 60
    })

    //Changing the world height
    if(!game.device.desktop)
      this.game.world.setBounds(0, 0, this.game.width, 130 * recordLength);
    else
      this.game.world.setBounds(0, 0, 500, 100 * recordLength);
  });
}
//Close LeaderBoard and Return PlayMode Main Menu
function leaderBoardCloseButton()
{
  btnClick.play();
  this.game.kineticScrolling.stop();

  if(!game.device.desktop)
    this.game.world.setBounds(0, 0, Presets.width, Presets.height);
  else
    this.game.world.setBounds(0, 0, 500, 750);

  game.state.clearCurrentState();
  game.state.start('playmainmenu');
}
//All Devices Config
function leaderboardDevicesConfig()
{
  if(game.device.android)
  {
    game.load.image("toppanel", "assets/images/mobilepanel.png");
    serialInitY = 550;
    initY = 550;
    currentPlayerStats = 420;
    currentPlayerScoreToNextGiG = 460;
    mobileCloseButtonwidthMulitper = 1.2;
    leaderBoardTitleMultipler = 20;
    leaderBoardScoreMultipler = 20;
    leaderBoardUserNameMultipler = 8;
    leaderBoardLevelMultipler = 1.6;
    leaderBoardCorrectAnswerMutliper = 1.36;
    leaderBoardTimelMultipler = 1.2;
    leaderBoardSerialNumberMultipler = 25;
    closeButtonScaler = 1;
    leaderBoardStatsFontSize = '40px';
    titleFontSize = '60px'
    scoreFontSize = '30px'
    iconScaler = 1
    serialRankFontSize = '30px'
    initYIncrementer = 25
    serialRankIncrementer = 25
    leaderBoardScorePosition = 2
    panelScalerY = 1.4
  }
  else if(game.device.iOS)
  {
    game.load.image("toppanel", "assets/images/mobilepanel.png");
    serialInitY = 550;
    initY = 550;
    currentPlayerStats = 400;
    currentPlayerScoreToNextGiG = 450;
    mobileCloseButtonwidthMulitper = 1.2;
    leaderBoardTitleMultipler = 20;
    leaderBoardScoreMultipler = 20;
    leaderBoardUserNameMultipler = 8;
    leaderBoardLevelMultipler = 1.6;
    leaderBoardCorrectAnswerMutliper = 1.36;
    leaderBoardTimelMultipler = 1.2;
    leaderBoardSerialNumberMultipler = 25;
    closeButtonScaler = 1;
    leaderBoardStatsFontSize = '30px';
    titleFontSize = '60px'
    scoreFontSize = '30px'
    iconScaler = 1
    serialRankFontSize = '30px'
    initYIncrementer = 25
    serialRankIncrementer = 25
    leaderBoardScorePosition = 2
    panelScalerY = 1.4
  }
  else if(game.device.desktop)
  {
    game.load.image("toppanel", "assets/images/desktoppanel.png");
    serialInitY = 300;
    initY = 300;
    currentPlayerStats = 210;
    currentPlayerScoreToNextGiG = 240;
    mobileCloseButtonwidthMulitper = 1.1;
    leaderBoardTitleMultipler = 20;
    leaderBoardUserNameMultipler = 8;
    leaderBoardScoreMultipler = 20;
    leaderBoardScorePosition = 1.8
    leaderBoardLevelMultipler = 1.5;
    leaderBoardCorrectAnswerMutliper = 1.27;
    leaderBoardTimelMultipler = 1.12;
    leaderBoardSerialNumberMultipler = 20;
    closeButtonScaler = 0.5;
    leaderBoardStatsFontSize = '20px';
    titleFontSize = '30px'
    scoreFontSize = '25px'
    iconScaler = 0.7
    serialRankFontSize = '20px'
    initYIncrementer = 10
    serialRankIncrementer = 12
    panelScalerY = 1.15
  }
}*/