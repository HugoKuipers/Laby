"use strict";
events = function() {
  if(cancelThisFunction()) return;
  switch(laby.rows[player.y].cells[player.x].id) {
    case "goblin":
      var goblinAttack = function() {
        cancelableTimer = setTimeout(function() {
          if(laby.rows[player.y].cells[player.x].id === "goblin") {
            if(attackAmount < 3) {
              m("After a while of staring at eachother, the goblin seems to make up it's mind. Suddenly it rushes at you and attacks with a makeshift club.");
              changeLife(-1);
              attackAmount += 1;
              cancelableTimer = setTimeout(function() {
                m("The goblin has taken some distance from you again, and is looking at you expectantly, almost as if it hopes you will just leave. Again it shouts something.");
                goblinAttack();
              }, 5000);
            }
            else if(attackAmount === 3) {
              m("Again the goblin attacks. After having seen it's attack up close, too close, a few times, you read the clubs trajectory and evade. The goblin loses it's balance, stumbles, and falls, and the club flies out of it's hands. You take the fallen club and use it to easily dispatch your fallen adversary.<br>You have gained a Makeshift Club.");
              changeInventory("Makeshift Club");
              attackAmount += 1;
              laby.rows[player.y].cells[player.x].id = "goblinDead";
            };
          };
        }, 5000);
      };
      m("You turn a corner and see a goblin staring at you from a distance, it seems unsure of how to react to your presence in what appears to be it's home. It shouts something at you in a language you don't understand.");
      if(attackAmount <= 3) {
        goblinAttack();
      };
      break;
    case "goblinDead":
      m("You return to what was once the home of a goblin, but is now nothing more than a heap of junk, not much has changed really. A foul odor eminates from the rotting carcass of the goblin. Best to leave quickly.");
      cancelableTimer = setTimeout(function() {
        m("Your eyes begin to water, your head start to spin, the smell of death is all around you, you have to get out of here.");
        cancelableTimer = setTimeout(function() {
          var goldLoss = Math.floor((Math.random()*11)+10);
          m("Your conciousness starts to fade, slowly everything goes black as you slip into a deep sleep. When you wake up it feels af if a considerable amount of time has passed. Looking around you notice the absence of the goblin's carcass, and the smell that accompanies it. As you get up your pockets feel lighter than you remember, it seems you have been robbed while you were out cold.");
          changeGold(-goldLoss);
          changeInventory("-random");
        }, 10000);
      }, 10000);
      laby.rows[player.y].cells[player.x].id = "goblinDeadGone";
      break;
    case "treasure":
      m("A giant orb made of some kind of metal floats in the air before you, a pedestal stands in it's shadow, requiring some kind of key to activate and unlock it's secrets.");
      laby.rows[player.y].cells[player.x].id = "treasureSeen";
      break;
    case "treasureSeen":
      if(questionAnswer === "Yes") {
        m("You decide to leave the labyrinth alive, much richer than when you first entered.");
        exitLabyrinth();
      }
      else if(questionAnswer === "No") {
        m("There are still many treasures to find, adventures to live, and gold to plunder. You decide to keep exploring the labyrinth.");
        laby.rows[player.y].cells[player.x].id = "exit";
      }
      else {
        m("You return to the giant floating orb. You know that it is important, but don't understand how exactly.");
      };
      break;
    case "exit":
      if(questionAnswer === "Yes") {
        m("You decide to leave the labyrinth alive, much richer than when you first entered.");
        exitLabyrinth();
      }
      else if(questionAnswer === "No") {
        m("You decide to keep exploring the labyrinth.");
      }
      else {
        m("The portal that opened up here still remains, releasing an enticing glow.<br>Would you like to exit the labyrinth?");
        createInputOpt(["Yes", "No"], "No", forms);
      };
      break;
    case "key":
      m("While strolling through on of the more abandoned sections of the labyrinth, you start to notice an almost unnatural silence hanging around. Looking around you see some object reflecting light from the corner of your eye. As you approach you realize it isn't actually reflecting the light, but rather giving it off. Standing before it you suddenly feel compelled to pick it up. Unable to fight the urge you stretch your hand out and touch the object, and when you do your head is flooded with information of it's purpose, you know that this is a key, a key that you cannot afford to lose.<br>You have gained the Labyrinth Key.");
      changeInventory("Labyrinth Key");
      laby.rows[player.y].cells[player.x].id = "keyGone";
      break;
    case "keyGone":
      m("When you return to the location of the key, it is buzzing with sounds, almost as if some kind of spell has been lifted. As you approach however, these sounds start to die out once more. You feel as if you're intruding somewhere you shouldn't, and decide to leave.");
      break;
    case "randomTrap":
      laby.rows[player.y].cells[player.x].id = traps[Math.floor(Math.random()*traps.length)];
      events();
      break;
    case "boulder":
      m("As you walk through a narrow hallway with a small decline you start hear a faint rumbling in the distance, getting louder and louder, with a shock you realize that a boulder is heading for you. You start running as fast as you can, but the boulder is faster, just before you get crushed you jump in an side alley, the boulder scratching your back and knocking you down.");
      a("You have lost 2 life.");
      changeLife(-2);
      laby.rows[player.y].cells[player.x].id = "knownBoulder";
      break;
    case "pitfall":
      m("You notice a badly hidden pitfall, leaves over a hole in the middle of a marble floor, and simply avoid it. 'Only a fool would fall for such a pitiful trap' you remark, and spend a while laughing about that ingenius pun you just made.");
      laby.rows[player.y].cells[player.x].id = "knownPitfall";
      break;
    case "knownBoulder":
      m("Once more you challange the long hallway, native habitat of the boulder, wishing to know what lies at the end. You know what will come, so you start running long before you hear the rumbling. just when the passage starts to widen out the boulder hits your back. You get thrown forward, into a room filled with precious gems. For a single moment you admire the sight, then all goes black.");
      a("You got crushed by a boulder.");
      player.life = 1;
      changeLife(-1);
      break;
    case "knownPitfall":
      m("You rush through a marble ruin, vaguely remembering a great joke you made while exploring it, when you lose the ground beneath your feet. You tumble into a deep hole and with a loud crash land on a pile of junk. When you come to your senses and look around you find yourself far away from the ruin, in a different section of the labyrinth.");
      a("You have lost 1 life.");
      changeLife(-1);
      randomMove();
      break;
    case "chest":
      if(questionAnswer === "Yes") {
        var openSucces = Math.floor(Math.random()*(4+player.luck)/3)
        if(openSucces >= 1) {
          var goldGain = Math.floor((Math.random()*21)+15+player.luck);
          m("You slowly open the chest, wary for any traps, but nothing happens. You find the chest filled with gold as well as a strange artifact.<br>You have gained a Strange Artifact.");
          changeGold(goldGain);
          changeInventory("Strange Artifact");
          laby.rows[player.y].cells[player.x].id = "chestOpen";
        }
        else{
          m("You gleefully open the chest, already picturing the treasures within, triggering a trap in the process. Spears fly at you from all directions, it takes all your concentration and agility to avoid them. Finally they stop coming. It feels like hours have passed, but it was propably just minutes. When you have caught your breath you take a look around, seeking the chest that caused all this, but it is nowhere to be found.");
          a("You have lost 1 life.")
          changeLife(-1);
          laby.rows[player.y].cells[player.x].id = "chestGone";
          addEvent("chest");
        };
      }
      else if(questionAnswer === "No") {
        m("You take a good look around and notice small holes in the walls around you, all pointing towards the chest. The whole situation just reeks of a trap, better to leave this one alone.");
        laby.rows[player.y].cells[player.x].id = "chestGone";
        addEvent("chest");
      }
      else {
        m("You find an unopened treasure chest, it's not even hidden at all, just lying about in the open.<br>Would you like to open the chest?");
        createInputOpt(["Yes", "No"], "Yes", forms);
      };
      break;
    case "chestGone":
      m("When you return to the location of the suspicious chest it is nowhere to be found.");
      laby.rows[player.y].cells[player.x].id = "";
      break;
    case "chestOpen":
      m("When you enter the room you notice a goblin running away from an open treasure chest, holding a few coins you apparently missed.");
      laby.rows[player.y].cells[player.x].id = "";
      break;
    case "merchant":
      m("While comfortably strolling around, you hear a yell behind you: 'Hey you over there, would you care to lighten your load, or perhaps add something helpfull to it?'. The merchant has now caught up with you and begins to stall out his wares, all the while making smalltalk. You find out he has been going around the labyrinth peddeling to adventurers like yourself, from his jewelry and the size of his stumach you conclude the advantage of little competiton more than makes up for the dangers of the job.<br>You can sell items from your inventory here, or buy some from the merchant. (but not right now because i don't know how....)");
      laby.rows[player.y].cells[player.x].id = "";
      addEvent("merchant");
      break;
    case "lab":
      m("In a cavern you discover an alchemical lab, it seems like it was abandoned just recently and in a hurry, and hasn't been found by the local inhabitants yet. There are old tomes and empty flasks of glass scattered about, but you lack the understanding required to really understand what the owner was trying to accomplish. Just as you start to grow bored, you notice a flask still containing some liquid behind a large pile of rocks, the owner must have missed it when they made their escape. You take the flask and want to continue looking around, but then you hear heavy footsteps approaching, and decide not to find out who, or what, they belong to.<br>You have gained a Potion.");
      changeInventory("Potion");
      laby.rows[player.y].cells[player.x].id = "labAgain";
      break;
    case "labAgain":
      m("something later");
      break;
    case "riddle":
      m("something later");
      break;
    case "nap":
      if(questionAnswer === "Yes") {
        m("napy nap nap");
        let napTime = 5 - player.life;
        if(napTime < 0) napTime = 0;
        changeLife(napTime);
        for(var i = -1; i < napTime; i++) {
          minoMove();
        };
        viewMap();
        laby.rows[player.y].cells[player.x].id = "napAgain";
      }
      else if(questionAnswer === "No") {
        m("The whole situation seems too good to be true, you'll find some other place to rest.");
        laby.rows[player.y].cells[player.x].id = "napAgain";
      }
      else {
        m("You have entered a large open space with an elevated stone platform in middle. After climbing up you behold the scenery before you: a small pond filled with crystal clear water, surrounded by a field of the flowers in the most beautiful colors, the air buzzing with bees, and a single large oak standing by the water. You are overcome with a feeling of calm, after all the dangers of the labyrinth this seems like the perfect place to get some rest.<br>Take a nap?");
        createInputOpt(["Yes", "No"], "Yes", forms);
      };
      break;
    case "napAgain":
      m("placeholder")
      break;
    case "entrance":
      m("You stand at the entrance of a massive labyrinth. You are nervous, for this labyrinth is known to be the death of many a brave adventurer. You take a deep breath, light your torch, and step inside. With a loud rumbling the entrance closes behind you on it's own, there is no way back now.");
      laby.rows[player.y].cells[player.x].id = "returnEntrance";
      break;
    case "returnEntrance":
      m("The entrance is still closed, there is no way out here.");
      break;
    case "teleporter":
      if(questionAnswer === "Yes") {
        m("blablabal");
      }
      else if(questionAnswer === "No") {
        m("blablabal");
      }
      else {
        m("A secret passage leads you to a small room, dominated by a large circle that is drawn on the floor and filled with strange runes, in the middle of the circle you notice a peculier hole. You are fairly certain this is a magic formation, although if you don't know it's purpose. Once you inspect the room a little closer you see a lever hidden in a corner.<br>Pull the lever?");
        createInputOpt(["Yes", "No"], "Yes", forms);
      };
      break;
    case "daedalus":
      m("A ray of sun shines through a broken part of the labyrinth's ceiling, it touches a large hill covered with beautiful flowers. High on the hill a bronze statue of a boy catches your eye, a wooden framework sprouting from it's back. A strange presence fills the room, giving you goosebumps, it seems to demand you to do something for it, but you are unsure what that would be.");
      laby.rows[player.y].cells[player.x].id = "returnDaedalus";
      break;
    case "returnDaedalus":
      m("On the hill the statue still stands. You climb to the top of the hill, while looking out over the surroundings you suddenly feel lightheaded, for a brief moment an image of a boy flying through the sky appears in you mind, and then it is gone. Again you feel the presence, it still wants something from you.");
      break;
    case "destroyDaedalus":
      m("");
    case "beehive":
      break;
    case "apprentice":
      break;
    case "booty":
      if(player.luck === Math.floor(labyrinth.width*size*0.1)) {
        m("You notice a small hole in the wall, you stick your finger inside, because why not right? The stones start to shift and an passage is formed.");
        laby.rows[player.y].cells[player.x].id = "bootyFound";
      }
      else {
        m("Geen idee joh");
        laby.rows[player.y].cells[player.x].id = "returnBooty";
      };
      break;
    case "returnBooty":
      if(player.luck === Math.floor(labyrinth.width*size*0.1)) {
        m("You notice a small hole in the wall, you stick your finger inside, because why not right? The stones start to shift and an passage is formed.");
        laby.rows[player.y].cells[player.x].id = "bootyFound";
      }
      else {
        m("Geen idee joh");
      };
      break;
    case "bootyFound":
      break;
    default:
      if(laby.rows[player.y].cells[player.x].classList.contains("explored")) {
        m("You backtrack quickly through a previously explored section of the labyrinth.");
      }
      else {
        var coinFind = Math.floor(Math.random()*(10+player.luck)/9);
        if(coinFind >= 1) {
          m("You find a lone gold coin lying around in an otherwise deserted hallway.");
          changeGold(1);
        }
        else {
          m("This section of the labyrinth appears to be empty.");
        };
      };
  };
};
