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
  let aNum = Math.floor(Math.random()*x);
  let bNum = Math.floor(Math.random()*2*x);
  let cNum = Math.floor(Math.random()*x);
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
  askProblem = "X\xB2" + " " + sign1 + " " + aNum + "X" + " " + sign2 + " " + bNum + " " + "=" + " " + sign3 + cNum;
  let newb = parseInt(sign2+bNum) - parseInt(sign3+cNum);
  let newa = parseInt(sign1+aNum);
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
    solveXproblem(x);
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

var hideDropDown = function() {
  dropdown.hide(100);
  shopDrop.hide(100);
  equipDrop.hide(100);
};

var createMerchant = function(type) {
  for(var i = 0; i < 99; i++) {
    if(!(document.getElementsByClassName(type + i)[0]) && !(merchantList[type + i])) {
      merchantTypeId = type + i;
      i = 100;
    };
  };
  merchantList[merchantTypeId] = {};
  merchantList[merchantTypeId].inventory = [];
  switch(type) {
    case "general":
      var amountMerchantItems = Math.floor(((14-(difficulty.length*2)) * (1+(0.1*player.depth)-0.1)) * (Math.random()+0.5));
      merchantList[merchantTypeId].gold = Math.floor((150-difficulty.length*20) * (1+(Math.random()*2)) * (1+(0.1*player.depth)-0.1));
      merchantList[merchantTypeId].name = markovNameGen("dutch");
      merchantList[merchantTypeId].haggler = Math.floor(Math.random()*(21+difficulty.length*10)+10)/100;
      break;
  };
  var merchantPossibleItems = {};
  var greatestChance = 0;
  for(var data in jsonItems) {
    if(jsonItems[data].merchants[type]) {
      if(greatestChance < jsonItems[data].merchants[type]) greatestChance = jsonItems[data].merchants[type];
      merchantPossibleItems[data] = jsonItems[data];
    };
  };
  for(var i = 0; i < amountMerchantItems; i++) {
    var thresholdChance = Math.ceil(Math.random()*greatestChance);
    var thisItemPerhaps = Math.floor(Math.random()*(Object.keys(merchantPossibleItems).length));
    if(merchantPossibleItems[Object.keys(merchantPossibleItems)[thisItemPerhaps]].merchants[type] >= thresholdChance) {
      changeMerchantInventory(merchantPossibleItems[Object.keys(merchantPossibleItems)[thisItemPerhaps]].name, merchantTypeId);
    }
    else {
      i -= 1;
    };
  };
  laby.rows[player.y].cells[player.x].className += " " + merchantTypeId;
};
var interactMerchant = function(merchant) {
  if(document.getElementById("mercItemSpace" + merchant)) return;
  var actualMerchant = document.createElement("div");
  actualMerchant.id = "merchantWindow";
  var barMerc = document.createElement("div");
  barMerc.id = "mercDragBar";
  barMerc.onmousedown = function(e) {
    generalMove(e, actualMerchant);
  };
  var barHead = document.createElement("span");
  barHead.id = "mercHeader";
  barHead.innerHTML = merchantList[merchant].name + "'s Store";
  var closeMerc = document.createElement("button");
  closeMerc.id = "closeMerc";
  closeMerc.innerHTML = "&#10006;";
  closeMerc.onclick = function() {
    while (merchantSpace.firstChild) {
      merchantSpace.removeChild(merchantSpace.firstChild);
    };
  };
  var itemRoster = document.createElement("table");
  itemRoster.id = "itemRoster";
  var legendRow = itemRoster.insertRow(0);
  var legendPic = legendRow.insertCell(0);
  legendPic.id = "legendPic";
  var legendName = legendRow.insertCell(1);
  legendName.id = "legendName";
  legendName.innerHTML = "Name:";
  var legendPrice = legendRow.insertCell(2);
  legendPrice.id = "legendPrice";
  legendPrice.innerHTML = "Price:";
  var legendStock = legendRow.insertCell(3);
  legendStock.id = "legendStock";
  legendStock.innerHTML = "Stock:";
  var legendAmount = legendRow.insertCell(4);
  legendAmount.id = "legendAmount";
  legendAmount.innerHTML = "Amount:";
  var mercItemSpace = document.createElement("p");
  mercItemSpace.id = "mercItemSpace" + merchant;
  mercItemSpace.innerHTML = "Total price: ";
  var currentPrice = document.createElement("span");
  currentPrice.innerHTML = 0;
  var buySelected = document.createElement("button");
  buySelected.innerHTML = "Buy";
  buySelected.onclick = function() {
    
  };
  actualMerchant.appendChild(barMerc);
  barMerc.appendChild(barHead);
  actualMerchant.appendChild(closeMerc);
  actualMerchant.appendChild(itemRoster);
  actualMerchant.appendChild(mercItemSpace);
  merchantSpace.appendChild(actualMerchant);
  for(var i = 0; i < merchantList[merchant].inventory.length; i++) {
    changeMerchantInventory(merchantList[merchant].inventory[i].name, merchant, true);
  };
};
var changeMerchantInventory = function(item, merchant, justPic) {
  if(item[0] === "-") {
    item = item.replace("-", "");
    let itemJ = jsonItems[item];
    if(merchantList[merchant].inventory.includes(itemJ)) {
      var removeThisItem = merchantList[merchant].inventory.indexOf(itemJ);
      merchantList[merchant].inventory.splice(removeThisItem, 1);
      document.getElementById("mercItemSpace")[removeThisItem].remove();
    };
  }
  else {
    item = jsonItems[item];
    if(!justPic) {
      merchantList[merchant].inventory.push(item);
    };
    if(merchantSpace.firstChild) {
      if(document.getElementById(item.name + " row")) {
        document.getElementById(item.name + " row").getElementsByTagName("td")[3].innerHTML = parseInt(document.getElementById(item.name + " row").getElementsByTagName("td")[3].innerHTML) + 1;
        document.getElementById(item.name + " counter").max = parseInt(document.getElementById(item.name + " counter").max) + 1;
      }
      else {
        var newItemRow = document.getElementById("itemRoster").insertRow(document.getElementById("itemRoster").length);
        newItemRow.id = item.name + " row";
        var newCounterInput = document.createElement("input");
        newCounterInput.type = "number";
        newCounterInput.min = 0;
        newCounterInput.max = 1;
        newCounterInput.value = 0;
        newCounterInput.step = 1;
        newCounterInput.id = item.name + " counter";
        newCounterInput.className = "numbutton";
        newItemRow.insertCell(0).innerHTML = "<img src='"+item.image+"' id='"+item.name+"' class='merchantItems' title='"+item.hover+"' />";
        newItemRow.insertCell(1).innerHTML = item.name;
        var tempValue = item.value*(merchantList[merchant].haggler+1);
        if((tempValue) % 1 !== 0) {
          tempValue = tempValue.toString();
          var tempPointPlace = tempValue.indexOf(".");
          if(parseInt(tempValue[tempPointPlace+1]) > 4) {
            var tempValueRoundUp = (parseInt(tempValue[tempPointPlace-1]) + 1).toString();
            tempValue = (tempValue.substr(0, (tempPointPlace-1))) + tempValueRoundUp;
          }
          else {
            tempValue = tempValue.substr(0, (tempPointPlace));
          };
        };
        newItemRow.insertCell(2).innerHTML = tempValue;
        newItemRow.insertCell(3).innerHTML = 1;
        newItemRow.insertCell(4).appendChild(newCounterInput);
      };
    };
  };
};
var setMerchantTypeId = function() {
  for(var data = 0; data < laby.rows[player.y].cells[player.x].classList.length; data++) {
    var typeName = (laby.rows[player.y].cells[player.x].classList[data]).substr(0, (laby.rows[player.y].cells[player.x].classList[data].length-1));
    if(typeName === "general") {
      merchantTypeId = laby.rows[player.y].cells[player.x].classList[data];
      return merchantTypeId;
    };
  };
};
var removeMerchantClass = function() {
  setMerchantTypeId();
  laby.rows[player.y].cells[player.x].classList.remove(merchantTypeId);
};
var buyOrSell = function(e, id, merchant) {
  bosDrop.off("click");
  shopDrop.show(150);
  shopDrop.css({
    top: e.clientY,
    left: e.clientX
  });
  if(e.target.className === "invItems") {
    bosDrop.html("Sell");
    document.getElementById('buysell').title = "Sell this item";
  };
  setTimeout(function() {
    $(document).one("mousedown", function(e) {
      if(e.target.className === "merchantItems" || e.target.className === "invItems" || e.target.id === "buysell") return;
      hideDropDown();
    });
  }, 1);
  bosDrop.click(function() {
    if(bosDrop.html() === "Sell") {
      console.log("Hi there");
      changeInventory("-"+id);
      changeMerchantInventory(id, merchant);
      changeGold(id.value*(1 - merchantList[merchant].haggler));
    };
    hideDropDown();
  });
};
var createOpenShopButton = function(text) {
  var openShop =  document.createElement("button");
  if(!text) {
    openShop.innerHTML = "Shop";
  }
  else {
    openShop.innerHTML = text;
  }
  openShop.id = "openShop";
  openShop.type = "button";
  var thisMerchant = setMerchantTypeId();
  openShop.onclick = function() {
    interactMerchant(thisMerchant);
  };
  forms.appendChild(openShop);
  beforeMoveFunctions["removeShop"] = function() {
    while (merchantSpace.firstChild) {
      merchantSpace.removeChild(merchantSpace.firstChild);
    };
    while (document.getElementById("openShop")) {
      document.getElementById("openShop").remove();
    };
    delete beforeMoveFunctions["removeShop"];
  };
};
