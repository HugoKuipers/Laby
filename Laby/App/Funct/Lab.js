"use strict";
var setPlayer = function() {
  player = {
    x: Math.floor(labyrinth.width/2),
    y: labyrinth.height-1,
    life: 5,
    gold: 0,
    luck: 0,
    dmg: 1,
    def: 1,
    sight: 1,
    inventory: [],
    equipment: {
      head: {},
      amulet: {},
      torso: {},
      rightHand: {},
      leftHand: {},
      legs: {},
      feet: {}
    },
    points: 0,
    depth: 1
  };
  attackAmount = 0;
  deadGobPotTry = 0;
  changeInventory("Cartography Tool");
}
var setMinotaur = function() {
  minotaur = {
    x: prev2CellsNr,
    y: prev2RowsNr,
    life: 2,
    power: 2,
    gold: Math.floor(Math.random()*51+25)
  };
  if(difficulty === "normal") {
    minotaur.x = prev3CellsNr;
    minotaur.y = prev3RowsNr;
    minotaur.life = 4;
    minotaur.power = 4;
    minotaur.gold = Math.floor(Math.random()*51+50)
  }
  else if(difficulty === "hard") {
    minotaur.x = prev4CellsNr;
    minotaur.y = prev4RowsNr;
    minotaur.life = 6;
    minotaur.power = 6;
    minotaur.gold = Math.floor(Math.random()*51+80)
  };
};

var m = function(text) {
  if(prevM !== "") {
    prevMessage.innerHTML = "(Previous message)<br>" + prevM;
  }
  else {
    prevMessage.innerHTML = prevM;
  };
  prevM = text;
  if(text === message.innerHTML && text !== "") {
    message.innerHTML = "(New message)<br>" + text;
  }
  else if("(New message)<br>" + text === message.innerHTML) {
    message.innerHTML = "(Same message, again)<br>" + text;
  }
  else if("(Same message, again)<br>" + text === message.innerHTML) {
    message.innerHTML = "(The same again, really?)<br>" + text;
  }
  else if("(The same again, really?)<br>" + text === message.innerHTML) {
    message.innerHTML = "(We're gonna start fresh again)<br>" + text;
  }
  else {
    message.innerHTML = text;
  };
  y("");
};
var a = function(text) {
  if(prevA !== "") {
    prevAlert.innerHTML = "(Previous alert)<br>" + prevA;
  }
  else {
    prevAlert.innerHTML = prevA;
  };
  prevA = text;
  if(text === alert.innerHTML && text !== "") {
    alert.innerHTML = "(New alert)<br>" + text;
  }
  else if("(New alert)<br>" + text === alert.innerHTML) {
    alert.innerHTML = "(Same alert, again)<br>" + text;
  }
  else if("(Same alert, again)<br>" + text === alert.innerHTML) {
    alert.innerHTML = "(The same again, really?)<br>" + text;
  }
  else if("(The same again, really?)<br>" + text === alert.innerHTML) {
    alert.innerHTML = "(We're gonna start fresh again)<br>" + text;
  }
  else {
    alert.innerHTML = text;
  };
};
var y = function(text) {
  itemText.innerHTML = text;
};

var cancelThisFunction = function() {
  if(cancelNextFunction !== 0) {
    cancelNextFunction -= 1;
    return true;
  };
};
var justWalkAway = function(walk) {
  ableMove(walk);
  document.getElementById("submitinput").disabled = walk;
  if(walk) {
    if(!beforeMoveFunctions["removeInputOpt"]) {
      beforeMoveFunctions["removeInputOpt"] = function(xy, posmin) {
        while (forms.firstChild) {
          forms.removeChild(forms.firstChild);
        };
        delete beforeMoveFunctions["removeInputOpt"];
      };
    };
  }
  else {
    if(beforeMoveFunctions["removeInputOpt"]) {
      delete beforeMoveFunctions["removeInputOpt"];
    };
  };
};

