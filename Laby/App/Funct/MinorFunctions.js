"use strict";
var fourNumberProblem = function(a,b,c,d) {
  switch (Math.floor(Math.random()*3)) {
    case 0:
      var sign1 = "+";
      break;
    case 1:
      var sign1 = "-";
      break;
    case 2:
      var sign1 = "*";
      break;
  };
  switch (Math.floor(Math.random()*3)) {
    case 0:
      var sign2 = "+";
      break;
    case 1:
      var sign2 = "-";
      break;
    case 2:
      var sign2 = "*";
      break;
  };
  switch (Math.floor(Math.random()*3)) {
    case 0:
      var sign3 = "+";
      break;
    case 1:
      var sign3 = "-";
      break;
    case 2:
      var sign3 = "*";
      break;
  };
  askProblem = a + " " + sign1 + " " + b + " " + sign2 + " " + c + " " + sign3 + " " + d;
  answerProblem = eval(askProblem);
};

var solveXproblem = function() {
  
};
