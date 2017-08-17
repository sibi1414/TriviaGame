var gameQuestions = [
	//Question 1 
	question1 = {
		question: '<p class="text-center">How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?</p>',
		correctAnswer: 'HE EATS GILLYWEED',
		incorrectPossiblities: ['HE KISSES A MERMAID', 'HE TRANSFIGURES INTO A SHARK', 'HE PERFORMS A BUBBLE-HEAD CHARM'],
		gif: '<img src="assets/images/gillyweed.jpg">'
	},
	question2 = {
		question: '<p class="text-center">Which of these is NOT one of the Unforgivable Curses?</p>',
		correctAnswer: 'SECTUMSEMPRA',
		incorrectPossiblities: ['CRUCIATUS CURSE', 'IMPERIUS CURSE', 'AVADA KEDAVRA'],
		gif: '<img src="assets/images/curse.gif">'
	},
	question3 = {
		question: '<p class="text-center">Who guards the entrance to the Gryffindor common room?</p>',
		correctAnswer:'THE FAT LADY',
		incorrectPossiblities: ['THE GREY LADY', 'THE FAT FRIAR', 'THE BLOODY BARON'],
		gif: '<img src="assets/images/fatlady.gif">'
	},
	question4 = {
		question: '<p class="text-center">Who is NOT a member of the Order of the Phoenix?</p>',
		correctAnswer:'CORNELIUS FUDGE',
		incorrectPossiblities: ['MAD-EYE MOODY', 'PROFESSOR SNAPE', 'REMUS LUPIN'],
		gif: '<img src="assets/images/fudge.gif">'
	},
	question5 = {
		question: '<p class="text-center">Who played Harry Potter in the movies?</p>',
		correctAnswer:'DANIEL RADCLIFFE',
		incorrectPossiblities: ['KIERAN CULKIN', 'RUPERT GRINT', 'TYLER HOECHLIN'],
		gif: '<img src="assets/images/harry.gif">'
	},
	question6 = {
		question: '<p class="text-center">A wizard who cannot do magic is known as a:</p>',
		correctAnswer:'SQUIB',
		incorrectPossiblities: ['BLEAKER', 'DUDDLE', 'WIZONT'],
		gif: '<img src="assets/images/squib.gif">'
	},
	question7 = {
		question: '<p class="text-center">Where does Hermione brew her first batch of Polyjuice Potion?</p>',
		correctAnswer:'MOANING MYRTLES BATHROOM',
		incorrectPossiblities: ['THE HOGWARTS KITCHEN', 'THE ROOM OF REQUIREMENT', 'THE GRYFFINDOR COMMON ROOM'],
		gif: '<img src="assets/images/MYRTLES.gif">'
	},
	question8 = {
		question: '<p class="text-center">What does one say to close the Marauders Map and make it blank again?</p>',
		correctAnswer:'MISCHIEF MANAGED',
		incorrectPossiblities: ['NOTHING TO SEE HERE', 'ALL DONE', 'HELLO PROFESSOR'],
		gif: '<img src="assets/images/map.gif">'
	},
	question9 = {
		question: '<p class="text-center">The three kinds of balls used in Quidditch are Bludgers, Snitches, and...</p>',
		correctAnswer:'QUAFFLES',
		incorrectPossiblities: ['WIFFLES', 'BOCCIS', 'FOOZLES'],
		gif: '<img src="assets/images/quaffles.gif">'
	},
	question10 = {
		question: '<p class="text-center">From what Kings Cross platform does the Hogwarts Express leave?</p>',
		correctAnswer:'NINE AND THREE QUARTERS',
		incorrectPossiblities: ['ELEVENTEEN', 'EIGHT AND ONE QUARTER', 'FIVE AND A HALF'],
		gif: '<img src="assets/images/train.gif">'
	},
]
var gameStatistics = {
	
	correctAnswerCounter : 0,
	totalQuestionCounter: gameQuestions.length,
	timer: 15,
	questionNumber: 0,
	unansweredCounter: 0,
	incorrectAnswerCounter: 0,
}

