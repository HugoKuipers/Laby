var webdriver = require("selenium-webdriver"),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser("chrome")
    .build();

driver.get("https://www.vernoeming.nl/nederland-2012-jongensnamen");
driver.wait(until.titleIs("Top-1000 populairste jongensnamen 2016"), 10000).then(function() {
  driver.findElement(By.className("column-3")).then(function(column) {
    var nextBut = driver.findElement(By.id("tablepress-201_next"));
    console.log(nextBut);
    while(nextBut.className !== "paginate_button next disabled") {
      driver.findElement(By.id("tablepress-201_next")).click().then(function(column) {
        for(var data in column) {
          console.log("hallo hallo");
          console.log(data);
        };
      });
    };
  });
});
driver.quit();