var createInputNum = function(min, max, start) {
  var form = document.createElement("form");
  var input = document.createElement("input");
  input.type = "number";
  input.min = min;
  input.max = max;
  input.value = start;
  input.step = 1;
  input.id = "inputnum";
  input.className = "numbutton";
  var submitInput = document.createElement("button");
  submitInput.type = "button";
  submitInput.innerHTML = "Go!";
  submitInput.id = "submitinput";
  form.appendChild(input);
  form.appendChild(submitInput);
  forms.appendChild(form);
};
var createExtraNum = function(min, max, start) {
  var input = document.createElement("input");
  input.type = "number";
  input.min = min;
  input.max = max;
  input.value = start;
  input.step = 1;
  input.id = "inputnum" + (forms.firstChild.childNodes.length);
  input.className = "numbutton";
  forms.firstChild.insertBefore(input, forms.firstChild.lastChild);
};
var createInputOpt = function(n, selected, place, id) {
  ableMove(false);
  var form = document.createElement("form");
  var submitInput = document.createElement("button");
  for(var i in n) {
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.value = n[i];
    radio.id = n[i];
    radio.checked = false;
    radio.name = "choice";
    if(n.includes("Just walk away")) {
      if(n[i] === "Just walk away") {
        radio.onclick = function() {
          justWalkAway(true);
        };
      }
      else {
        radio.onclick = function() {
          justWalkAway(false);
        };
      };
    };
    var label = document.createElement("label");
    label.htmlFor = n[i];
    label.innerHTML = n[i] + "<br>";
    form.appendChild(radio);
    form.appendChild(label);
  };
  submitInput.type = "button";
  submitInput.innerHTML = "Go!";
  submitInput.id = "submitinput";
  form.appendChild(submitInput);
  place.appendChild(form);
  if(selected) document.getElementById(selected).checked = true;
  document.getElementById("submitinput").onclick = function() {
    var doneWithThisLoop = false;
    for(var i in n) {
      if(doneWithThisLoop === true) {
        return
      }
      else if(document.getElementById(n[i]).checked === true) {
        questionAnswer = n[i];
        doneWithThisLoop = true;
        while (place.firstChild) {
          place.removeChild(place.firstChild);
        };
        if(place === forms) {
          events();
        }
        else {
          useItemEvents(id);
        };
        ableMove(true);
        questionAnswer = "";
      };
    };
  };
};
var createContinueButton = function(text, id, noitems) {
  if(noitems) doNotUseThat = true;
  if(id) {
    var place = formsitems;
  }
  else {
    place = forms;
  };
  var goOn =  document.createElement("button");
  goOn.innerHTML = text;
  goOn.id = "goOn";
  goOn.type = "button";
  goOn.onclick = function() {
    doNotUseThat = false;
    while (place.firstChild) {
      place.removeChild(place.firstChild);
    };
    if(id) {
      useItemEvents(id);
    }
    else {
      events();
    };
  };
  place.appendChild(goOn);
};

var addKeyEvent = function(id) {
  laby.rows[size - 1].cells[player.x].className = "path";
  rowsNr = Math.floor(Math.random()*size);
  cellsNr = Math.floor(Math.random()*labyrinth.width);
  newEventLocation = laby.rows[rowsNr].cells[cellsNr];
  if(rowsNr === size - 1 || cellsNr === player.x || rowsNr === prevRowsNr || cellsNr === prevCellsNr || rowsNr === prev2RowsNr || cellsNr === prev2CellsNr || rowsNr === prev3RowsNr || cellsNr === prev3CellsNr) {
    addKeyEvent(id);
  }
  else {
    newEventLocation.className = "path";
    newEventLocation.id = id;
    prev4RowsNr = prev3RowsNr;
    prev4CellsNr = prev3CellsNr;
    prev3RowsNr = prev2RowsNr;
    prev3CellsNr = prev2CellsNr;
    prev2RowsNr = prevRowsNr;
    prev2CellsNr = prevCellsNr;
    prevRowsNr = rowsNr;
    prevCellsNr = cellsNr;
  };
};

var createOnePath = function(goalRows, goalCells) {
  while(rowsStart !== goalRows || cellsStart !== goalCells) {
    if(Math.floor(Math.random()*2) === 0) {
      if(rowsStart > goalRows) {
        rowsStart -= 1;
        laby.rows[rowsStart].cells[cellsStart].className = "path";
      }
      else if(rowsStart < goalRows) {
        rowsStart += 1;
        laby.rows[rowsStart].cells[cellsStart].className = "path";
      };
    }
    else {
      if(cellsStart > goalCells) {
        cellsStart -= 1;
        laby.rows[rowsStart].cells[cellsStart].className = "path";
      }
      else if(cellsStart < goalCells) {
        cellsStart += 1;
        laby.rows[rowsStart].cells[cellsStart].className = "path";
      };
    };
  };
};
var createPath = function() {
  for(var data in difficulty) {
    addKeyEvent(difficulty[data]);
  };
  rowsStart = size - 1;
  cellsStart = player.x;
  switch (difficulty.length) {
    case 2:
      var rowsTreasure = prev2RowsNr;
      var cellsTreasure = prev2CellsNr;
      var rowsKey = prevRowsNr;
      var cellsKey = prevCellsNr;
      createOnePath(rowsKey, cellsKey);
      createOnePath(rowsTreasure, cellsTreasure);
      break;
    case 3:
      var rowsTreasure = prev3RowsNr;
      var cellsTreasure = prev3CellsNr;
      var rowsKey1 = prev2RowsNr;
      var cellsKey1 = prev2CellsNr;
      var rowsKey2 = prevRowsNr;
      var cellsKey2 = prevCellsNr;
      createOnePath(rowsKey2, cellsKey2);
      createOnePath(rowsKey1, cellsKey1);
      createOnePath(rowsTreasure, cellsTreasure);
      break;
    case 4:
      var rowsTreasure = prev4RowsNr;
      var cellsTreasure = prev4CellsNr;
      var rowsKey1 = prev3RowsNr;
      var cellsKey1 = prev3CellsNr;
      var rowsKey2 = prev2RowsNr;
      var cellsKey2 = prev2CellsNr;
      var rowsKey3 = prevRowsNr;
      var cellsKey3 = prevCellsNr;
      createOnePath(rowsKey3, cellsKey3);
      createOnePath(rowsKey2, cellsKey2);
      createOnePath(rowsKey1, cellsKey1);
      createOnePath(rowsTreasure, cellsTreasure);
      break;
  };
};

