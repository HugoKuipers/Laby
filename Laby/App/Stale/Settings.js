"use strict";
const $ = require("jquery");
const fs = require("fs");
const easy = ["treasure", "key"];
const normal = ["treasureTwo", "keyTwo1", "keyTwo2"];
const hard = ["treasureThree", "keyThree1", "keyThree2", "keyThree3"];
var difficulty;
var jsonSettings;
// var jsonSettings = $.getJSON("Data/Settings.json", function(json) {
//   jsonSettings = json;
//   var diff = jsonSettings.difficulty;
//   switch (diff) {
//     case "easy":
//       difficulty = easy;
//       break;
//     case "normal":
//       difficulty = normal;
//       break;
//     case "hard":
//       difficulty = hard;
//       break;
//   };
//   var preferSize = jsonSettings.defaultSize
// });
var openSet = document.getElementById("openset");
var settings = document.getElementById("settings");
var settingsDragBar = document.getElementById("settingsdragbar");

fs.readFile("Data/Settings.json", function(err, data) {
  if(err) return
  jsonSettings = JSON.parse(data);
});

var writeSettings = function() {
  let jsonSettingsString = JSON.stringify(jsonSettings);
  fs.writeFile("Data/Settings.json", jsonSettingsString, function(err) {
    if(err) return
  });
}

openSet.onclick = function() {
  if(openSet.style.display === "") return;
  settings.style.display = "initial";
};
document.getElementById("closeset").onclick = function() {
  settings.style.display = "none";
};
settingsDragBar.onmousedown = function(e) {
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
    settings.style.left = deltaX + settings.offsetLeft + "px";
    settings.style.top = deltaY + settings.offsetTop + "px";
    startX = e.clientX;
    startY = e.clientY;
  };
};
