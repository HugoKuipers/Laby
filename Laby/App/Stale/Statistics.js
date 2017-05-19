"use strict";
var readStats = function() {
    fs.readFile("Data/Statistics.json", function(err, data) {
      if(err) {
        let emptyStats = {
          "clearTimes": 0,
          "largestSizeClear": 0,
          "mostGoldTakenHome": 0,
          "goldTakenHome": 0,
          "totalGold": 0,
          "mostPoints": 0,
          "pointsTotal": 0
        };
        let allEmptyStats = {
          total: emptyStats,
          easy: emptyStats,
          normal: emptyStats,
          hard: emptyStats
        };
        let jsonEmptyStats = JSON.stringify(allEmptyStats);
        fs.writeFile("Data/Statistics.json", jsonEmptyStats, function(err) {
          if(err) return;
          readStats();
        });
      }
      else {
        jsonStats = JSON.parse(data);
      };
    });
};
readStats();

var writeStats = function() {
  let jsonStatsString = JSON.stringify(jsonStats);
  fs.writeFile("Data/Statistics.json", jsonStatsString, function(err) {
    if(err) return;
  });
};

var editStats = function(clear) {
  let total = "total";
  for(var i = 0; i < 2; i++) {
    if (i === 1) {
      switch (difficulty.length) {
        case 2:
          total = "easy"
          break;
        case 3:
          total = "normal"
          break;
        case 4:
          total = "hard"
          break;
      };
    };
    if(clear) {
      jsonStats[total].clearTimes += 1;
      if(jsonStats[total].largestSizeClear < size) jsonStats[total].largestSizeClear = size;
      if(jsonStats[total].mostGoldTakenHome < player.gold) jsonStats[total].mostGoldTakenHome = player.gold;
      jsonStats[total].goldTakenHome += player.gold;
      jsonStats[total].totalGold += player.gold;
      if(jsonStats[total].mostPoints < player.points) jsonStats[total].mostPoints = player.points;
      jsonStats[total].pointsTotal += player.points;
    }
    else {
      jsonStats[total].totalGold += player.gold;
    };
  };
  writeStats();
};