var addEvent = function(id, idClass) {
  if(!id) {
    switch (difficulty.length) {
      case 2:
        var chance = "chanceEasy";
        var max = "maxEasy";
        break;
      case 3:
        var chance = "chanceNormal";
        var max = "maxNormal";
        break;
      case 4:
        var chance = "chanceHard";
        var max = "maxHard";
        break;
    };
    var greatestChance = 0;
    for(var data in jsonEvents) {
      if(greatestChance < jsonEvents[data][chance]) greatestChance = jsonEvents[data][chance];
    };
    var thresholdChance = Math.ceil(Math.random()*greatestChance);
    var thisEventPerhaps = Math.floor(Math.random()*(Object.keys(jsonEvents).length));
    if(jsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]][chance] >= thresholdChance) {
      if(changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]]) {
        if(changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]][max] === 0) {
          addEvent();
        }
        else {
          changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]][max] -= 1;
          id = changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]]["id"];
        };
      }
      else {
        var amountOfTilesPerc = (size*labyrinth.width)/100;
        changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]] = jsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]];
        if(changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]][max] === "justOne") {
          changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]][max] = 0;
          id = changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]]["id"];
        }
        else {
          changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]][max] = (Math.ceil(changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]][max] * amountOfTilesPerc)) - 1;
          id = changedJsonEvents[Object.keys(jsonEvents)[thisEventPerhaps]]["id"];
        };
      };
    }
    else {
      addEvent();
    };
  };
  if(id) {
    newEventLocation = laby.rows[Math.floor(Math.random()*size)].cells[Math.floor(Math.random()*labyrinth.width)];
    if(newEventLocation.id === "" && newEventLocation.className !== "wall" && newEventLocation.className !== "player") {
      newEventLocation.id = id;
      if(idClass) {
        newEventLocation.className += " " + idClass;
      };
      startCountingEvents = 0;
    }
    else {
      startCountingEvents += 1
      if(startCountingEvents > (size*labyrinth.width) + 100) {
        startCountingEvents = 0;
        return;
      };
      addEvent(id, idClass);
    };
  };
};

var setLabyrinth = function() {
  if(size % 2 === 0) {
    labyrinth.width = size - 1;
  }
  else {
    labyrinth.width = size;
  };
  labyrinth.height = size + 1;
  for (var i = 0; i < labyrinth.height; i++) {
    var createTr = laby.insertRow(i);
    for (var j = 0; j < labyrinth.width; j++) {
      createTr.insertCell(j);
    };
  };
  viewBox.style.display = "initial";
  visibleWidth = (($("#viewbox").width() - ($("#viewbox").width() % 83)) / 83);
  if (visibleWidth % 2 === 0) {
    if($(window).width()/20 + ($("#viewbox").width() % 83) > 100) {
      visibleWidth += 1;
    }
    else {
      visibleWidth -= 1;
    };
  };
  visibleHeight = (($("#viewbox").height() - ($("#viewbox").height() % 83)) / 83);
  if (visibleWidth % 2 === 0) {
    if($(window).width()/20 + ($("#viewbox").width() % 83) > 100) {
      visibleHeight += 1;
    }
    else {
      visibleHeight -= 1;
    };
  };
  if($("#viewbox").width() > $("#laby").width()) {
    $("#viewbox").css({
      width: $("#laby").width() + 4
    });
  }
  else {
    $("#viewbox").css({
      width: visibleWidth*83 + 1
    });
  };
  if($("#viewbox").height() > $("#laby").height()) {
    $("#viewbox").css({
      height: $("#laby").height() + 4
    });
  }
  else {
    $("#viewbox").css({
      height: visibleHeight*83 + 1
    });
  };
  setPlayer();
  laby.rows[player.y].cells[player.x].className = "player";
  laby.rows[player.y].cells[player.x].id = "entrance";
  document.getElementById("life").innerHTML = "Life: " + player.life;
  document.getElementById("gold").innerHTML = "Gold: " + player.gold;
  openInv.style.display = "initial";
  openSet.style.display = "initial";
  openChar.style.display = "initial";
  openMap.style.display = "initial";
  ableMove(true);
  for(var c = 0; c < player.x; c++) {
    laby.rows[labyrinth.height-1].cells[c].className = "wall";
    laby.rows[labyrinth.height-1].cells[labyrinth.width-1-c].className = "wall";
  };
  createPath();
  setMinotaur();
  laby.rows[minotaur.y].cells[minotaur.x].className = "hiddenminotaur";
  var amountOfEvents = Math.floor((size*labyrinth.width)*((Math.floor(Math.random()*21)*0.01)+0.4));
  for(var i = 0; i < amountOfEvents; i++) {
    addEvent();
  };
  var countFor = 0;
  var v = Math.floor((size*labyrinth.width)*((Math.floor(Math.random()*41)*0.01)+0.2));
  for(var w = 0; w < v; w++) {
    var newWallLocation = laby.rows[Math.floor(Math.random()*size)].cells[Math.floor(Math.random()*labyrinth.width)];
    if(newWallLocation.id === "" && newWallLocation.className !== "wall" && newWallLocation.className !== "path") {
      newWallLocation.className = "wall";
    }
    else {
      w -= 1
    };
    countFor += 1;
    if(countFor >= (size*labyrinth.width) + 100) w = size*labyrinth.width;
  };
  centerCamera();
  viewMap();
  clickMove();
};

