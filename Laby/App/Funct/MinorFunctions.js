"use strict";
var fourNumberProblem = function(x) {
  let a = Math.ceil(Math.random()*x);
  let b = Math.ceil(Math.random()*x);
  let c = Math.ceil(Math.random()*x);
  let d = Math.ceil(Math.random()*x);
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
  askProblem = askProblem + " =";
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
var solveXproblem = function(x) {
  a = Math.floor(Math.random()*x);
  b = Math.floor(Math.random()*2*x);
  c = Math.floor(Math.random()*x);
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
var multipleEquations = function(n, x) {
  var equationVariables = {};
  var equationAnswers = [];
  var startVariableCode = 65;
  var checkDubbelEquations = [];
  askProblem = "";
  for(var i = 0; i < n; i++) {
    switch (Math.floor(Math.random()*2)) {
      case 0:
        var tempSign = "";
        break;
      case 1:
        var tempSign = "-";
        break;
    };
    var tempNumber = Math.floor(Math.random()*x);
    equationVariables[String.fromCharCode(startVariableCode + i)] = parseInt(tempSign+tempNumber);
  };
  for(var i = 0; i < n; i++) {
    switch (Math.floor((Math.random()*10)/4)) {
      case 0:
        var tempNumber = Math.floor(Math.random()*x);
        var tempNumberPrint = tempNumber;
        var tempSaveRandom = Math.floor(Math.random()*n);
        while(tempSaveRandom === i) {
          tempSaveRandom = Math.floor(Math.random()*n);
        };
        var tempCompare = equationVariables[String.fromCharCode(startVariableCode + tempSaveRandom)];
        var tempComparePrint = String.fromCharCode(startVariableCode + tempSaveRandom);
        break;
      default:
        var tempSaveRandom = Math.floor(Math.random()*n);
        while(tempSaveRandom === i) {
          tempSaveRandom = Math.floor(Math.random()*n);
        };
        var tempNumber = equationVariables[String.fromCharCode(startVariableCode + tempSaveRandom)];
        var tempNumberPrint = String.fromCharCode(startVariableCode + tempSaveRandom);
        switch (Math.floor(Math.random()*3)) {
          case 0:
            var tempSaveRandom = Math.floor(Math.random()*n);
            while(tempSaveRandom === i) {
              tempSaveRandom = Math.floor(Math.random()*n);
            };
            var tempCompare = equationVariables[String.fromCharCode(startVariableCode + tempSaveRandom)];
            var tempComparePrint = String.fromCharCode(startVariableCode + tempSaveRandom);
            break;
          default:
            var tempCompare = Math.floor(Math.random()*x);
            var tempComparePrint = tempCompare;
            break;
        };
        break;
    };
    switch (Math.floor(Math.random()*4)) {
      case 0:
        var tempSign = "+";
        break;
      case 1:
        var tempSign = "-";
        break;
      case 2:
        var tempSign = "*";
        break;
      case 3:
        var tempSign = "/";
        if(tempNumber === 0) tempSign = "+";
        break;
    };
    if(tempSign === "*") {
      var tempTotal = equationVariables[String.fromCharCode(startVariableCode + i)] * tempNumber;
    }
    else if(tempSign === "/") {
      var tempTotal = equationVariables[String.fromCharCode(startVariableCode + i)] / tempNumber;
    }
    else if(tempSign === "+") {
      var tempTotal = parseInt(equationVariables[String.fromCharCode(startVariableCode + i)]) + parseInt(tempNumber);
    }
    else if(tempSign === "-") {
      var tempTotal = parseInt(equationVariables[String.fromCharCode(startVariableCode + i)]) - parseInt(tempNumber);
    };
    var tempEquals = "=";
    switch (Math.floor(Math.random()*4)) {
      case 0:
        var tempSign2 = "+";
        var tempFinal = tempTotal - tempCompare;
        if(tempFinal < 0) {
          tempFinal = tempFinal*-1;
          tempSign2 = "-";
        };
        break;
      case 1:
        var tempSign2 = "-";
        var tempFinal = tempCompare - tempTotal;
        if(tempFinal < 0) {
          tempFinal = tempFinal*-1;
          tempSign2 = "+";
        };
        break;
      case 2:
        if(tempCompare === 0) {
          var tempSign2 = "+";
          var tempFinal = tempTotal;
          if(tempFinal < 0) {
            tempFinal = tempFinal*-1;
            tempSign2 = "-";
          };
        }
        else {
          var tempSign2 = "*";
          var tempFinal = tempTotal / tempCompare;
        };
        break;
      case 3:
        var tempSign2 = "/";
        if(tempCompare === 0 && tempTotal === 0) {
          var tempFinal = Math.ceil(Math.random()*x);
        }
        else if(tempCompare === 0) {
          tempSign2 = "-";
          var tempFinal = tempCompare - tempTotal;
          if(tempFinal < 0) {
            tempFinal = tempFinal*-1;
            tempSign2 = "+";
          };
        }
        else if(tempTotal === 0) {
          tempSign2 = "*";
          var tempFinal = 0;
        }
        else {
          var tempFinal = tempCompare / tempTotal;
        };
        break;
    };
    if((tempFinal*1000) % 1 !== 0) {
      tempEquals = "\u2248";
      tempFinal = tempFinal.toString();
      var tempPointPlace = tempFinal.indexOf(".");
      if(parseInt(tempFinal[tempPointPlace+4]) > 4) {
        var tempFinalRoundUp = (parseInt(tempFinal[tempPointPlace+3]) + 1).toString();
        tempFinal = (tempFinal.substr(0, (tempPointPlace+3))) + tempFinalRoundUp;
      }
      else {
        tempFinal = tempFinal.substr(0, (tempPointPlace+4));
      };
    };
    var tempFinalPrint = tempFinal;
    for(var j = 0; j < n; j++) {
      if(tempFinal === equationVariables[String.fromCharCode(startVariableCode + j)]) {
        if((tempSign === tempSign2) && (j === i)) {
          tempFinalPrint = tempFinal;
        }
        else {
          tempFinalPrint = String.fromCharCode(startVariableCode + j);
        };
      };
    };
    var okayToProceed = true;
    for(var j = 0; j < checkDubbelEquations.length; j++) {
      if(tempTotal === checkDubbelEquations[j]) okayToProceed = false;
    };
    if(okayToProceed) {
      checkDubbelEquations[i] = tempTotal;
      equationAnswers[i] = String.fromCharCode(startVariableCode + i) + " " + tempSign + " " + tempNumberPrint + " " + tempEquals + " " + tempComparePrint + " " + tempSign2 + " " + tempFinalPrint;
      askProblem += equationAnswers[i] + "<br>";
    }
    else {
      i -= 1;
    };
  };
  askProblem += "Find the value of each variable, please enter your answers in order.";
  createInputNum("","",0);
  for(var i = 1; i < n; i++) {
    createExtraNum("","",0);
  }
  document.getElementById("submitinput").onclick = function() {
    var didOneRight = 0;
    if(parseInt(document.getElementById("inputnum").value) === equationVariables[String.fromCharCode(startVariableCode)]) {
      didOneRight += 1;
    };
    for(var i = 1; i < n; i++) {
      if(parseInt(document.getElementById("inputnum" + (i+1)).value) === equationVariables[String.fromCharCode(startVariableCode + i)]) {
        didOneRight += 1;
      };
    };
    if(didOneRight === n) {
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
