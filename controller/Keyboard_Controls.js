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