var resetPage = function(clear) {
  inside = -1;
  document.getElementById("life").innerHTML = "";
  document.getElementById("gold").innerHTML = "";
  openInv.style.display = "none";
  openChar.style.display = "none";
  inventory.style.display = "none";
  character.style.display = "none";
  while (itemspace.firstChild) {
    itemspace.removeChild(itemspace.firstChild);
  };
  laby.innerHTML = "";
  ableMove(false);
  if(clear) {
    for(var i = 0; i < player.inventory.length; i++) {
      player.points += player.inventory[i].value;
    };
    player.points += player.gold;
  };
  editStats(clear);
};

var viewRow = function(l, kMin, kMax) {
  var locationIndex = ((laby.rows[player.y].rowIndex * labyrinth.width) + laby.rows[player.y].cells[player.x].cellIndex);
  for(var k = kMin; k < kMax; k++) {
    if(labyTd[locationIndex +(labyrinth.width*k) +l].classList.contains("wall")) {
      labyTd[locationIndex +(labyrinth.width*k) +l].style.backgroundColor = "rgb(28, 16, 4)";
      labyTd[locationIndex +(labyrinth.width*k) +l].style.border = "0.1em solid rgb(28, 16, 4)";
    };
    if(labyTd[locationIndex +(labyrinth.width*k) +l].classList.contains("hiddenminotaur") && labyTd[locationIndex +(labyrinth.width*k) +l].classList.contains("minotaur") === false) {
      labyTd[locationIndex +(labyrinth.width*k) +l].classList += " minotaur";
    };
  };
};
var viewMap = function() {
  while (innerMap.firstChild) {
    innerMap.removeChild(innerMap.firstChild);
  };
  for(var i = 0; i < minoClass.length; i++) {
    minoClass[0].classList.remove("minotaur");
  };
  if(laby.rows[player.y].rowIndex !== 0 && laby.rows[player.y].rowIndex !== size && laby.rows[player.y].cells[player.x].cellIndex !== 0 && laby.rows[player.y].cells[player.x].cellIndex !== labyrinth.width - 1) {
    for(var l = -player.sight; l < player.sight+1; l++) {
      viewRow(l, -player.sight, player.sight+1);
    };
  }
  else if(laby.rows[player.y].rowIndex === 0 && laby.rows[player.y].cells[player.x].cellIndex !== 0 && laby.rows[player.y].cells[player.x].cellIndex !== labyrinth.width - 1) {
    for(var l = -player.sight; l < player.sight+1; l++) {
      viewRow(l, 0, player.sight+1);
    };
  }
  else if(laby.rows[player.y].rowIndex === size) {
    for(var l = -player.sight; l < player.sight+1; l++) {
      viewRow(l, -player.sight, 1);
    };
  }
  else if(laby.rows[player.y].cells[player.x].cellIndex === 0 && laby.rows[player.y].rowIndex !== 0) {
    for(var l = 0; l < player.sight+1; l++) {
      viewRow(l, -player.sight, player.sight+1);
    };
  }
  else if(laby.rows[player.y].cells[player.x].cellIndex === labyrinth.width - 1 && laby.rows[player.y].rowIndex !== 0) {
    for(var l = -player.sight; l < 1; l++) {
      viewRow(l, -player.sight, player.sight+1);
    };
  };
    $("#innermap").html($("#laby").clone());
};
var centerCamera = function() {
  if(labyrinth.width > visibleWidth) {
    if(player.x <= Math.floor(visibleWidth/2)) {
      $("#visual").css({
        "left": -3
      });
      $("#viewbox").css({
        "border-left": "3px solid rgb(28, 16, 4)"
      });
    }
    else if(player.x >= labyrinth.width - Math.ceil(visibleWidth/2)) {
      $("#visual").css({
        "left": -(labyrinth.width - visibleWidth) * 83 - 3
      });
      $("#viewbox").css({
        "border-right": "3px solid rgb(28, 16, 4)"
      });
    }
    else {
      $("#visual").css({
        "left": -(player.x - Math.floor(visibleWidth/2)) * 83 - 3
      });
      $("#viewbox").css({
        "border-left": "3px solid rgb(125, 27, 142)",
        "border-right": "3px solid rgb(125, 27, 142)"
      });
    };
  };
  if(labyrinth.height > visibleHeight) {
    if(player.y <= Math.floor(visibleHeight/2)) {
      $("#visual").css({
        "top": -3
      });
      $("#viewbox").css({
        "border-top": "3px solid rgb(28, 16, 4)"
      });
    }
    else if(player.y >= labyrinth.height - Math.ceil(visibleHeight/2)) {
      $("#visual").css({
        "top": -(labyrinth.height - visibleHeight) * 83 - 3
      });
      $("#viewbox").css({
        "border-bottom": "3px solid rgb(28, 16, 4)"
      });
    }
    else {
      $("#visual").css({
        "top": -(player.y - Math.floor(visibleHeight/2)) * 83 - 3
      });
      $("#viewbox").css({
        "border-top": "3px solid rgb(125, 27, 142)",
        "border-bottom": "3px solid rgb(125, 27, 142)"
      });
    };
  };
};

