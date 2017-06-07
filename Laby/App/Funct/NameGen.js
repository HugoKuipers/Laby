"use strict";
nameGen = function() {
  var nameLength = 3 + Math.floor(Math.random()*7);
  var firstLetter = String.fromCharCode(65 + Math.floor(Math.random()*26));
  var vowelsCatOne = ["a", "e"];
  var vowelsCatTwo = ["a", "e", "i", "u", "o"];
  var vowelsCatThree = ["a", "e", "i", "u", "o", "y"];
  var vowelCheck = ["y"];
  var consonantsCatOne = ["n", "l", "r", "s", "t"];
  var consonantsCatTwo = ["n", "l", "r", "s", "t", "h", "d", "m", "c", "j", "k", "b"];
  var consonantsCatThree = ["q", "w", "r", "t", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
  var consonantCheck = ["q", "w", "p", "f", "g", "z", "x", "v",];
  var madeUpName = firstLetter;
  var checkLetter = firstLetter.toLowerCase();
  var prevLetter = "";
  var nextLetterCV = "";
  for(var i = 1; i < nameLength; i++) {
    if(vowelCheck.includes(checkLetter)) {
      nextLetterCV = "C";
    }
    else if(consonantCheck.includes(checkLetter)) {
      nextLetterCV = "V";
    }
    else if(vowelsCatThree.includes(checkLetter) && vowelsCatThree.includes(prevLetter)) {
      nextLetterCV = "C";
    }
    else if(consonantsCatThree.includes(checkLetter) && consonantsCatThree.includes(prevLetter)) {
      nextLetterCV = "V";
    }
    else if(vowelsCatThree.includes(checkLetter)) {
      if(Math.floor(Math.random()*3) === 2) {
        nextLetterCV = "V";
      }
      else {
        nextLetterCV = "C";
      };
    }
    else if(consonantsCatThree.includes(checkLetter)) {
      if(Math.floor(Math.random()*3) === 2) {
        nextLetterCV = "C";
      }
      else {
        nextLetterCV = "V";
      };
    }
    else {
      if(Math.floor(Math.random()*2) === 1) {
        nextLetterCV = "C";
      }
      else {
        nextLetterCV = "V";
      };
    };
    var pickCat = Math.floor(Math.random()*5);
    if(nextLetterCV === "C") {
      if(pickCat === 0 || pickCat === 1) {
        if(consonantsCatThree.includes(checkLetter)) {
          pickCat = consonantsCatTwo;
        }
        else {
          pickCat = consonantsCatThree;
        };
      }
      else if(pickCat === 2 || pickCat === 3) {
        pickCat = consonantsCatTwo;
      }
      else if(pickCat === 4) {
        pickCat = consonantsCatOne;
      };
    }
    else if(nextLetterCV === "V") {
      if(pickCat === 0 || pickCat === 1) {
        if(vowelsCatThree.includes(checkLetter)) {
          pickCat = vowelsCatTwo;
        }
        else {
          pickCat = vowelsCatThree;
        };
      }
      else if(pickCat === 2 || pickCat === 3) {
        pickCat = vowelsCatTwo;
      }
      else if(pickCat === 4) {
        pickCat = vowelsCatOne;
      };
    };
    prevLetter = checkLetter;
    checkLetter = pickCat[Math.floor(Math.random()*pickCat.length)];
    madeUpName += checkLetter;
  };
  if(allGenNames.includes(madeUpName)) {
    nameGen();
  }
  else {
    allGenNames.push(madeUpName);
    return madeUpName;
  };
};
