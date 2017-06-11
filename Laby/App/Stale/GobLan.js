"use strict";
var gobLan = function(array, wordtype) {
  for(var data in array) {
    switch (wordtype) {
      case "WW":
        gobLanWW(data);
        break;
    };
  };
};
var gobLanWW = function(word) {
  var startLetter = {
    "B": 1,
    "D": 1,
    "F": 1,
    "G": 1,
    "H": 1,
    "I": 1,
    "J": 1,
    "K": 1,
    "L": 1,
    "M": 1,
    "N": 1,
    "O": 1,
    "P": 1,
    "Q": 1,
    "R": 1,
    "S": 1,
    "T": 1,
    "U": 1,
    "V": 1,
    "W": 1,
    "Z": 1
  }
};