var minoCheck = function(n) {
  if(laby.rows[minotaur.y].cells[minotaur.x] === laby.rows[player.y].cells[player.x]) {
    m("You are walking through a long and narrow corridor when you hear a wild snorting behind you, turning around you see the minotaur, the great beast of the labyrinth.");
    cancelNextFunction += n;
  };
};
var minoMove = function() {
  if(minotaur.life <= 0) return;
  minoCheck(2);
  if(cancelThisFunction()) return;
  var minoPrevX = minotaur.x;
  var minoPrevY = minotaur.y;
  var minoDir = Math.floor(Math.random()*4);
  if(minoDir === 0) {
    minotaur.y -= 1;
  }
  else if(minoDir === 1) {
    minotaur.x += 1;
  }
  else if(minoDir === 2) {
    minotaur.y += 1;
  }
  else if(minoDir === 3) {
    minotaur.x -= 1;
  };
  if(minotaur.x < 0 || minotaur.x >= labyrinth.width || minotaur.y < 0 || minotaur.y >= labyrinth.height || laby.rows[minotaur.y].cells[minotaur.x].className === "wall") {
    minotaur.x = minoPrevX;
    minotaur.y = minoPrevY;
  }
  else {
    laby.rows[minoPrevY].cells[minoPrevX].classList.remove("hiddenminotaur");
    laby.rows[minotaur.y].cells[minotaur.x].className += " hiddenminotaur";
  };
  minoCheck(1);
};

var beforeMoveFunctions = {};
var moveFunctions = {
  move: function(xy, posmin) {
    prevX = player.x;
    prevY = player.y;
    (posmin) ? player[xy] += 1 : player[xy] -= 1;
    if(player.x < 0 || player.x >= labyrinth.width || player.y < 0 || player.y >= labyrinth.height || laby.rows[player.y].cells[player.x].className === "wall") {
      a("You can't walk through walls!");
      player.x = prevX;
      player.y = prevY;
    }
    else {
      a("");
      laby.rows[prevY].cells[prevX].classList.remove("player");
      if($(laby.rows[prevY].cells[prevX]).hasClass("explored") === false) laby.rows[prevY].cells[prevX].className += " explored";
      laby.rows[player.y].cells[player.x].className += " player";
      clearTimeout(cancelableTimer);
      minoMove();
      centerCamera();
      viewMap();
      clickMove();
      events();
    };
  }
};
var randomMove = function(id) {
  prevX = player.x;
  prevY = player.y;
  laby.rows[prevY].cells[prevX].classList.remove("player");
  if($(laby.rows[prevY].cells[prevX]).hasClass("explored") === false) laby.rows[prevY].cells[prevX].className += " explored";
  player.x = Math.floor(Math.random()*labyrinth.width);
  player.y = Math.floor(Math.random()*size);
  if(laby.rows[player.y].cells[player.x].className === "wall" || laby.rows[player.y].cells[player.x] === laby.rows[prevY].cells[prevX]) {
    player.x = prevX;
    player.y = prevY;
    randomMove();
  }
  else {
    laby.rows[player.y].cells[player.x].className += " player";
    minoMove();
    viewMap();
    clickMove();
    createContinueButton("Explore your surroundings", id, true);
  };
};
var ableMove = function(bool) {
  for(var k = 0; k < document.getElementsByClassName("direction").length; k++) {
    document.getElementsByClassName("direction")[k].disabled = !bool;
  };
};

