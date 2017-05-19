"use strict";
var readStats = function() {
  fs.readFile("Data/Statistics.json", function(err, data) {
    if(err) return;
    jsonStats = JSON.parse("Data/Statistics.json");
  });
};

readStats();

var writeStats = function() {
  
};
