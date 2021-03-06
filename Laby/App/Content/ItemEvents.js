"use strict";
var dontUseThat = function() {
  if(forms.firstChild || formsitems.firstChild) {
    a("You have something to do first!");
    return true;
  };
};
var defDontUseThat = function() {
  if(doNotUseThat === true) {
    a("You have something to do first!");
    return true;
  };
};
var drinkPotion = function() {
  y("You examine the potion a bit closer, it smells somewhat funny, but it should be fine to drink it. You take a small sip first... 'It tastes great!' You quickly gulp down the entire potion.");
  changeLife(2, true);
  changeInventory("-Potion");
};
itemEvents = function(id, e) {
  dropDrop.off("click");
  useDrop.off("click");
  dropdown.show(150);
  dropdown.css({
    top: e.clientY,
    left: e.clientX
  });
  setTimeout(function() {
    $(document).one("mousedown", function(e) {
      if(e.target.className === "invItems" || e.target.id === "use" || e.target.id === "drop") return;
      hideDropDown();
    });
  }, 1);
  dropDrop.click(function() {
    changeInventory("-" + id, true);
    y("You have dropped the " + id);
    hideDropDown();
  });
  useDrop.click(function() {
    useItemEvents(id);
    hideDropDown();
  });
};
useItemEvents = function(id) {
  if(defDontUseThat()) return;
  switch (id) {
    case "Labyrinth Key":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "treasureSeen":
          var goldGain = Math.floor((Math.random()*(51+(player.luck*10)))+75);
          m("You place the key on the pedestal, for a while nothing happens, then a beam of light shoot up from the pedestal to the orb. The orb begins to release light, a little at first, but it quickly becomes blinding. When the light fades a great treasure of gold lies before you, and on the pedestal a giant crystal. In the air, where the orb used to be, a large portal has opened up, leading outside.<br>You have gained the Labyrinth's Crystal.");
          changeInventory("-Labyrinth Key");
          changeGold(goldGain);
          changeInventory("Labyrinth's Crystal");
          createInputOpt(["Yes", "No"], "No", forms);
          break;
        default:
          if(dontUseThat()) return;
          y("The key is warm to the touch, and gives off a faint glow.");
      };
      break;
    case "Makeshift Club":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "goblin":
          clearTimeout(cancelableTimer);
          m("You take out your own club, when the goblin sees it, it goes pale with the realization of how you must have obtained it. It doesn't have to live in fear for long, however. One swing is all it takes.<br>You have gained a Makeshift Club.");
          changeInventory("Makeshift Club");
          laby.rows[player.y].cells[player.x].id = "goblinDead";
          break;
        default:
          if(dontUseThat()) return;
          y("You take out the club and use it to smash some trash laying about. You have fun.");
      };
      break;
    case "Labyrinth's Crystal":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "":
          m("");
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "Strange Artifact":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "inactiveTeleporter":
          y("Strange artifact, strange magic, seems like a match right? It isn't.");
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "Potion":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "goblinDead":
          if(deadGobPotTry === 0) {
            y("Magical potions can do a lot of things, but they won't raise the dead.");
            deadGobPotTry += 1;
          }
          else if(deadGobPotTry === 1) {
            y("Look what's dead stays dead, one little potion isn't going to change that.");
            deadGobPotTry += 1;
          }
          else {
            drinkPotion();
          };
          break;
        default:
          if(dontUseThat()) return;
          drinkPotion();
      };
      break;
    case "Cartography Tool":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "asdf":
          m("Empty squares are your mistake, you idiot!");
          break;
        default:
          if(dontUseThat()) return;
          if(questionAnswer === "Flag mark") {
            y("You want to remember this location, so you place a flag mark on your map.");
            laby.rows[player.y].cells[player.x].className += " flagmark";
          }
          else if(questionAnswer === "X mark") {
            y("You want to remember this location, so you place an X mark on your map.");
            laby.rows[player.y].cells[player.x].className += " xmark";
          }
          else if(questionAnswer === "Star mark") {
            y("You want to remember this location, so you place a star mark on your map.");
            laby.rows[player.y].cells[player.x].className += " starmark";
          }
          else if(questionAnswer === "No") {
            y("This place isn't really that interesting.");
          }
          else {
            y("The cartography tool can be used to mark down places of interest on your map.<br>Would you like to place a mark on your current position?");
            createInputOpt(["Flag mark", "X mark", "Star mark", "No"], "No", formsitems, id);
          };
      };
      break;
    case "Magic Scroll: Earth":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "asdf":
          m("");
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "Magic Scroll: Air":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "asdf":
          m("");
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "Magic Scroll: Fire":
      if(laby.rows[player.y].cells[player.x].classList.contains("minotaur")) {
        m("it's alive");
        return;
      };
      switch (laby.rows[player.y].cells[player.x].id) {
        case "asdf":
          m("");
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "Magic Scroll: Water":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "asdf":
          m("");
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "Geese Feathers":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "returnDaedalus":
          if(player.inventory.includes(jsonItems["Beeswax"])) {
            m("Using the beeswax as glue you attach the feathers to the wooden framework on the back of the statue,");
          }
          else {
            y("You attempt to attach the feathers to the back of the statue, however they keep falling off. You'll need something to make them stick together.");
          };
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "Beeswax":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "returnDaedalus":
          if(player.inventory.includes(jsonItems["Geese Feathers"])) {
            m("Using the beeswax as glue you attach the feathers to the wooden framework on the back of the statue,");
          }
          else {
            y("You .");
          };
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
  };
};