var clickMoveInner = function(up, right, down, left) {
  var locationIndex = ((laby.rows[player.y].rowIndex * labyrinth.width) + laby.rows[player.y].cells[player.x].cellIndex);
  if(up) {
    labyTd[locationIndex - labyrinth.width].onclick = function() {
      if(locationIndex !== (laby.rows[player.y].rowIndex * labyrinth.width) + laby.rows[player.y].cells[player.x].cellIndex) {
        return;
      }
      else{
        north.click();
      };
    };
  };
  if(right) {
    labyTd[locationIndex + 1].onclick = function() {
      if(locationIndex !== (laby.rows[player.y].rowIndex * labyrinth.width) + laby.rows[player.y].cells[player.x].cellIndex) {
        return;
      }
      else{
        east.click();
      };
    };
  };
  if(down) {
    labyTd[locationIndex + labyrinth.width].onclick = function() {
      if(locationIndex !== (laby.rows[player.y].rowIndex * labyrinth.width) + laby.rows[player.y].cells[player.x].cellIndex) {
        return;
      }
      else{
        south.click();
      };
    };
  };
  if(left) {
    labyTd[locationIndex - 1].onclick = function() {
      if(locationIndex !== (laby.rows[player.y].rowIndex * labyrinth.width) + laby.rows[player.y].cells[player.x].cellIndex) {
        return;
      }
      else{
        west.click();
      };
    };
  };
};
var clickMove = function() {
  if(laby.rows[player.y].rowIndex === 0) {
    var checkUp = false;
  }
  else {
    var checkUp = true;
  };
  if(laby.rows[player.y].rowIndex === size) {
    var checkDown = false;
  }
  else {
    var checkDown = true;
  };
  if(laby.rows[player.y].cells[player.x].cellIndex === 0) {
    var checkLeft = false;
  }
  else {
    var checkLeft = true;
  };
  if(laby.rows[player.y].cells[player.x].cellIndex === labyrinth.width - 1) {
    var checkRight = false;
  }
  else {
    var checkRight = true;
  };
  clickMoveInner(checkUp, checkRight, checkDown, checkLeft);
};

var changeLife = function(amount, item) {
  if(item) {
    var place = itemText;
  }
  else {
    var place = message;
  };
  player.life += amount;
  document.getElementById("life").innerHTML = "Life: " + player.life;
  if(amount === "kill") {
    player.life = 0;
    document.getElementById("life").innerHTML = "Life: " + player.life;
  }
  else if(amount > 0) {
    place.innerHTML += "<br>You have gained " + amount + " life.";
    if(!item) prevM += "<br>You have gained " + amount + " life.";
  }
  else if(amount < 0) {
    amount = amount*-1;
    a("<br>You have lost " + amount + " life.");
  };
  if(player.life <= 0) {
    a("You have died");
    m("Your life has come to an end, but not with nothing to show for it. You think back fondly to all your adventures, and the fortunes they brought you.<br>" + document.getElementById("gold").innerHTML);
    resetPage(false);
  };
};
var changeGold = function(amount, item) {
  if(item) {
    var place = itemText;
  }
  else {
    var place = message;
  };
  if(amount*-1 > player.gold) amount = player.gold*-1;
  player.gold += amount;
  document.getElementById("gold").innerHTML = "Gold: " + player.gold;
  if(amount > 0) {
    place.innerHTML += "<br>You have gained " + amount + " gold.";
    if(!item) prevM += "<br>You have gained " + amount + " gold.";
  }
  else if(amount < 0) {
    amount = amount*-1;
    place.innerHTML += "<br>You have lost " + amount + " gold.";
    if(!item) prevM += "<br>You have lost " + amount + " gold.";
  };
};
var changeInventory = function(item, dont) {
  if(item === "-random") {
    var removeRandomItemNum = Math.floor(Math.random()*player.inventory.length);
    let removeItemName = player.inventory[removeRandomItemNum].name;
    player.inventory.splice(removeRandomItemNum, 1);
    itemImage[removeRandomItemNum].remove();
    if(!dont) {
      message.innerHTML += "<br>You have lost the " + removeItemName + ".";
      prevM += "<br>You have lost the " + removeItemName + ".";
    };
  }
  else if(item[0] === "-") {
    item = item.replace("-", "");
    let itemJ = jsonItems[item];
    if(player.inventory.includes(itemJ)) {
      var removeThisItem = player.inventory.indexOf(itemJ);
      player.inventory.splice(removeThisItem, 1);
      itemImage[removeThisItem].remove();
      if(!dont) {
        message.innerHTML += "<br>You have lost the " + item + ".";
        prevM += "<br>You have lost the " + item + ".";
      };
    };
  }
  else {
    item = jsonItems[item];
    player.inventory.push(item);
    var newItemImgTag = $("<img>", {
      id: item.name,
      class: "invItems",
      src: item.image,
      title: item.hover
    });
    newItemImgTag.on("mousedown", function(e) {
      if(!(ssX < startX + 20 && ssX > startX -20 && ssY < startY +20 && ssY > startY -20)) {
        newItemImgTag.on("click", function(e) {
          if(merchantSpace.firstChild) {
            var activeMerchant = merchantSpace.firstChild.childNodes[2].id.replace("mercItemSpace", "");
            buyOrSell(e, this.id, activeMerchant);
          }
          else {
            itemEvents(this.id ,e);
          };
        });
      };
      if(item.equip !== "no") {
        deze = $(this);
        e.preventDefault();
        draggableItem = true;
        startX = e.clientX;
        startY = e.clientY;
        var ssX = startX;
        var ssY = startY;
        $(document).on("mouseup", function(e) {
          $(document).off("mousemove");
          $(document).off("mouseup");
          if(ssX < startX + 20 && ssX > startX -20 && ssY < startY +20 && ssY > startY -20) {
            newItemImgTag.on("click", function(e) {
              if(merchantSpace.firstChild) {
                var activeMerchant = merchantSpace.firstChild.childNodes[3].id.replace("mercItemSpace", "");
                buyOrSell(e, this.id, activeMerchant);
              }
              else {
                itemEvents(this.id ,e);
              };
            });
          }
          else {
            newItemImgTag.off("click");
          };
          draggableItem = false;
          if(item.equip === "hands") {
            if(deze.offset().left < $("#righthandequipmentunder").offset().left + 60 && deze.offset().left > $("#righthandequipmentunder").offset().left - 60 && deze.offset().top < $("#righthandequipmentunder").offset().top + 60 && deze.offset().top > $("#righthandequipmentunder").offset().top - 60) {
              var checkEquipSpace = "#righthandequipment";
              var checkEquipPlayer = "rightHand";
              equipItem(item, checkEquipSpace, checkEquipPlayer);
            }
            else if(deze.offset().left < $("#lefthandequipmentunder").offset().left + 60 && deze.offset().left > $("#lefthandequipmentunder").offset().left - 60 && deze.offset().top < $("#lefthandequipmentunder").offset().top + 60 && deze.offset().top > $("#lefthandequipmentunder").offset().top - 60) {
              var checkEquipSpace = "#lefthandequipment";
              var checkEquipPlayer = "leftHand";
              equipItem(item, checkEquipSpace, checkEquipPlayer);
            }
            else {
              deze.css({
                "left": 0,
                "top": 0,
                "z-index": 10
              });
            };
          }
          else {
            switch (item.equip) {
              case "head":
                var checkEquipSpace = "#headequipment";
                var checkEquipPlayer = "head";
                break;
              case "amulet":
                var checkEquipSpace = "#amuletequipment";
                var checkEquipPlayer = "amulet";
                break;
              case "torso":
                var checkEquipSpace = "#torsoequipment";
                var checkEquipPlayer = "torso";
                break;
              case "legs":
                var checkEquipSpace = "#legsequipment";
                var checkEquipPlayer = "legs";
                break;
              case "feet":
                var checkEquipSpace = "#feetequipment";
                var checkEquipPlayer = "feet";
                break;
            };
            if(deze.offset().left < $((checkEquipSpace+"under")).offset().left + 60 && deze.offset().left > $((checkEquipSpace+"under")).offset().left - 60 && deze.offset().top < $((checkEquipSpace+"under")).offset().top + 60 && deze.offset().top > $((checkEquipSpace+"under")).offset().top - 60) {
              equipItem(item, checkEquipSpace, checkEquipPlayer);
            }
            else {
              deze.css({
                "left": 0,
                "top": 0,
                "z-index": 10
              });
            };
          };
        });
        $(document).on("mousemove", function(e) {
          e.preventDefault();
          if(!draggableItem) return;
          var deltaX = e.clientX - startX;
          var deltaY = e.clientY - startY;
          deze.css({
            "z-index": 50,
            "left": parseInt(deze.css("left").replace("px", "")) + deltaX + "px",
            "top": parseInt(deze.css("top").replace("px", "")) + deltaY + "px"
          });
          startX = e.clientX;
          startY = e.clientY;
          hideDropDown();
        });
      };
    });
    $("#itemspace").append(newItemImgTag);
  };
};

