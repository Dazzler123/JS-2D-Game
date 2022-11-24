var bckgrndPositionX = 0;
var moveBckgrndAnimationIndex = 0;

//game score
var score = 0;
$('#score').text(score);

//wolf barrier
var wolfDivMarginLeft = 1850;
var wolfAnimationIndex = 0;

//add wolf barrier at game startup
$('#game_container').onload = createWolfBarrier();

//background music
var bgm = document.getElementById("bgm");
//ninja running sound effect
var runningEffect = document.getElementById("run_bgm");
//success game won sound effect
var wonEffect = document.getElementById('game_won_effect');
//ninja jumping sound effect part 1
var jumpPartOne = document.getElementById("jump_part_one_bgm");
//ninja jumping sound effect part 2
var jumpPartTwo = document.getElementById("jump_part_two_bgm");
//ninja dead sound effect
var deadEffect = document.getElementById('dead_effect');

// ======================================================================

//control instructions blink effect
function blink_text() {
    $('#enter_ctrl').fadeOut(100);
    $('#enter_ctrl').fadeIn(100);
}

enterCtrlBlink = setInterval(blink_text, 500);

//move background image
function moveBackground() {
    //reduce margin left
    bckgrndPositionX = bckgrndPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = bckgrndPositionX + "px";

    //show game score
    score = score + 1;
    $('#score').text(score);

    //stop when game is ended
    if (bckgrndPositionX <= -9220) {
        console.log("Game Ended Successfully!");
        console.log("Your score : " + score);
        //stop ongoing game
        stopGame();
        //show success game end
        setSuccessEndGame(score);
        // start ninja's idle animation
        idleAnimationStart();
    }
}

// adding a wolf as an barrier
function createWolfBarrier() {
    for (var i = 0; i <= 10; i++) {
        var wolf = document.createElement("div");
        wolf.className = "wolf";
        //add to background
        $('#background').append(wolf);
        wolf.style.marginLeft = wolfDivMarginLeft + "px";
        //set an unique id
        wolf.id = "wolf" + i;

        //add a space of 50vw between first 5 present wolf divs
        if (i < 5) {
            wolfDivMarginLeft = wolfDivMarginLeft + 2000;
        }
        //add a space of 30vw between last 5 wolf divs
        if (i >= 5) {
            wolfDivMarginLeft = wolfDivMarginLeft + 1000;
        }
    }
}

//wolf running towards the game character animation
function wolfAnimation() {
    for (var i = 0; i < 10; i++) {
        //get current wolf
        var currentWolfDiv = document.getElementById("wolf" + i);
        var currentMarginLeft = getComputedStyle(currentWolfDiv).marginLeft;
        //reduce margin left
        var newMarginLeft = parseInt(currentMarginLeft) - 35;
        //set new margin left (as a string)
        currentWolfDiv.style.marginLeft = newMarginLeft.toString() + "px"

        //stop all when both collides
        if (newMarginLeft <= 150 & newMarginLeft >= -84) {
            if (ninjaMarginTop > 47) {
                //stop ongoing game
                stopGame();
                //run dead animation
                deadAnimationIndex = setInterval(ninjaDeadAnimation, 100);
                //hide collided wolf
                currentWolfDiv.style.visibility = "hidden";
                //show failed end game
                setFailedEndGame();
            }
        }
    }
}

function stopGame() {
    //stop wolf running animation
    clearInterval(wolfAnimationIndex);

    //stop ninja running animation
    clearInterval(runAnimationIndex);
    runAnimationIndex = -1;

    //stop ninja jumping animation
    clearInterval(jumpAnimationIndex);
    jumpAnimationIndex = -1;

    //stop background moving animation
    clearInterval(moveBckgrndAnimationIndex);
    moveBckgrndAnimationIndex = -1;

    //stop running sound effect
    runningEffect.pause();

    //clear keycode
    keyCode = null;
}

$('#btnTryAgain').click(function () {
    //hide success game end
    $('#success_game_end_container').css('visibility', 'hidden');
    //hide failed game end
    $('#failed_game_end_container').css('visibility', 'hidden');
    //new game
    resetGame();
});

$('#btnExitGameTwo').click(function () {
    exitGame();
});

function exitGame() {
    // new game
    resetGame();
    //hide titles
    $('#enter_ctrl').css('visibility', 'hidden');
    //hide success game end
    $('#success_game_end_container').css('visibility', 'hidden');
    //hide failed game end
    $('#failed_game_end_container').css('visibility', 'hidden');
    //hide game & show homepage
    $('#game_container').css('visibility', 'hidden');
    $('#home_container').css('visibility', 'visible');
}

function resetGame() {
    //stop current process
    stopGame();
    //show titles
    $('#enter_ctrl').css('visibility', 'visible');
    //set new score
    score = 0;
    $('#score').text(score);

    // idleAnimationStart();

    //remove all wolfs
    removeWolfs();

    ninjaMarginLeft = 4;
    runImageNum = 0;
    bckgrndPositionX = 0;
    moveBckgrndAnimationIndex = 0;

    idleImageNum = 0;
    idleAnimationIndex = 0

    runImageNum = 0;
    runAnimationIndex = 0;

    jumpImageNum = 0;
    jumpAnimationIndex = 0;

    deadImageNum = 1;
    deadAnimationIndex = 0;

    //wolf barrier
    wolfDivMarginLeft = 1850;
    wolfAnimationIndex = 0;

    //create new wolfs
    createWolfBarrier();

    if (keyCode == 13) {
        //hide enter ctrl title
        $('#enter_ctrl').css('visibility', 'hidden');
        console.log("inside");

        //start ninja running animation
        if (runImageNum == 0) {
            runAnimationStart();
        }
        //start wolf running animation
        if (wolfAnimationIndex == 0) {
            wolfAnimationIndex = setInterval(wolfAnimation, 100);
        }
    }
    if (moveBckgrndAnimationIndex == 0 & keyCode == 13) {
        moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
    }
    if (keyCode == 32) {
        if (jumpAnimationIndex == 0) {
            jumpAnimationStart();
        }
    }
}

function removeWolfs() {
    for (var i = 0; i <= 10; i++) {
        var currentWolfDiv = document.getElementById("wolf" + i);
        //remove from background
        $(currentWolfDiv).remove();
    }
}

function setSuccessEndGame() {
    $('#success_game_end_container').css('visibility', 'visible');
    //play sound effect
    wonEffect.play();
    // set score
    $('#success_score').text("Your score : " + score);
}

function setFailedEndGame() {
    $('#failed_game_end_container').css('visibility', 'visible');
    // set score
    $('#failed_score').text("Your score : " + score);
}
