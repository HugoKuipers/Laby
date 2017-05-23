"use strict";
var setPlayer = function() {
  player = {
    x: Math.floor(labyrinth.width/2),
    y: labyrinth.height-1,
    life: 5,
    gold: 0,
    luck: 0,
    inventory: [],
    equipment: {
      head: "",
      amulet: "",
      torso: "",
      rightHand: "",
      leftHand: "",
      legs: "",
      feet: ""
    },
    points: 0
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

var createInputNum = function(min, max, start) {
  var form = document.createElement("form");
  var input = document.createElement("input");
  input.type = "number";
  input.min = min;
  input.max = max;
  input.value = start;
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
  place.appendChild(form);
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
      if(place.innerHTML === "") {
        return
      }
      else if(document.getElementById(n[i]).checked === true) {
        questionAnswer = n[i];
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
  var goOn =  document.createElement("button");
  goOn.innerHTML = text;
  goOn.id = "goOn";
  goOn.type = "button";
  goOn.onclick = function() {
    if(id) {
      useItemEvents(id);
    }
    else {
      events();
    };
  };
  if(id) {
    formsitems.appendChild(goOn);
  }
  else {
    forms.appendChild(goOn);
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
  openSet.style.display = "initial";
  openChar.style.display = "initial";
  ableMove(true);
  for(var c = 0; c < player.x; c++) {
    laby.rows[labyrinth.height-1].cells[c].className = "wall";
    laby.rows[labyrinth.height-1].cells[labyrinth.width-1-c].className = "wall";
  };
  createPath();
  setMinotaur();
  laby.rows[minotaur.y].cells[minotaur.x].className = "hiddenminotaur";
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
  for(var i = 0; i < minoClass.length; i++) {
    minoClass[0].classList.remove("minotaur");
  };
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
    if($(laby.rows[prevY].cells[prevX]).hasClass("explored") === false) laby.rows[prevY].cells[prevX].className += " explored";
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

var changeLife = function(amount, item) {
  if(item) {
    let place = itemText;
  }
  else {
    let place = message;
  };
  player.life += amount;
  document.getElementById("life").innerHTML = "Life: " + player.life;
  if(amount > 0) {
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
    let place = itemText;
  }
  else {
    let place = message;
  };
  console.log(place);
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
          itemEvents(this.id ,e);
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
          if(ssX < startX + 20 && ssX > startX -20 && ssY < startY +20 && ssY > startY -20) {
            newItemImgTag.on("click", function(e) {
              itemEvents(this.id ,e);
            });
          }
          else {
            newItemImgTag.off("click");
          };
          draggableItem = false;
          if(item.equip === "hands") {
            if(deze.offset().left < $("#righthandequipment").offset().left + 60 && deze.offset().left > $("#righthandequipment").offset().left - 60 && deze.offset().top < $("#righthandequipment").offset().top + 60 && deze.offset().top > $("#righthandequipment").offset().top - 60) {
              var checkEquipSpace = "#righthandequipment";
              var checkEquipPlayer = player.equipment.rightHand;
              equipItem(item, checkEquipSpace, checkEquipPlayer);
            }
            else if(deze.offset().left < $("#lefthandequipment").offset().left + 60 && deze.offset().left > $("#lefthandequipment").offset().left - 60 && deze.offset().top < $("#lefthandequipment").offset().top + 60 && deze.offset().top > $("#lefthandequipment").offset().top - 60) {
              var checkEquipSpace = "#lefthandequipment";
              var checkEquipPlayer = player.equipment.leftHand;
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
                var checkEquipPlayer = player.equipment.head;
                break;
              case "amulet":
                var checkEquipSpace = "#amuletequipment";
                var checkEquipPlayer = player.equipment.amulet;
                break;
              case "torso":
                var checkEquipSpace = "#torsoequipment";
                var checkEquipPlayer = player.equipment.torso;
                break;
              case "legs":
                var checkEquipSpace = "#legsequipment";
                var checkEquipPlayer = player.equipment.legs;
                break;
              case "feet":
                var checkEquipSpace = "#feetequipment";
                var checkEquipPlayer = player.equipment.feet;
                break;
            };
            if(deze.offset().left < $(checkEquipSpace).offset().left + 60 && deze.offset().left > $(checkEquipSpace).offset().left - 60 && deze.offset().top < $(checkEquipSpace).offset().top + 60 && deze.offset().top > $(checkEquipSpace).offset().top - 60) {
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
          dropdown.hide(100);
        });
      };
    });
    $("#itemspace").append(newItemImgTag);
  };
};

var equipItem = function(item, checkEquipSpace, checkEquipPlayer) {
  changeInventory("-" + item.name, true);
  if($(checkEquipSpace).attr("class") === "fullEquip") {
    changeInventory($(checkEquipSpace).attr("name"), true);
  };
  $(checkEquipSpace).attr({
    "src": item.image,
    "title": item.hover,
    "class": "fullEquip",
    "name": item.id
  });
  $(checkEquipSpace).on("click", function(e) {
    itemEvents(this.id ,e);
  });
};

var exitLabyrinth = function() {
  resetPage(true);
};
