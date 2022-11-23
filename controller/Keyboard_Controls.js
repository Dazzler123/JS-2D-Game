var enterCtrlBlink = 0;

//when keys are pressed
function keyCheck(event) {
    var keyCode = event.which;

    //if enter key is pressed
    if (keyCode == 13) {
        //hide enter ctrl title
        $('#enter_ctrl').remove();

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

//control instructions blink effect
function blink_text() {
    $('#enter_ctrl').fadeOut(100);
    $('#enter_ctrl').fadeIn(100);
}
enterCtrlBlink = setInterval(blink_text, 500);