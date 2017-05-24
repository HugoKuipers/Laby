"use strict";
// var randomOperator = function() {
//   switch (Math.floor(Math.random()*3)) {
//     case 0:
//       return '+';
//       break;
//     case 1:
//       return '-';
//       break;
//     case 2:
//       return '*';
//       break;
//   };
// };

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
  askProblem = askProblem + " " + "=";
  createInputNum("","",0);
  document.getElementById("submitinput").onclick = function() {
    if(parseInt(document.getElementById("inputnum").value) === answerProblem) {
      correctProblem = 1;
    }
    else {
      correctProblem = 2;
    };
    ableMove(true);
    events();
    while (forms.firstChild) {
      forms.removeChild(forms.firstChild);
    };
  };
};

var solveXproblem = function(a,b,c) {
  a = Math.floor(Math.random()*10);
  b = Math.floor(Math.random()*20);
  c = Math.floor(Math.random()*10);
  switch (Math.floor(Math.random()*2)) {
    case 0:
      var sign1 = "+";
      break;
    case 1:
      var sign1 = "-";
      break;
  };
  switch (Math.floor(Math.random()*2)) {
    case 0:
      var sign2 = "+";
      break;
    case 1:
      var sign2 = "-";
      break;
  };
  switch (Math.floor(Math.random()*2)) {
    case 0:
      var sign3 = "";
      break;
    case 1:
      var sign3 = "-";
      break;
  };
  askProblem = "X\xB2" + " " + sign1 + " " + a + "X" + " " + sign2 + " " + b + " " + "=" + " " + sign3 + c;
  let newb = parseInt(sign2+b) - parseInt(sign3+c);
  let newa = parseInt(sign1+a);
  let range = Math.max(Math.sqrt(newa*newa), Math.sqrt(newb*newb));
  var possibleSolve = false;
  for(var i = -range; i <= range; i++) {
    var f = i;
    var e = newa - f;
    if(newb === e*f) {
      answerProblem1 = -e;
      answerProblem2 = -f;
      possibleSolve = true;
    };
  };
  if(possibleSolve === false) {
    solveXproblem();
  }
  else {
    askProblem += "<br>Find both solutions for X";
    createInputNum("","",0);
    createExtraNum("","",0);
    document.getElementById("submitinput").onclick = function() {
      if(((parseInt(document.getElementById("inputnum").value) === answerProblem1) && (parseInt(document.getElementById("inputnum2").value) === answerProblem2)) || ((parseInt(document.getElementById("inputnum").value) === answerProblem2) && (parseInt(document.getElementById("inputnum2").value) === answerProblem1))) {
        correctProblem = 1;
      }
      else {
        correctProblem = 2;
      };
      ableMove(true);
      events();
      while (forms.firstChild) {
        forms.removeChild(forms.firstChild);
      };
    };
  };
};
