"use strict";
document.onkeydown = function(e) {
  dropdown.hide(100);
  switch(e.keyCode) {
    case 13:
      e.preventDefault();
      if(forms.innerHTML !== "") {
        document.getElementById("submitinput").click();
      }
      else if(formsitems.innerHTML !== "") {
        document.getElementById("submitinput").click();
      }
      else {
        enter.click();
      };
      break;
    case 27:
      e.preventDefault();
      if(settings.style.display === "none" || settings.style.display === "") {
        openSet.click();
      }
      else {
        document.getElementById("closeset").click();
      };
      break;
    case 37:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = document.getElementById("inputnum").min;
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        document.getElementsByName("choice")[0].checked = true;
      }
      else {
        west.click();
      };
      break;
    case 38:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) + 1;
        if(parseInt(document.getElementById("inputnum").value) > parseInt(document.getElementById("inputnum").max)) {
          document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) - 1;
        };
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        for(var i = 0; i < document.getElementsByName("choice").length; i++) {
          if(document.getElementsByName("choice")[i].checked === true) {
            if(i === 0) {
              return;
            };
            document.getElementsByName("choice")[i-1].checked = true;
          };
        };
      }
      else {
        north.click();
      };
      break;
    case 39:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = document.getElementById("inputnum").max;
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        for(var i in document.getElementsByName("choice")) {
          document.getElementsByName("choice")[document.getElementsByName("choice").length - 1].checked = true;
        };
      }
      else {
        east.click();
      };
      break;
    case 40:
      e.preventDefault();
      if(forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementById("inputnum")) {
        document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) - 1;
        if(parseInt(document.getElementById("inputnum").value) < parseInt(document.getElementById("inputnum").min)) {
          document.getElementById("inputnum").value = parseInt(document.getElementById("inputnum").value) + 1;
        };
      }
      else if((forms.innerHTML !== "" && forms.firstChild.firstChild === document.getElementsByName("choice")[0]) || (formsitems.innerHTML !== "" && formsitems.firstChild.firstChild === document.getElementsByName("choice")[0])) {
        for(var i = 0; i < document.getElementsByName("choice").length; i++) {
          if(document.getElementsByName("choice")[i].checked === true) {
            if(i === document.getElementsByName("choice").length - 1) {
              return;
            };
            document.getElementsByName("choice")[i+1].checked = true;
            return;
          };
        };
      }
      else {
        south.click();
      };
      break;
    case 67:
      if(character.style.display === "none" || character.style.display === "") {
         openChar.click();
      }
      else if(character.style.display === "initial") {
         document.getElementById("closechar").click();
      };
      break;
    case 73:
      if(inventory.style.display === "none" || inventory.style.display === "") {
        openInv.click();
      }
      else if(inventory.style.display === "initial") {
        document.getElementById("closeinv").click();
      };
      break;
  };
};

enter.onclick = function() {
  if(inside <= 0) {
    m("What size labyrinth would you like to enter?");
    a("");
    enter.style.display = "none";
    document.getElementById("welcome").style.display = "none";
    document.getElementById("buttons").style.top = "-25%";
    createInputNum(5, 15, defaultSize);
    document.getElementById("submitinput").onclick = function() {
      if(document.getElementById("inputnum").value < 5 || document.getElementById("inputnum").value > 15) return;
      inputSize = document.getElementById("inputnum").value;
      size = parseInt(inputSize);
      setLabyrinth();
      a("");
      events();
      while (forms.firstChild) {
        forms.removeChild(forms.firstChild);
      };
    };
    inside = 0;
  }
  else if(inside === 2) {
    a("You're already inside!");
  }
  else if(inside > 13) {
    a("A curse lowers your life!");
    changeLife(-1);
  }
  else if(inside > 12) {
    a("I'm going to start killing you now, don't say I didn't warn you!");
  }
  else if(inside > 6) {
    a("Stop clicking that damned button!!");
  }
  else if(inside > 2) {
    a("Like I've said before, you're already inside!");
  }
  else {
    a("You're already inside");
  };
  inside += 1;
};

north.onclick = function() {
  move("y", false);
};
east.onclick = function() {
  move("x", true);
};
south.onclick = function() {
  move("y", true);
};
west.onclick = function() {
  move("x", false);
};

openInv.onclick = function() {
  if(openInv.style.display === "") return;
  inventory.style.display = "initial";
};
document.getElementById("closeinv").onclick = function() {
  inventory.style.display = "none";
};
dragBar.onmousedown = function(e) {
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
    inventory.style.left = deltaX + inventory.offsetLeft + "px";
    inventory.style.top = deltaY + inventory.offsetTop + "px";
    startX = e.clientX;
    startY = e.clientY;
  };
};

openSet.onclick = function() {
  if(openSet.style.display === "") return;
  settings.style.display = "initial";
  createSettings();
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

openChar.onclick = function() {
  if(openChar.style.display === "") return;
  character.style.display = "initial";
};
document.getElementById("closechar").onclick = function() {
  character.style.display = "none";
};
charDragBar.onmousedown = function(e) {
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
    character.style.left = deltaX + character.offsetLeft + "px";
    character.style.top = deltaY + character.offsetTop + "px";
    startX = e.clientX;
    startY = e.clientY;
  };
};
