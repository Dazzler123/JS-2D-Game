var ninja = document.getElementById("character");
var idleImageNum = 0;
var idleAnimationIndex = 0

//start idle animation on load
$('#game_container').onload = idleAnimationStart();

function idleAnimation() {
    // after all idle images are loaded
    if(idleImageNum == 10) {
        idleImageNum = 0;
    }
    // set image
    ninja.src = "assets/images/characters/Idle"+idleImageNum+".png";

    // to next idle image
    idleImageNum++;
}

function idleAnimationStart() {
    idleAnimationIndex = setInterval(idleAnimation, 150);
}