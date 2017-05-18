"use strict";
var jsonItems = $.getJSON("Data/Items.json", function(json) {
  jsonItems =  json;
});
var rooms = ["goblin", "chest", "randomTrap", "merchant", "lab", "riddle", "sky", "daedalus"];
var traps = ["boulder", "pitfall"];
var laby = document.getElementById("laby");
var labyTd = laby.getElementsByTagName("td");
var alert = document.getElementById("alert");
var prevAlert = document.getElementById("prevalert");
var message = document.getElementById("message");
var prevMessage = document.getElementById("prevmessage");
var itemText = document.getElementById("itemtext");
var forms = document.getElementById("forms");
var openInv = document.getElementById("openinv");
var inventory = document.getElementById("inventory");
var dragBar = document.getElementById("dragbar");
var itemspace = document.getElementById("itemspace");
var itemImage = itemspace.getElementsByTagName("img");
var enter = document.getElementById("enter");
var north = document.getElementById("north");
var east = document.getElementById("east");
var south = document.getElementById("south");
var west = document.getElementById("west");
var playerClass = document.getElementsByClassName("player");
var exploredClass = document.getElementsByClassName("explored")
var visual = document.getElementById("visual");
var dropdown = $("#dropdown");
var useDrop = $("#use");
var dropDrop = $("#drop");
var events;
var itemEvents;
var useItemEvents;
var questionAnswer;
var draggable = false;
var startX;
var startY;
var prevM = "";
var prevA = "";
var attackAmount = 0;
var cancelableTimer;
var cancelNextFunction = 0;
var inside = 0;
var inputSize;
var size;
var rowsStart;
var cellsStart;
var autoWidth;
var player;
var minotaur;
var labyrinth = {
  width: undefined,
  height: undefined
};
var rowsNr;
var prevRowsNr = 101;
var prev2RowsNr = 102;
var prev3RowsNr = 103;
var prev4RowsNr = 104;
var cellsNr;
var prevCellsNr = 101;
var prev2CellsNr = 102;
var prev3CellsNr = 103;
var prev4CellsNr = 104;
var newEventLocation;

