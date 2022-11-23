//hide success game end
$('#success_game_end_container').css('visibility','hidden');
//hide failed game end
$('#failed_game_end_container').css('visibility','hidden');

$(window).on('load', function ()  {
    //hide game
    $('#game_container').css('visibility','hidden');
    //play background music
    document.getElementById("bgm").play();
});

function buttonClickEffect() {
    document.getElementById('click_effect').play();
}

$('#btnStartGame').click(function () {
    //play button click effect
    buttonClickEffect();
});

$('#btnAbout').click(function () {
    //play button click effect
    buttonClickEffect();
});