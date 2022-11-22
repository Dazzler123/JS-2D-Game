var ninja = document.getElementById("character");
var ninjaMarginTop = 53.5;
var ninjaMarginLeft = 4;

var idleImageNum = 0;
var idleAnimationIndex = 0

var runImageNum = 0;
var runAnimationIndex = 0;

var bckgrndPositionX = 0;
var moveBckgrndAnimationIndex = 0;

var jumpImageNum = 0;
var jumpAnimationIndex = 0;

//wolf barrier
var wolfDivMarginLeft = 1850;
var wolfAnimationIndex = 0;

//start idle animation on load
$('#game_container').onload = idleAnimationStart();
//add wolf barrier at game startup
$('#game_container').onload = createWolfBarrier();

// ========================================================================

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

//when keys are pressed
function keyCheck(event) {
    var keyCode = event.which;

    //if enter key is pressed
    if (keyCode == 13) {
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
        if (moveBckgrndAnimationIndex == 0) {
            moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
        }
    }

    if (moveBckgrndAnimationIndex == 0 & keyCode == 13) {
        moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
    }
    //start wolf running animation
    if (wolfAnimationIndex == 0) {
        wolfAnimationIndex = setInterval(wolfAnimation, 100);
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
        //reduce ninja's margin top by 5
        ninjaMarginTop = ninjaMarginTop - 5;
        //increase ninja's margin left by 2
        ninjaMarginLeft = ninjaMarginLeft + 2;

        ninja.style.marginTop = ninjaMarginTop + "vh";
        ninja.style.marginLeft = ninjaMarginLeft + "vh";
    }
    //move ninja down
    if (jumpImageNum >= 6) {
        ninjaMarginTop = ninjaMarginTop + 5;
        //reduce ninja's margin left by 2
        ninjaMarginLeft = ninjaMarginLeft - 2;

        ninja.style.marginTop = ninjaMarginTop + "vh";
        ninja.style.marginLeft = ninjaMarginLeft + "vh";
    }

    // after all jumping images are loaded
    if (jumpImageNum == 10) {
        //back to default character margin top
        ninja.style.marginTop = 53.5 + "vh";
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
        if (newMarginLeft <= 145 & newMarginLeft >= -200) {
            if (ninjaMarginTop > 47) {
                console.log("awa!")
                clearInterval(wolfAnimationIndex);

                clearInterval(runAnimationIndex);
                runAnimationIndex = -1;

                clearInterval(jumpAnimationIndex);
                jumpAnimationIndex = -1;

                clearInterval(moveBckgrndAnimationIndex);
                moveBckgrndAnimationIndex = -1;
            }
        }
    }
}







