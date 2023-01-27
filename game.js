

var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userChosenColour = [];
var started = false;
var level = 0;

$(window).keypress(function() {
  level = 0;
  if (!started) {
    $('#level-title').text('level ' + level);
    gamePattern.length = 0;
    userChosenColour.length = 0;
    nextSequence();
    started = true;
  } 
})

$('.btn').click(function() {
  var self = $(this).addClass('pressed');
  setTimeout(function () {
    self.removeClass('pressed');
  }, 100)
  var self = $(this);
  var selfId = self.attr('id');
  music(selfId);
  animatePress($(this));
  userChosenColour.push(selfId);
  
  checkAnswer(userChosenColour.length-1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenColour[currentLevel]){
    
    if (gamePattern.length === userChosenColour.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    wrongMusic();
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    started = false;
  }
}

function nextSequence() {
  userChosenColour = [];
  level++;
  $('#level-title').text('level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  music(randomChosenColour);
  gamePattern.push(randomChosenColour);
  animatePress($('#' + randomChosenColour));
}

function animatePress(animate) {
  animate.fadeOut(100).fadeIn(100);
}

function music(currentMusic) {
  var audio = new Audio('sounds/' + currentMusic + '.mp3');
  audio.play();
}

function wrongMusic() {
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
}

