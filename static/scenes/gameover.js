demo.gameover = function () { };

let dbPlayerUserName = [];
let repeatedTime = 0;
let playAgainButton
let playAgainButtonText
let isBinaryPlayAgainStatusChanged = false
let isDecimalPlayAgainStatusChanged = false
let isWriting;

demo.gameover.prototype = {

    preload: function () {
        //All Devices Config
        gameOverDeviceConfig();
    },
    create: function () {
        //Fetching User's Answer Time
        fetchingTime();

        previousUserData();

        //Required Score to go to Next GIG
        // let splitter = totalAccumalation.toString().length > 2 ? totalAccumalation.toString().charAt(1) + '' + totalAccumalation.toString().charAt(2) : totalAccumalation;
        // requiredScore = totalPointsEachGig - splitter;

        //Audio Reference
        btnClick = game.add.audio('btnClick');

        //GameOver Text
        this.gameOverText = game.add.text(game.world.centerX, game.height / 15, 'Game Over', { fontSize: titleFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.gameOverText.anchor.setTo(0.5, 0.5);

        //User Score Text
        this.scoreText = game.add.text(game.world.centerX, game.height / 5, 'Your Score: ' + totalAccumalation, { fontSize: scoreFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.scoreText.anchor.setTo(0.5, 0.5);
        //isPlayingModeBinary ? this.scoreText.text = 'Your Score: '+binaryScore : this.scoreText.text = 'Your Score: '+decimalScore

        //Play Again Button
        playAgainButton = game.add.button(game.world.centerX, game.height / playAgainButtonHeightMultipler, 'submit', onClickPlayAgainButton, this);
        playAgainButton.anchor.setTo(0.5, 0.5);
        playAgainButton.scale.setTo(buttonWidth, buttonHeight);
        playAgainButtonText = game.add.text(game.world.centerX, game.height / playAgainButtonHeightMultipler, 'play again', { fontSize: buttonFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        playAgainButtonText.anchor.setTo(0.5, 0.5);

        //LeaderBoard Button
        this.leaderBoardButton = game.add.button(game.world.centerX, game.height / leaderBoardButtonHeightMultipler, 'submit', onClickLeaderBoardButton, this);
        this.leaderBoardButton.anchor.setTo(0.5, 0.5);
        this.leaderBoardButton.scale.setTo(buttonWidth, buttonHeight);
        this.leaderBoardButtonText = game.add.text(game.world.centerX, game.height / leaderBoardButtonHeightMultipler, 'leaderboard', { fontSize: buttonFontSize, fill: '#00D928', font: 'Pixel Digivolve', fontWeight: '400' });
        this.leaderBoardButtonText.anchor.setTo(0.5, 0.5);

        //Back To Main Menu Button
        this.backToMainMenuButton = game.add.button(game.world.centerX, game.height / backToMainMenuButtonHeightMultipler, 'back', onClickbackToMainMenuButton, this);
        this.backToMainMenuButton.anchor.setTo(0.5, 0.5);
        this.backToMainMenuButton.scale.setTo(buttonWidth, buttonHeight);
        this.backToMainMenuButtonText = game.add.text(game.world.centerX, game.height / backToMainMenuButtonHeightMultipler, 'back to main menu', { fontSize: buttonFontSize, fill: '#ffffff', font: 'Pixel Digivolve', fontWeight: '400' });
        this.backToMainMenuButtonText.anchor.setTo(0.5, 0.5);

        //Read Firebase Game Status
        playAgainButtonStatus();

        //Check if status is true then call writeUserData() and set status to false
        if (isWriting) {
            isWriting = false;
            //if (idExists)
                updateUserData();
            //else
            //    writeUserData();
        }
    },
    update: function () {
        //Toggle Play Again Button from Firebase
        togglePlayAgainButton()
    }
};
//Checking Previous Score from firbase
function previousUserData() {
    socket.on("user_data", function(data){
        let user = data.user
        if (user){
            previousBinaryScore = user.binaryData.binaryScore
            previousDecimalScore = user.decimalData.decimalScore
            previousBinaryCorrectAnswer = user.binaryData.binaryCorrect
            previousDecimalCorrectAnswer = user.decimalData.decimalCorrect
            uid = user.username
        }else{
            idExists = false;
            previousBinaryScore = 0
            previousDecimalScore = 0
            previousBinaryCorrectAnswer = 0
            previousDecimalCorrectAnswer = 0
            console.log("doesn't exist");
        }
    });
    socket.emit("user_data", {});


    console.log("Previous Binary", previousBinaryScore, "Current Binary", binaryScore)
    console.log("Previous Decimal", previousDecimalScore, "Current Decimal", decimalScore)

    // ACCUMALATED SCORE
    updatedBinaryScore = previousBinaryScore + binaryScore
    updatedDecimalScore = previousDecimalScore + decimalScore
    totalAccumalation = updatedBinaryScore + updatedDecimalScore
    // ACCUMALATED NUMBER OF CORRECT ANSWERS
    updatedBinaryAnswer = previousBinaryCorrectAnswer + binaryNumberOfCorrectAnswers
    updatedDecimalAnswer = previousDecimalCorrectAnswer + decimalNumberOfCorrectAnswers
    totalCorrectAnswers = updatedBinaryAnswer + updatedDecimalAnswer

    // OVERRIDE SCORE IF GREATER THAN PREVIOUS AND ACCUMALATED OF BOTH GAMES
    // updatedBinaryScore = binaryScore > previousBinaryScore ? binaryScore : previousBinaryScore
    // updatedDecimalScore = decimalScore > previousDecimalScore ? decimalScore : previousDecimalScore
    // totalAccumalation = updatedBinaryScore + updatedDecimalScore

    // OVERRIDE # CORRECT ANSWERS IF GREATER THAN PREVIOUS AND ACCUMALATED OF BOTH GAMES
    // updatedBinaryAnswer = binaryNumberOfCorrectAnswers > previousBinaryCorrectAnswer ? binaryNumberOfCorrectAnswers : previousBinaryCorrectAnswer
    // updatedDecimalAnswer = decimalNumberOfCorrectAnswers > previousDecimalCorrectAnswer ? decimalNumberOfCorrectAnswers : previousDecimalCorrectAnswer
    // totalCorrectAnswers = updatedBinaryAnswer + updatedDecimalAnswer
}
//Writing User's Data in Firebase
/*
function writeUserData() {
    console.log("Attempting to set the player data");

    leaderRef.child(userNameInputFieldText.text).set({
        username: userNameInputFieldText.text,
        binaryData: {
            binaryScore: updatedBinaryScore,
            binaryCorrect: updatedBinaryAnswer
        },
        decimalData: {
            decimalScore: updatedDecimalScore,
            decimalCorrect: updatedDecimalAnswer
        },
        totalScore: totalAccumalation,
        totalCorrectAnswers: totalCorrectAnswers,
        gig: playModeBinaryGig,
        time: responseTime,
        id: id,
        createdAt: Date(),
    }, function (error) {
        if (error) {
            console.log(error);
            writeUserData();
        } else {
            console.log("record uploaded successfully");
        }
    });
}*/
//Updating User's Data in Firebase
function updateUserData() {

    console.log("Attempting to update the player data");

    var user_data = {
        "username" : userNameInputFieldText.text,
        "binaryData": {
            "binaryScore": updatedBinaryScore,
            "binaryCorrect": updatedBinaryAnswer
        },
        "decimalData": {
            "decimalScore": updatedDecimalScore,
            "decimalCorrect": updatedDecimalAnswer
        },
        "gig": playModeBinaryGig,
        "time": responseTime
    }
    console.log("user data", user_data)
    socket.emit("update_user_data", {"data" : user_data});

}
//Read Firebase Game Status
function playAgainButtonStatus() {

    socket.on("restart_game_status", function(data){
        isBinaryPlayAgainStatusChanged = data.binaryGame;
        isDecimalPlayAgainStatusChanged = data.decimalGame;
    })
    socket.emit("get_restart_game_status", {});
}
//Toggle Play Again Button from Firebase
function togglePlayAgainButton() {
    playAgainButton.inputEnabled = isBinaryPlayAgainStatusChanged == true || isDecimalPlayAgainStatusChanged == true ? true : false

    if (playAgainButton.inputEnabled == true) {
        playAgainButton.alpha = 1;
        playAgainButtonText.alpha = 1;
    }
    else {
        playAgainButton.alpha = 0.5;
        playAgainButtonText.alpha = 0.5;
    }
}
//This fetch the most frequently answer time.
//Each Question Time is pushed to "totalTimeCollector" array to check the frequent time of user.
//e.g. [1,3,3,3,6,10] So 3 is the most frequent answer time
function fetchingTime() {
    var mf = 1;
    var m = 0;
    for (var i = 0; i < totalTimeCollector.length; i++) {
        for (var j = i; j < totalTimeCollector.length; j++) {
            if (totalTimeCollector[i] == totalTimeCollector[j])
                m++;

            if (mf < m) {
                mf = m;
                repeatedTime = totalTimeCollector[i];
            }
        }
        m = 0;
    }
    if (repeatedTime == undefined)
        repeatedTime = totalTimeCollector[totalTimeCollector.length - 1];

    let reserveDict = { "10": 1, "9": 2, "8": 3, "7": 4, "6": 5, "5": 6, "4": 7, "3": 8, "2": 9, "1": 10, "0": 0 }
    responseTime = reserveDict[repeatedTime];
    totalTimeCollector.length = 0;
}
//Reset the Transform of gameobjects, questions & leaderboard serial number
function resetGameValues() {
    playModeDecimalBinaryPosition = 85;
    playModeDashUserInputTextPosition = 95;
    playModeQuestionIncrementerValue = 0;
    playModeDecimalQuestionIncrementerValue = 0;
    dbPlayerUserName.length = 0;
}
//Go back to binary || decimal game whichever the user was playing before
function onClickPlayAgainButton() {
    btnClick.play();
    resetGameValues();
    if (isBinaryPlayAgainStatusChanged)
        game.state.start('playgamebinary')
    else if(isDecimalPlayAgainStatusChanged)
        game.state.start('playgamedecimal')
}
//Generating Serial Number for LeaderBoard
function currentPlayerLeaderBoardSerialNumber() {
    let currentplayerData

    let currentUserName = document.querySelector('#currentName')
    let currentUserScore = document.querySelector('#currentScore')
    let currentUserGig = document.querySelector('#currentGig')
    let currentUserCorrectAnswer = document.querySelector('#currentCorrectAnswers')
    let currentUserTime = document.querySelector('#currentTime')
    let currentUserSerial = document.querySelector('#currentSerial')

    socket.on('leaders_data_for_current', function (data) {
        items = data.items;
        items.reverse().forEach(i => {
            if (i.username === userNameInputFieldText.text) {
                currentUserName.innerHTML = i.username;
                currentUserScore.innerHTML = i.totalScore;
                currentUserGig.innerHTML = i.gig;
                currentUserCorrectAnswer.innerHTML = i.totalCorrectAnswers;
                currentUserTime.innerHTML = i.time;
                currentUserSerial.innerHTML = "#" + (items.indexOf(i) + 1);
                return
            }
        })
    });
    socket.emit('get_leaders_for_current', {});
}
//Go to LeaderBoard Scene
function onClickLeaderBoardButton() {
    resetGameValues();
    btnClick.play();
    // game.state.start('leaderboard');

    let gameElement = document.querySelector('#game')
    let leaderBoardElement = document.querySelector('#leaderboard')
    let leaderBoardYourScore = document.querySelector('#leader-board-your-score')
    leaderBoardYourScore.innerHTML = 'Your Score: ' + totalAccumalation;
    gameElement.style.display = "none";
    leaderBoardElement.style.display = "block";

    currentPlayerLeaderBoardSerialNumber();
}
//Go back to play Mode Main Menu Scene 
function onClickbackToMainMenuButton() {
    resetGameValues();
    btnClick.play();
    game.state.start('playmainmenu');
}
//All Devices Config
function gameOverDeviceConfig() {
    if (game.device.android) {
        buttonWidth = 1.4;
        buttonHeight = 1.4;
        buttonFontSize = '45px';
        playAgainButtonHeightMultipler = 2;
        leaderBoardButtonHeightMultipler = 1.65;
        backToMainMenuButtonHeightMultipler = 1.4;
        titleFontSize = "90px"
        scoreFontSize = "60px"
    }
    else if (game.device.iOS) {
        buttonWidth = 1.3;
        buttonHeight = 1.3;
        buttonFontSize = '45px';
        playAgainButtonHeightMultipler = 2.2;
        leaderBoardButtonHeightMultipler = 1.65;
        backToMainMenuButtonHeightMultipler = 1.2;
        titleFontSize = "90px"
        scoreFontSize = "60px"
    }
    else if (game.device.desktop) {
        buttonWidth = 0.8;
        buttonHeight = 0.8;
        buttonFontSize = '30px';
        playAgainButtonHeightMultipler = 2;
        leaderBoardButtonHeightMultipler = 1.55;
        backToMainMenuButtonHeightMultipler = 1.2;
        titleFontSize = "60px"
        scoreFontSize = "40px"
    }
}