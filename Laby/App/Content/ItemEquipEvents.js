itemEquipEvents = function(id, e) {
  unequipDrop.off("click");
  useEquipDrop.off("click");
  equipDrop.show(150);
  equipDrop.css({
    top: e.clientY,
    left: e.clientX
  });
  setTimeout(function() {
      $(document).one("mousedown", function(e) {
        if(e.target.className === "fullEquip" || e.target.id === "equipuse" || e.target.id === "unequip") return;
        hideDropDown();
      });
  }, 1);
  unequipDrop.click(function() {
    changeInventory(id, true);
    y("You have unequipped the " + id);
    hideDropDown();
  });
  useEquipDrop.click(function() {
    useItemEquipEvents(id);
    hideDropDown();
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
