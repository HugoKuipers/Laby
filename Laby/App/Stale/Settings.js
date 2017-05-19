"use strict";
var readSettings = function() {
  fs.readFile("Data/Settings.json", function(err, data) {
    if(err) return;
    jsonSettings = JSON.parse(data);
    switch (jsonSettings.actualSettings.Difficulty) {
      case "Easy":
        difficulty = easy;
        break;
      case "Normal":
        difficulty = normal;
        break;
      case "Hard":
        difficulty = hard;
        break;
      default:
        difficulty = easy;
    };
    defaultSize = parseInt(jsonSettings.actualSettings["Preferred Size"]);
  });
};

readSettings();

var writeSettings = function() {
  let jsonSettingsString = JSON.stringify(jsonSettings);
  fs.writeFile("Data/Settings.json", jsonSettingsString, function(err) {
    if(err) return;
  });
};

var setButtSettings = function(ths, forback) {
  let currentSettings = jsonSettings.possibleSettings[ths.parentElement.id];
  let currentVal = ths.parentElement.childNodes[2].innerHTML;
  let newIndex = currentSettings.indexOf(currentVal) + forback;
  if(jsonSettings.possibleSettings[ths.parentElement.id][newIndex]) {
    ths.parentElement.childNodes[2].innerHTML = jsonSettings.possibleSettings[ths.parentElement.id][newIndex];
  };
};
var createSettings = function() {
  while (actualSettings.firstChild) {
    actualSettings.removeChild(actualSettings.firstChild);
  };
  for(var data in jsonSettings.actualSettings) {
    var line = document.createElement("p");
    var back = document.createElement("button");
    var values = document.createElement("span");
    var forward = document.createElement("button");
    line.id = data;
    line.innerHTML = data + ": ";
    back.type = "button";
    back.onclick = function() {
      setButtSettings(this, -1);
    };
    back.innerHTML = "&#8249;";
    values.innerHTML = jsonSettings.actualSettings[data];
    forward.type = "button";
    forward.onclick = function() {
      setButtSettings(this, 1);
    };
    forward.innerHTML = "&#8250;";
    line.appendChild(back);
    line.appendChild(values);
    line.appendChild(forward);
    actualSettings.appendChild(line);
  };
  var applySettings = document.createElement("button");
  applySettings.type = "button";
  applySettings.innerHTML = "Apply";
  applySettings.id = "applyset";
  applySettings.onclick = function() {
    for(var i = 0; i < actualSettings.childNodes.length - 1; i++) {
      jsonSettings.actualSettings[actualSettings.childNodes[i].id] = actualSettings.childNodes[i].childNodes[2].innerHTML;
    };
    writeSettings();
  };
  actualSettings.appendChild(applySettings);
};
