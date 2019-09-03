var playing, score, trial, step, action;

playing = false;

var fruits = ["apple", "banana", "cherries", "grapes", "mango", "orange", "peach", "pear", "watermelon"];
$(function () {
    $("#start").click(function () {
        if (playing == true) {
            location.reload();
        } else {
            playing = true;
            score = 0;


            $("#scoreValue").html(score);
            $("#life").show();
            trial = 3;
            addHearts();
            $("#start").html("Reset Game");
            $("#gameOver").hide();
            startAction();

        }
    });

    $("#fruit1").mouseover(function () {
        score++;
        $("#scoreValue").html(score);
        $("#audio")[0].play();

        clearInterval(action);

        $("#fruit1").hide("explode", 500);

        setTimeout(startAction, 500);
    });

    function addHearts() {
        $("#life").empty();
        for (i = 0; i < trial; i++) {
            $("#life").append('<img src="images/heart.png" class="heart">');
        }
    }

    function startAction() {
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({
            "left": Math.round(Math.random() * 550),
            "top": -50
        });
        step = 1 + Math.round(Math.random() * 5);
        action = setInterval(function () {
            $("#fruit1").css("top", $("#fruit1").position().top + step);

            if ($("#fruit1").position().top > $("#game").height()) {
                if (trial > 1) {
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({
                        "left": Math.round(Math.random() * 550),
                        "top": -50
                    });
                    step = 1 + Math.round(Math.random() * 5);
                    trial--;
                    addHearts();
                } else {
                    playing = false;
                    $("#start").html("Start game");
                    $("#life").hide();
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over!</p> <p>Your score is: " + score + "</p>");
                    stopAction();
                }
            }
        }, 10);
    }

    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.floor(Math.random() * 9)] + '.png');
    }

    function stopAction() {
        $("#friut1").hide();
        clearInterval(action);
    }
});
