$(document).ready(function() {
    $("body").css({
        "background": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        "animation": "gradient 3s ease infinite"
    });

    $("<style>")
        .prop("type", "text/css")
        .html("@keyframes gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }")
        .appendTo("head");

    var questions = [
        { question: "What is the most popular board game of all time?", answers: ["Chess", "Monopoly", "Scrabble", "Risk"], correctAnswer: "Chess" },
        { question: "Released in 1992, what is the best selling soundtrack album of all time?", answers: ["Titanic", "The Bodyguard", "Frozen", "The Lion King"], correctAnswer: "The Bodyguard" },
        { question: "What is the name for trees that never lose their leaves?", answers: ["Deciduous", "Evergreen", "Coniferous", "Broadleaf"], correctAnswer: "Evergreen" },
        { question: "Approximately 2% of all people have what eye color?", answers: ["Blue", "Green", "Brown", "Gray"], correctAnswer: "Green" },
        { question: "What is the oldest city in the United States?", answers: ["New York", "Boston", "St. Augustine", "Philadelphia"], correctAnswer: "St. Augustine" },
        { question: "Who is the only athlete ever to play in a Super Bowl and a World Series?", answers: ["Bo Jackson", "Deion Sanders", "Michael Jordan", "Tim Tebow"], correctAnswer: "Deion Sanders" },
        { question: "What year was the very first model of the iPhone released?", answers: ["2005", "2007", "2008", "2010"], correctAnswer: "2007" },
        { question: "What is often seen as the smallest unit of memory?", answers: ["Megabyte", "Gigabyte", "Kilobyte", "Terabyte"], correctAnswer: "Kilobyte" },
        { question: "Who discovered penicillin?", answers: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Robert Koch"], correctAnswer: "Alexander Fleming" },
        { question: "Which planet is the hottest in the solar system?", answers: ["Mars", "Venus", "Mercury", "Jupiter"], correctAnswer: "Venus" }
    ];
    
    var currentQuestion = 0;
    var score = 0;
    var timer;
    var timeLeft;
    
    function countdown() {
        if(timeLeft <= 0) {
            clearInterval(timer);
            $("#result").text("Time's up! The answer was incorrect.");
            score--; // decrement the score
            if(score < 0) {
                score = 0; // prevent score from going negative
            }
            if(currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            }
        } else {
            $('#countdown').text(timeLeft + ' seconds remaining');
            timeLeft--;
        }
    }
    
    function loadQuestion() {
        clearTimeout(timer); // clear any existing timer
        
        $("#question-container").empty();
        
        var question = questions[currentQuestion];
        
        $("#question-container").append("<h2>" + question.question + "</h2>");
        
        for(var i = 0; i < question.answers.length; i++) {
            $("#question-container").append("<p class='answer'>" + question.answers[i] + "</p>");
        }
        
        timeLeft = 30; // reset time left
        timer = setInterval(countdown, 1000); // start new timer
    
        $(".answer").click(function() {
            clearTimeout(timer); // stop the timer when an answer is clicked
            
            $(".answer").off("click");
            
            if($(this).text() == question.correctAnswer) {
                $(this).addClass("correct");
                $("#result").text("Correct!");
                score++;
            } else {
                $(this).addClass("incorrect");
                $("#result").text("Incorrect! The correct answer was "+question.correctAnswer);
            }

            // Add a Next button to proceed to the next question
            $("#question-container").append("<button id='next'>Next</button>");

            $("#next").click(function() {
                if(currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    loadQuestion();
                }
            });
            
        });
    }

    loadQuestion();
});
