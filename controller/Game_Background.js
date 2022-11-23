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

// ======================================================================

//move background image
function moveBackground() {
    bckgrndPositionX = bckgrndPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = bckgrndPositionX + "px";

    //show game score
    score = score + 1;
    $('#score').text(score);

    //stop when game is ended
    if (bckgrndPositionX <= -9220) {
        console.log("Game Ended Successfully!");
        //stop ongoing game
        stopGame();
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
}