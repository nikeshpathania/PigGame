/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundsScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    // Random Number
    var dice = Math.floor(Math.random()*6) + 1;

    // display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';

    //update round score if it was not rolls 1
    if (dice !== 1) {
      roundsScore = roundsScore + dice;
      document.querySelector('#current-' + activePlayer).textContent = roundsScore;

    } else {
      // Next Player
      nextPlayer();

    }
  }
  
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying) {
    // Assign Globle Score
    scores[activePlayer] += roundsScore;

    // Update Score in UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


    // Add Final Score in Input
    var input = document.querySelector('.final-score').value;

      var winningScore;

      if (input) {
        winningScore = input;
        defaultInputScore = input;
      } else {
        winningScore = 100;
      }
    finalScore();
    // Check and declare winning

    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying =  false;
    } else {
      nextPlayer();
    }
  }
});

function finalScore() {
  
  document.querySelector('.final-score').addEventListener('blur', function(){
  
    var currentInput = this.value;

    var max = scores.reduce(function(a, b) {
      return Math.max(a, b);
    });

    if (max >= currentInput) {
      this.value =  defaultInputScore;
      alert('Value is Not allowed! Please add Value >' + max);
    } 
  });
}



function nextPlayer() {
  // Next Player
  activePlayer === 0? activePlayer = 1 : activePlayer = 0;
  roundsScore = 0;
  
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';   
  document.querySelector('.dice').style.display = 'none';
  
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0,0];
  roundsScore = 0;
  activePlayer = 0;
  defaultInputScore = 0;

  gamePlaying =  true;
  
  
  document.querySelector('.dice').style.display = 'none';
  
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.final-score').value = '';

  
  document.querySelector('#name-0').textContent = 'Player1';
  document.querySelector('#name-1').textContent = 'Player2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

/// document.getElementById('current-' + activePlayer).textContent = dice;
