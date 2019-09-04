$(document).ready(function () {

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////// Variables /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    var currentQuestion = 0;
    var theClock;
    var correctResponse = 0;
    var incorrectResponse = 0;
    var unansweredResponse = 0;
    var triviaCounter = 30;
    var audio = new Audio('lastbattle.mp3');

    var questionArray = ["Which of these Pokemon did Ash never evolve to its final evolution?",
        "What is the MINIMUM number of HM's required in order to complete the game in Pokemon Red/Blue Version?",
        "Which move has the LOWEST accuracy?",
        "Which of these is NOT a water type gym leader?",
        "Which of these type combinations do not exist (to date of Sun and Moon's release)?",
        "Fallarbor Town is located in which region",
        "Who was the first female champion?",
        "Which move does the MOST damage?",
        "Given that a Raichu and a Diglett have the same stats and ability (not going to happen), who would do more damage to an identical enemy Pokemon when using Dig?",
        "Which Pokemon is NOT on Champion Blue's team no matter which starter you pick (Red/Blue Version)?"];

    var choiceA = ["Chikorita",
        "0",
        "Sing",
        "Marlon",
        "Fighting/Flying",
        "Kalos",
        "Lana",
        "Explosion",
        "Raichu cannot learn Dig",
        "Alakazam"];

    var choiceB = ["Treecko",
        "2",
        "Blizzard",
        "Cress",
        "Bug/Psychic",
        "Johto",
        "Cynthia",
        "Hyper Beam",
        "Raichu",
        "Arcanine"];

    var choiceC = ["Turtwig",
        "3",
        "Dynamic Punch",
        "Wallace",
        "Rock/Grass",
        "Sinnoh",
        "Iris",
        "Self Destruct",
        "Diglett",
        "Rhydon"];

    var choiceD = ["Fletchling",
        "4",
        "Smog",
        "Brycen",
        "Bug/Ghost",
        "Hoenn",
        "Diantha",
        "V-Create",
        "They would inflict the same amount of damage",
        "Pidgeot"];

    var imageArray = ["assets/images/ash-ketchum.jpeg",
        "assets/images/hm-image.jpg",
        "assets/images/missed-move.jpg",
        "assets/images/water-gym-leaders.png",
        "assets/images/bug-psychic.png",
        "assets/images/fallarbor-town.png",
        "assets/images/cynthia.png",
        "assets/images/explosion.png",
        "assets/images/raichu-dig.png",
        "assets/images/blue-champion.png"];

    var correctAnswers = ["A. Chikorita",
        "C. 3",
        "C. Dynamic Punch",
        "D. Brycen",
        "B. Bug/Psychic",
        "D. Hoenn",
        "B. Cynthia",
        "A. Explosion",
        "C. Diglett",
        "B. Arcanine"];

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////// Functions /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    function resetTrivia() {
        currentQuestion = 0;
        correctResponse = 0;
        incorrectResponse = 0;
        unansweredResponse = 0;
        triviaCounter = 30;
        triviaQuestion;
        timerWrapper();
    }

    function results() {
        $(".mainArea").html("<p> " + "<img class='center-block body-image' src='assets/images/raichu-dig.png'>" + "</p>" +
            "<p class='text-center'>All done, here's how you did! </p><hr>" +
            "<p class='text-center'>Correct Answers: " + correctResponse + "</p>" +
            "<p class='text-center'>Wrong Answers: " + incorrectResponse + "</p>" +
            "<p class='text-center'>Unanswered: " + unansweredResponse + "</p>" +
            "<p class='text-center reset-button-container'> " +
            "<a class='btn  btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset Trivia</a></p>");
    }

    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (triviaCounter === 0) {
                clearInterval(theClock);
                outOfTime();
            }
            if (triviaCounter > 0) {
                triviaCounter--;
            }
            $(".timer").html(triviaCounter + " Seconds");
        }
    }

    function wait() {
        if (currentQuestion < (questionArray.length - 1)) {
            currentQuestion++;
            triviaQuestion;
            triviaCounter = 30;
            timerWrapper();
        }
        else {
            results();
        }
    }

    function triviaQuestion {
        $(".mainArea").html("<p class='text-center timerFormat'>Time Remaining: <span class='timer'>30 Seconds</span></p><p class='text-left'>" +
            questionArray[currentQuestion] +
            "</p><hr><p class='first-answer answer'>A. " + choiceA[currentQuestion] + "<hr></p>" +
            "<p class='answer'>B. " + choiceB[currentQuestion] + "<hr></p>" +
            "<p class='answer'>C. " + choiceC[currentQuestion] + "<hr></p>" +
            "<p class='answer'>D. " + choiceD[currentQuestion] + "<hr></p>");
    }

    function correctChoice() {
        correctResponse++;
        $(".mainArea").html(
            "<p class='text-center'>Correct!</p><p class='text-center'>The answer is: " + correctAnswers[currentQuestion] +
            "</p>" + "<img class='center-block body-image' src='" + imageArray[currentQuestion] + "'>");
        setTimeout(wait, 5000);
    }

    function incorrectChoice() {
        incorrectResponse++;
        $(".mainArea").html(
            "<p class='text-center'>Nope!</p><p class='text-center'>The correct answer was: " + correctAnswers[currentQuestion] +
            "</p>" + "<img class='center-block body-image' src='assets/images/ash-faint.jpg'>");
        setTimeout(wait, 5000);
    }

    function outOfTime() {
        unansweredResponse++;
        $(".mainArea").html(
            "<p class='text-center timerFormat'>Time Remaining: <span class='timer'>" + triviaCounter + "  sec.</span></p>" +
            "<p class='text-center'>You ran out of time!</p><p class='text-center'>The correct answer was: " + correctAnswers[currentQuestion] + "</p>" +
            "<img class='center-block body-image' src='assets/images/onix-pokemon-meme.jpg'>");
        setTimeout(wait, 5000);
    }

    $("body").on("click", ".reset-button", function (event) {
        resetTrivia();
    });

    $("body").on("click tap", ".answer", function (event) {
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[currentQuestion]) {
            clearInterval(theClock);
            correctChoice();
        }
        else {
            clearInterval(theClock);
            incorrectChoice();
        }
    });

    var x = document.getElementById("myAudio");

    function playAudio() {
        x.play();
    }

    function pauseAudio() {
        x.pause();
    }

    $("body").on("click", ".pause-button", function (event) {
        pauseAudio();
    });

    $("body").on("click", ".start-button", function (event) {
        event.preventDefault();
        triviaQuestion;
        timerWrapper();
        playAudio();
    });

    function startTrivia() {
        $(".mainArea").html("<p class='text-center'>" +
            "<p class='text-center'>So you want to be a Pokemon master? </p>" +
            "</p><img class='center-block body-' src='assets/images/pokeball.png'></p>" +
            "<a class='btn btn-primary btn-lg btn-block start-button main-button-container' href='#' role='button'>Start Trivia</a></p>");
    }

    startTrivia();

});