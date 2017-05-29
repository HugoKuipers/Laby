itemEquipEvents = function(id, e) {
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
        dropdown.hide(100);
      });
  }, 1);
  dropDrop.click(function() {
    changeInventory("-" + id, true);
    y("You have dropped the " + id);
    dropdown.hide(100);
  });
  useDrop.click(function() {
    useItemEquipEvents(id);
    dropdown.hide(100);
  });
};
useItemEquipEvents = function(id) {
  switch (id) {
    case "Makeshift Club":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "goblin":
          useItemEvents(id);
          break;
        default:
          if(dontUseThat()) return;
          y("Ban...Kai");
      };
      break;
    case "Wooden Sword":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "":
          useItemEvents(id);
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "":
          useItemEvents(id);
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "":
          useItemEvents(id);
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
    break;
    case "":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "":
          useItemEvents(id);
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
    case "":
      switch (laby.rows[player.y].cells[player.x].id) {
        case "":
          useItemEvents(id);
          break;
        default:
          if(dontUseThat()) return;
          y("");
      };
      break;
  };
};