var updateStats = function() {
  player.dmg = 1;
  player.def = 1;
  for(var data in player.equipment) {
    if(player.equipment[data].dmg) player.dmg += player.equipment[data].dmg;
    if(player.equipment[data].def) player.def += player.equipment[data].def;
  };
};
var equipItem = function(item, checkEquipSpace, checkEquipPlayer, handSwitch) {
  if(item === "-random") {
    switch (Math.floor(Math.random()*7)) {
      case 0:
        item = "-headequipment";
        checkEquipPlayer = "head";
        break;
      case 1:
        item = "-amuletequipment";
        checkEquipPlayer = "amulet";
        break;
      case 2:
        item = "-torsoequipment";
        checkEquipPlayer = "torso";
        break;
      case 3:
        item = "-righthandequipment";
        checkEquipPlayer = "rightHand";
        break;
      case 4:
        item = "-lefthandequipment";
        checkEquipPlayer = "leftHand";
        break;
      case 5:
        item = "-legsequipment";
        checkEquipPlayer = "legs";
        break;
      case 6:
        item = "-feetequipment";
        checkEquipPlayer = "feet";
        break;
    };
    equipItem(item, checkEquipSpace, checkEquipPlayer);
  }
  else if(item[0] === "-") {
    item = item.replace("-", "");
    let itemJ = jsonItems[$("#" + item).attr("name")];
    if(player.equipment[checkEquipPlayer] === itemJ) {
      player.equipment[checkEquipPlayer] = {};
      $("#" + item).remove();
      if(!handSwitch) {
        changeInventory(itemJ.name);
        y("You have unequipped the " + itemJ.name + ".");
      };
    };
    updateStats();
  }
  else {
    if(!handSwitch) {
      y("You have equipped the " + item.name + ".");
      deze.css({
        "left": 0,
        "top": 0,
        "z-index": 10
      });
      changeInventory("-" + item.name, true);
      if($(checkEquipSpace).attr("class") === "fullEquip") {
        equipItem("-" + checkEquipSpace.replace("#", ""), checkEquipSpace, checkEquipPlayer);
      };
    }
    else {
      if(checkEquipPlayer === "rightHand") {
        var checkEquipPlayerSwitch = "leftHand";
      }
      else if(checkEquipPlayer === "leftHand") {
        var checkEquipPlayerSwitch = "rightHand";
      };
      equipItem("-" + deze.attr("id"), checkEquipSpace, checkEquipPlayerSwitch, true);
      if($(checkEquipSpace).attr("class") === "fullEquip") {
        equipItem(player.equipment[checkEquipPlayer], "#" + deze.attr("id"), checkEquipPlayerSwitch, true);
        equipItem("-" + checkEquipSpace.replace("#", ""), checkEquipSpace, checkEquipPlayer, true);
      };
    };
    player.equipment[checkEquipPlayer] = item;
    var newEquipImgTag = $("<img>", {
      id: checkEquipSpace.replace("#", ""),
      class: "fullEquip",
      src: item.image,
      title: item.hover,
      name: item.name
    });
    newEquipImgTag.on("mousedown", function(e) {
      if(!(ssX < startX + 20 && ssX > startX -20 && ssY < startY +20 && ssY > startY -20)) {
        newEquipImgTag.on("click", function(e) {
          itemEquipEvents(item.name ,e);
        });
      };
      deze = $(this);
      e.preventDefault();
      draggableItem = true;
      startX = e.clientX;
      startY = e.clientY;
      var ssX = startX;
      var ssY = startY;
      $(document).on("mouseup", function(e) {
        $(document).off("mousemove");
        $(document).off("mouseup");
        if(ssX < startX + 20 && ssX > startX -20 && ssY < startY +20 && ssY > startY -20) {
          newEquipImgTag.on("click", function(e) {
            itemEquipEvents(item.name ,e);
          });
        }
        else {
          newEquipImgTag.off("click");
        };
        draggableItem = false;
        if(item.equip === "hands") {
          if(deze.offset().left < $("#righthandequipmentunder").offset().left + 60 && deze.offset().left > $("#righthandequipmentunder").offset().left - 60 && deze.offset().top < $("#righthandequipmentunder").offset().top + 60 && deze.offset().top > $("#righthandequipmentunder").offset().top - 60) {
            if(deze.attr("id") === "righthandequipment") {
              deze.css({
                "left": $("#" + deze.attr("id") + "under").css("left"),
                "top": $("#" + deze.attr("id") + "under").css("top"),
                "z-index": 10
              });
            }
            else {
              equipItem(item, "#righthandequipment", "rightHand", true);
            };
          }
          else if(deze.offset().left < $("#lefthandequipmentunder").offset().left + 60 && deze.offset().left > $("#lefthandequipmentunder").offset().left - 60 && deze.offset().top < $("#lefthandequipmentunder").offset().top + 60 && deze.offset().top > $("#lefthandequipmentunder").offset().top - 60) {
            if(deze.attr("id") === "lefthandequipment") {
              deze.css({
                "left": $("#" + deze.attr("id") + "under").css("left"),
                "top": $("#" + deze.attr("id") + "under").css("top"),
                "z-index": 10
              });
            }
            else {
              equipItem(item, "#lefthandequipment", "leftHand", true);
            };
          }
          else if(deze.offset().left > $("#character").offset().left + 244 || deze.offset().left < $("#character").offset().left - 60 || deze.offset().top > $("#character").offset().top + 350 || deze.offset().top < $("#character").offset().top - 60) {
            checkEquipPlayer = deze.attr("id").replace("hand", "Hand").replace("equipment", "");
            equipItem("-" + deze.attr("id"), checkEquipSpace, checkEquipPlayer);
          }
          else {
            deze.css({
              "left": $("#" + deze.attr("id") + "under").css("left"),
              "top": $("#" + deze.attr("id") + "under").css("top"),
              "z-index": 10
            });
          };
        }
        else {
          if(deze.offset().left > $("#character").offset().left + 244 || deze.offset().left < $("#character").offset().left - 60 || deze.offset().top > $("#character").offset().top + 350 || deze.offset().top < $("#character").offset().top - 60) {
            checkEquipPlayer = deze.attr("id").replace("equipment", "");
            equipItem("-" + deze.attr("id"), checkEquipSpace, checkEquipPlayer);
          }
          else {
            deze.css({
              "left": $("#" + deze.attr("id") + "under").css("left"),
              "top": $("#" + deze.attr("id") + "under").css("top"),
              "z-index": 10
            });
          };
        };
      });
      $(document).on("mousemove", function(e) {
        e.preventDefault();
        if(!draggableItem) return;
        var deltaX = e.clientX - startX;
        var deltaY = e.clientY - startY;
        deze.css({
          "z-index": 50,
          "left": parseInt(deze.css("left").replace("px", "")) + deltaX + "px",
          "top": parseInt(deze.css("top").replace("px", "")) + deltaY + "px"
        });
        startX = e.clientX;
        startY = e.clientY;
        dropdown.hide(100);
      });
    });
    $("#equipspace").append(newEquipImgTag);
  };
  updateStats();
};

var exitLabyrinth = function() {
  resetPage(true);
};
