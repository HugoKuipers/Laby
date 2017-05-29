"use strict";
attEvents = function() {
  switch (laby.rows[player.y].cells[player.x].id) {
    case "goblin":
      m("");
      break;
    default:
      y("Cry havoc");
  };
};

defEvents = function() {
  switch (laby.rows[player.y].cells[player.x].id) {
    case "goblin":
      m("");
      break;
    default:
      y("release the kraken... to defend yourself during this button test.");
  };
};
