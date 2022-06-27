import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function Question(correctAnswer) {
  this.correctAnswer = correctAnswer;
  this.score = 0;
}

$(document).ready(function() {

  let question = new Question(0);

  $(".category").click(function(event) {
    event.preventDefault();
    $("#question-card-1").slideDown();
    $("#answer-card-1").slideUp();

    const category = event.target.value;
    let request = new XMLHttpRequest;
    const url = `https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`;
    

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      let testQuestion = response.results[0].question;
      const correct = response.results[0].correct_answer;
      let testAnswers = [response.results[0].correct_answer, response.results[0].incorrect_answers[0], response.results[0].incorrect_answers[1], response.results[0].incorrect_answers[2]];
      const shuffledArray = testAnswers.sort(() => 0.5 - Math.random());


      for(let i=0; i<shuffledArray.length; i++) {
        if(shuffledArray[i] === correct) {
          question.correctAnswer = i;
          break;
        }
      }

      $("#question-1").html(testQuestion);
      $("#answer-1").html(shuffledArray[0]);
      $("#answer-2").html(shuffledArray[1]);
      $("#answer-3").html(shuffledArray[2]);
      $("#answer-4").html(shuffledArray[3]);
      $("#correct-answer").html(correct);

      return shuffledArray;
    }
    
    $('input').prop('checked', false);

   
  });

  function checkAnswer() {
    const answer = parseInt($("input:radio[name=card-1]:checked").val());
    if(answer === question.correctAnswer) {
      question.score++;
      console.log(question.score);
      console.log("truth");
    }
  }

  $("#question-card-1").click(function() {
    checkAnswer();
    $("#question-card-1").slideToggle();
    $("#answer-card-1").slideToggle();
  });

 

  $("input[type=radio]").click(function(event) {
    event.stopPropagation();
  });

  $("label").click(function(event) {
    event.stopPropagation();
  });

});