var resettableCounter;
// Randomize the order of the potential answers.
$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};
// Displays if you run out of time.
function outOfTime() {
	$('#display').html('<p class = "text-center" id = "timeOut">Out of time!</p>');
	$('#display').append('<p class="text-center">The correct answer was: ' + gameQuestions[gameStatistics.questionNumber].correctAnswer);
	displayGif(gameStatistics.questionNumber)
	gameStatistics.unansweredCounter++;
};
// Displays the time, run every second.
function countDown() {
	gameStatistics.timer--;
	$('#timerDiv').html('<h3 id="timer" class="text-center"> Time remaining: </span>' + gameStatistics.timer + '<br />');
	if(gameStatistics.timer === 0)
		outOfTime();

}
// Displays the question and answers.
function displayQuestion(index) {
	// Reset timer for any new question.

	gameStatistics.timer = 15;
	$('#display').html(gameQuestions[index].question);
	var list = $('<ul></ul>');
	for (var j = 0; j<3; j++)
		list.append('<li class ="incorrect text-center">' + gameQuestions[index].incorrectPossiblities[j]+ '</li>');
	list.append('<li id = "answer" class ="text-center">' + gameQuestions[index].correctAnswer + '</li>');
	list = $(list).randomize();
	$("#display").append(list);
	$('#timerDiv').html('<h3 class="text-center" id="timer"> Time remaining: </span>' + gameStatistics.timer + '<br />');
	resettableCounter = setInterval(countDown,1000);
	$('#answer').click(function() {
		rightAnswer(index);
		displayGif(index);
	});
	$('.incorrect').click(function() {
		console.log('hey');
		wrongAnswer(index);
		displayGif(index);
	});

};
// Right answer function is run when the right answer is clicked.
function rightAnswer(index) {
	$('#display').html('<p class="text-center">Correct!</p>');
	gameStatistics.correctAnswerCounter++;
};
//Wrong answer function when wrong answer is clicked.
function wrongAnswer(index) {
	$('#display').html('<p class="text-center">Wrong!</p>');
	$('#display').append('<p class="text-center">The correct answer was: ' + gameQuestions[gameStatistics.questionNumber].correctAnswer);
	gameStatistics.incorrectAnswerCounter++;
}
// Display the gif for the answer.
function displayGif(index) {
	clearInterval(resettableCounter);
	$('#display').append(gameQuestions[index].gif);
	gameStatistics.questionNumber++;
	// If there is another question display it after 3 seconds. If not, display the score.
	if(gameStatistics.questionNumber<gameStatistics.totalQuestionCounter) {
		setTimeout(function() {
			displayQuestion(gameStatistics.questionNumber);
		},3000);
	} else {
		setTimeout(finalDisplay,3000);
	}
}
// Display score and give option for restart of game.
function finalDisplay() {
	$('#display').html("<h2 class='text-center'>Let's see how you did!</h2>")
	$('#display').append('<h2 class="text-center">Correct Answers: ' + gameStatistics.correctAnswerCounter + '</p>'
		+ '<h2 class="text-center">Inorrect Answers: ' + (gameStatistics.incorrectAnswerCounter) + '</p>'
		+ '<h2 class="text-center">Unanswered: ' + gameStatistics.unansweredCounter + '</p>'
		+ '<button class="btn-primary btn-lg center-block" id="restartButton">Restart Game</button>');

	$('#restartButton').click(function() {
		restartPage();
	})
}

function restartPage() {
	gameStatistics.questionNumber = 0;
	gameStatistics.correctAnswerCounter = 0;
	gameStatistics.incorrectAnswerCounter = 0;
	gameStatistics.unansweredCounter = 0;
	$('#timerDiv').empty();
	$('#display').html("<button class = 'btn-primary btn-lg center-block' id = 'startButton'>Start</button>");
	$('#startButton').click(function() {
		displayQuestion(gameStatistics.questionNumber)
	});
}

$('#startButton').click(function() {
	displayQuestion(gameStatistics.questionNumber)
	

});