var setPlayer = function() {
  player = {
    x: Math.floor(labyrinth.width/2),
    y: labyrinth.height-1,
    life: 5,
    gold: 0,
    luck: 0,
    inventory: []
  };
  attackAmount = 0;
  changeInventory("Cartography Tool");
}
var setMinotaur = function() {
  minotaur = {
    x: prev2CellsNr,
    y: prev2RowsNr,
    life: 1,
    gold: Math.floor(Math.random()*51+25)
  };
  if(difficulty === "normal") {
    minotaur.x = prev3CellsNr;
    minotaur.y = prev3RowsNr;
    minotaur.life = 3;
    minotaur.gold = Math.floor(Math.random()*51+50)
  }
  else if(difficulty === "hard") {
    minotaur.x = prev4CellsNr;
    minotaur.y = prev4RowsNr;
    minotaur.life = 5;
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

var createInputNum = function(min, max) {
  var form = document.createElement("form");
  var input = document.createElement("input");
  input.type = "number";
  input.min = min;
  input.max = max;
  input.value = min;
  input.maxLength = max.length;
  input.step = 1;
  input.id = "inputnum";
  var submitInput = document.createElement("button");
  submitInput.type = "button";
  submitInput.innerHTML = "Go!";
  submitInput.id = "submitinput";
  form.appendChild(input);
  form.appendChild(submitInput);
  forms.appendChild(form);
};
var createInputOpt = function(n, selected) {
  ableMove(false);
  var form = document.createElement("form");
  var submitInput = document.createElement("button");
  for(var i in n) {
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.value = n[i];
    radio.id = n[i];
    radio.checked = false;
    radio.name = "choice"
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
  forms.appendChild(form);
  if(selected) document.getElementById(selected).checked = true;
  // document.getElementById("Just walk away").onclick = function() {
  //   ableMove(true);
  //   document.getElementById("submitinput").disabled = true;
  // };
    //     ableMove(false);
    //     document.getElementById("submitinput").disabled = false;
    //   };
    // };  /////wat als je de pijltjes gebruikt?
  document.getElementById("submitinput").onclick = function() {
    for(var i in n) {
      if(forms.innerHTML === "") {
        return
      }
      else if(document.getElementById(n[i]).checked === true) {
        questionAnswer = n[i];
        events();
        ableMove(true);
        questionAnswer = "";
        while (forms.firstChild) {
          forms.removeChild(forms.firstChild);
        };
      };
    };
  };
};
var createInputOptItems = function(n, selected, id) {
  ableMove(false);
  var form = document.createElement("form");
  var submitInput = document.createElement("button");
  for(var i in n) {
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.value = n[i];
    radio.id = n[i];
    radio.checked = false;
    radio.name = "choice"
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
  formsitems.appendChild(form);
  if(selected) document.getElementById(selected).checked = true;
  // document.getElementById("Just walk away").onclick = function() {
  //   ableMove(true);
  //   document.getElementById("submitinput").disabled = true;
  // };
    //     ableMove(false);
    //     document.getElementById("submitinput").disabled = false;
    //   };
    // };  /////wat als je de pijltjes gebruikt?
  document.getElementById("submitinput").onclick = function() {
    for(var i in n) {
      if(formsitems.innerHTML === "") {
        return
      }
      else if(document.getElementById(n[i]).checked === true) {
        questionAnswer = n[i];
        useItemEvents(id);
        ableMove(true);
        questionAnswer = "";
        while (formsitems.firstChild) {
          formsitems.removeChild(formsitems.firstChild);
        };
      };
    };
  };
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

var addEvent = function(id) {
  newEventLocation = laby.rows[Math.floor(Math.random()*size)].cells[Math.floor(Math.random()*labyrinth.width)];
  if(newEventLocation.id === "" && newEventLocation.className !== "wall" && newEventLocation.className !== "player") {
    newEventLocation.id = id;
  }
  else {
    addEvent(id);
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
  // autoWidth = (window.innerWidth * 0.6) / labyrinth.width;
  // if(autoWidth > 80) autoWidth = 80;
  // for(var i = 0; i < labyTd.length; i++) {
  //   labyTd[i].style.height = autoWidth + "px";
  //   labyTd[i].style.width = autoWidth + "px";
  // };
  // for(var i = 0; i < playerClass.length; i++) {
  //   playerClass[i].style.backgroundSize = autoWidth + "px " + autoWidth + "px";
  // };
  // window.onresize = function() {
  //   autoWidth = (window.innerWidth * 0.6) / labyrinth.width;
  //   if(autoWidth > 80) autoWidth = 80;
  //   for(var i = 0; i < labyTd.length; i++) {
  //     labyTd[i].style.height = autoWidth + "px";
  //     labyTd[i].style.width = autoWidth + "px";
  //   };
  //   for(var i = 0; i < playerClass.length; i++) {
  //     playerClass[i].style.backgroundSize = autoWidth + "px " + autoWidth + "px";
  //   };
  // };
  // document.getElementsByClassName("explored").style.backgroundSize = autoWidth;
  setPlayer();
  laby.rows[player.y].cells[player.x].className = "player";
  laby.rows[player.y].cells[player.x].id = "entrance";
  document.getElementById("life").innerHTML = "Life: " + player.life;
  document.getElementById("gold").innerHTML = "Gold: " + player.gold;
  openInv.style.display = "initial";
  openset.style.display = "initial";
  ableMove(true);
  for(var c = 0; c < player.x; c++) {
    laby.rows[labyrinth.height-1].cells[c].className = "wall";
    laby.rows[labyrinth.height-1].cells[labyrinth.width-1-c].className = "wall";
  };
  createPath();
  setMinotaur();
  laby.rows[minotaur.y].cells[minotaur.x].className = "minotaur";
  for(var data in rooms) {
    addEvent(rooms[data]);
  };
  var countFor = 0;
  var v = Math.floor((size*labyrinth.width)*((Math.floor(Math.random()*41)*0.01)+0.2));
  for(var w = 0;w < v; w++) {
    var newWallLocation;
    newWallLocation = laby.rows[Math.floor(Math.random()*size)].cells[Math.floor(Math.random()*labyrinth.width)];
    if(newWallLocation.id === "" && newWallLocation.className !== "wall" && newWallLocation.className !== "path") {
      newWallLocation.className = "wall";
    }
    else {
      w -= 1
    };
    countFor += 1;
    if(countFor >= 500) w = size*labyrinth.width;
  };
  viewMap();
  clickMove();
};

var exitLabyrinth = function() {
  inside = 0;
  laby.innerHTML = "";
  ableMove(false);
};

var viewRow = function(l, kMin, kMax) {
  var locationIndex = ((laby.rows[player.y].rowIndex * labyrinth.width) + laby.rows[player.y].cells[player.x].cellIndex);
  for(var k = kMin; k < kMax; k++) {
    if(labyTd[locationIndex +(labyrinth.width*k) +l].className === "wall") {
      labyTd[locationIndex +(labyrinth.width*k) +l].style.backgroundColor = "rgb(28, 16, 4)";
      labyTd[locationIndex +(labyrinth.width*k) +l].style.border = "0.1em solid rgb(28, 16, 4)";
    };
  };
};
var viewMap = function() {
  if(laby.rows[player.y].rowIndex !== 0 && laby.rows[player.y].rowIndex !== size && laby.rows[player.y].cells[player.x].cellIndex !== 0 && laby.rows[player.y].cells[player.x].cellIndex !== labyrinth.width - 1) {
    for(var l = -1; l < 2; l++) {
      viewRow(l, -1, 2);
    };
  }
  else if(laby.rows[player.y].rowIndex === 0 && laby.rows[player.y].cells[player.x].cellIndex !== 0 && laby.rows[player.y].cells[player.x].cellIndex !== labyrinth.width - 1) {
    for(var l = -1; l < 2; l++) {
      viewRow(l, 0, 2);
    };
  }
  else if(laby.rows[player.y].rowIndex === size) {
    for(var l = -1; l < 2; l++) {
      viewRow(l, -1, 1);
    };
  }
  else if(laby.rows[player.y].cells[player.x].cellIndex === 0 && laby.rows[player.y].rowIndex !== 0) {
    for(var l = 0; l < 2; l++) {
      viewRow(l, -1, 2);
    };
  }
  else if(laby.rows[player.y].cells[player.x].cellIndex === labyrinth.width - 1 && laby.rows[player.y].rowIndex !== 0) {
    for(var l = -1; l < 1; l++) {
      viewRow(l, -1, 2);
    };
  };
};

var minoCheck = function() {
  if(laby.rows[minotaur.y].cells[minotaur.x] === laby.rows[player.y].cells[player.x]) {
    cancelNextFunction += 1;
  };
};
var minoMove = function() {
  if(minotaur.life <= 0) return;
  minoCheck();
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
    laby.rows[minoPrevY].cells[minoPrevX].classList.remove("minotaur");
    laby.rows[minotaur.y].cells[minotaur.x].className += " minotaur";
  };
  minoCheck();
};

var move = function(xy, posmin) {
  var prevX = player.x;
  var prevY = player.y;
  (posmin) ? player[xy] += 1 : player[xy] -= 1;
  if(player.x < 0 || player.x >= labyrinth.width || player.y < 0 || player.y >= labyrinth.height || laby.rows[player.y].cells[player.x].className === "wall") {
    a("You can't walk through walls!");
    player.x = prevX;
    player.y = prevY;
  }
  else {
    a("");
    laby.rows[prevY].cells[prevX].classList.remove("player");
    laby.rows[prevY].cells[prevX].className += " explored";
    laby.rows[player.y].cells[player.x].className += " player";
    clearTimeout(cancelableTimer);
    minoMove();
    viewMap();
    clickMove();
    events();
  };
};
var randomMove = function() {
  var prevX = player.x;
  var prevY = player.y;
  laby.rows[prevY].cells[prevX].classList.remove("player");
  laby.rows[player.y].cells[player.x].className += " explored";
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
    events();
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

var changeLife = function(amount) {
  player.life += amount;
  document.getElementById("life").innerHTML = "Life: " + player.life;
  if(player.life <= 0) {
    a("You have died");
    m("Your life has come to an end, but not with nothing to show for it. You think back fondly to all your adventures, and the fortunes they brought you.<br>" + document.getElementById("gold").innerHTML);
    inside = -1;
    document.getElementById("life").innerHTML = "";
    document.getElementById("gold").innerHTML = "";
    openInv.style.display = "none";
    inventory.style.display = "none";
    while (itemspace.firstChild) {
      itemspace.removeChild(itemspace.firstChild);
    };
    openSet.style.display = "none";
    laby.innerHTML = "";
    ableMove(false);
  };
};
var changeGold = function(amount) {
  player.gold += amount;
  if(player.gold < 0) player.gold = 0;
  document.getElementById("gold").innerHTML = "Gold: " + player.gold;
  if(amount > 0) {
    message.innerHTML += "<br>You have gained " + amount + " gold.";
    prevM += "<br>You have gained " + amount + " gold.";
  }
  else if(amount < 0) {
    amount = amount.replace("-", "");
    message.innerHTML += "<br>You have lost " + amount + " gold.";
    prevM += "<br>You have lost " + amount + " gold.";
  };
};
var changeInventory = function(item) {
  if(item === "-random") {
    var removeRandomItemNum = Math.floor(Math.random()*player.inventory.length);
    player.inventory.splice(removeRandomItemNum, 1);
    itemImage[removeRandomItemNum].remove();
  }
  else if(item[0] === "-") {
    item = item.replace("-", "");
    item = jsonItems[item];
    if(player.inventory.includes(item)) {
      var removeThisItem = player.inventory.indexOf(item);
      player.inventory.splice(removeThisItem, 1);
      itemImage[removeThisItem].remove();
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
    newItemImgTag.click(function(e) {
      itemEvents(this.id ,e);
    })
    $("#itemspace").append(newItemImgTag);
  };
};

document.onkeydown = function(e) {
  switch(e.keyCode) {
    case 13:
      e.preventDefault();
      if(forms.innerHTML !== "") {
        document.getElementById("submitinput").click();
      }
      else if(formsitems.innerHTML !== "") {
        document.getElementById("submitinput").click();
      }
      else {
        enter.click();
      };
      break;
    case 27:
      e.preventDefault();
      if(settings.style.display === "none" || settings.style.display === "") {
        openSet.click();
      }
      else {
        document.getElementById("closeset").click();
      };
      break;
    case 37:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = document.getElementById("inputnum").min;
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        document.getElementsByName("choice")[0].checked = true;
      }
      else {
        west.click();
      };
      break;
    case 38:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) + 1;
        if(parseInt(document.getElementById("inputnum").value) > parseInt(document.getElementById("inputnum").max)) {
          document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) - 1;
        };
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        for(var i = 0; i < document.getElementsByName("choice").length; i++) {
          if(document.getElementsByName("choice")[i].checked === true) {
            if(i === 0) {
              return;
            };
            document.getElementsByName("choice")[i-1].checked = true;
          };
        };
      }
      else {
        north.click();
      };
      break;
    case 39:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = document.getElementById("inputnum").max;
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        for(var i in document.getElementsByName("choice")) {
          document.getElementsByName("choice")[document.getElementsByName("choice").length - 1].checked = true;
        };
      }
      else {
        east.click();
      };
      break;
    case 40:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) - 1;
        if(parseInt(document.getElementById("inputnum").value) < parseInt(document.getElementById("inputnum").min)) {
          document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) + 1;
        };
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        for(var i = 0; i < document.getElementsByName("choice").length; i++) {
          if(document.getElementsByName("choice")[i].checked === true) {
            if(i === document.getElementsByName("choice").length - 1) {
              return;
            };
            document.getElementsByName("choice")[i+1].checked = true;
            return;
          };
        };
      }
      else {
        south.click();
      };
      break;
    case 73:
      if(inventory.style.display === "none" || inventory.style.display === "") {
        openInv.click();
      }
      else if(inventory.style.display === "initial") {
        document.getElementById("closeinv").click();
      };
      break;
  };
};

