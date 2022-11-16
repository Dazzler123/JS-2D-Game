var ninja = document.getElementById("character");
var idleImageNum = 0;
var idleAnimationIndex = 0

var runImageNum = 0;
var runAnimationIndex = 0;

var bckgrndPositionX = 0;
var moveBckgrndAnimationIndex = 0;

//start idle animation on load
$('#game_container').onload = idleAnimationStart();

function idleAnimation() {
    // after all idle images are loaded
    if (idleImageNum == 10) {
        idleImageNum = 0;
    }
    // set image
    ninja.src = "assets/images/characters/Idle" + idleImageNum + ".png";

    // to next idle image
    idleImageNum++;
}

function idleAnimationStart() {
    idleAnimationIndex = setInterval(idleAnimation, 150);
}


// character running animation
function runAnimation() {
    // after all running images are loaded
    if (runImageNum == 10) {
        runImageNum = 0;
    }
    //set image
    ninja.src = "assets/images/characters/Run" + runImageNum + ".png";

    // to next running image
    runImageNum++;
}

function runAnimationStart() {
    runAnimationIndex = setInterval(runAnimation, 100);
    //stop idle animation
    clearInterval(idleAnimationIndex);
}

function keyCheck(event) {
    // enter = 13;
    var keyCode = event.which;

    //if enter key is pressed
    if (keyCode == 13) {
        if (runImageNum == 0) {
            runAnimationStart();
        }
    }

    if (moveBckgrndAnimationIndex == 0) {
        moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
    }
}

function moveBackground() {
    bckgrndPositionX = bckgrndPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = bckgrndPositionX + "px";
}