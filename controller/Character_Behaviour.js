var ninja = document.getElementById("character");
var ninjaMarginTop = 53.5;
var idleImageNum = 0;
var idleAnimationIndex = 0

var runImageNum = 0;
var runAnimationIndex = 0;

var bckgrndPositionX = 0;
var moveBckgrndAnimationIndex = 0;

var jumpImageNum = 0;
var jumpAnimationIndex = 0;

//start idle animation on load
$('#game_container').onload = idleAnimationStart();
//add wolf barrier at game startup
$('#game_container').onload = createWolfBarrier();

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

    if (moveBckgrndAnimationIndex == 0 & keyCode == 13) {
        moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
    }

    if (keyCode == 32) {
        if (jumpAnimationIndex == 0) {
            jumpAnimationStart();
        }
        if (moveBckgrndAnimationIndex == 0) {
            moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
        }
    }
}

function moveBackground() {
    bckgrndPositionX = bckgrndPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = bckgrndPositionX + "px";
}


// character jumping animation
function jumpAnimation() {
    //move ninja up
    if (jumpImageNum <= 5) {
        ninjaMarginTop = ninjaMarginTop - 3;
        ninja.style.marginTop = ninjaMarginTop + "vh";
    }

    //move ninja down
    if (jumpImageNum >= 6) {
        ninjaMarginTop = ninjaMarginTop + 3;
        ninja.style.marginTop = ninjaMarginTop + "vh";
    }

    // after all jumping images are loaded
    if (jumpImageNum == 10) {
        jumpImageNum = 0;
        //stop jump effect
        clearInterval(jumpAnimationIndex);
        jumpAnimationIndex = 0;
        runAnimationIndex = 0;
        //start running again
        runAnimationStart();
    }
    //set image
    ninja.src = "assets/images/characters/Jump" + jumpImageNum + ".png";

    // to next running image
    jumpImageNum++;
}

function jumpAnimationStart() {
    // clearInterval(idleImageNum);
    // runAnimationIndex = 0;
    clearInterval(runAnimationIndex);
    jumpAnimationIndex = setInterval(jumpAnimation, 100);
}

// adding a wolf as an barrier
function createWolfBarrier() {
    console.log("here");
    var wolf = document.createElement("div");
    wolf.className = "wolf";
    //add to background
    $('#background').append(wolf);
}