enter.onclick = function() {
  if(inside <= 0) {
    m("What size labyrinth would you like to enter?");
    a("");
    enter.style.display = "none";
    document.getElementById("welcome").style.display = "none";
    createInputNum(5, 15);
    document.getElementById("submitinput").onclick = function() {
      if(document.getElementById("inputnum").value < 5 || document.getElementById("inputnum").value > 15) return;
      inputSize = document.getElementById("inputnum").value;
      size = parseInt(inputSize);
      setLabyrinth();
      a("");
      events();
      while (forms.firstChild) {
        forms.removeChild(forms.firstChild);
      };
    };
    inside = 0;
  }
  else if(inside === 2) {
    a("You're already inside!");
  }
  else if(inside > 13) {
    a("A curse lowers your life!");
    changeLife(-1);
  }
  else if(inside > 12) {
    a("I'm going to start killing you now, don't say I didn't warn you!");
  }
  else if(inside > 6) {
    a("Stop clicking that damned button!!");
  }
  else if(inside > 2) {
    a("Like I've said before, you're already inside!");
  }
  else {
    a("You're already inside");
  };
  inside += 1;
};

north.onclick = function() {
  move("y", false);
};
east.onclick = function() {
  move("x", true);
};
south.onclick = function() {
  move("y", true);
};
west.onclick = function() {
  move("x", false);
};

openInv.onclick = function() {
  if(openInv.style.display === "") return;
  inventory.style.display = "initial";
};
document.getElementById("closeinv").onclick = function() {
  inventory.style.display = "none";
};
dragBar.onmousedown = function(e) {
  e.preventDefault();
  draggable = true;
  startX = e.clientX;
  startY = e.clientY;
  onmouseup = function(e) {
    draggable = false;
  };
  onmousemove = function(e) {
    e.preventDefault();
    if(!draggable) return;
    var deltaX = e.clientX - startX;
    var deltaY = e.clientY - startY;
    inventory.style.left = deltaX + inventory.offsetLeft + "px";
    inventory.style.top = deltaY + inventory.offsetTop + "px";
    startX = e.clientX;
    startY = e.clientY;
  };
};