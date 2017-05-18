"use strict";
const $ = require("jquery");
const fs = require("fs");
var jsonItems = $.getJSON("../../Data/Items.json", function(json) {
  jsonItems =  json;
});
const easy = ["treasure", "key"];
const normal = ["treasureTwo", "keyTwo1", "keyTwo2"];
const hard = ["treasureThree", "keyThree1", "keyThree2", "keyThree3"];
var rooms = ["goblin", "chest", "randomTrap", "merchant", "lab", "riddle", "sky", "daedalus", "teleporter"];
var traps = ["boulder", "pitfall"];
var jsonSettings;
var difficulty;
var defaultSize;
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
