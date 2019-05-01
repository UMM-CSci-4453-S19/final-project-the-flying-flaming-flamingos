var express = require('express'),
  app = express(),
  port = process.env.PORT || 1337;
var neo4j = require("neo4j-driver");
neo4j = neo4j.v1;

// find a way to use credentials
var driver = neo4j.driver("bolt://csci-4409.morris.umn.edu:7687", neo4j.auth.basic("neo4j", "neo4j"));

var session = driver.session();

session
  .run("MATCH (n) RETURN COUNT(n)")
  .subscribe({
    onNext: function (record) {
      console.log(record);
    },
    onCompleted: function () {
      session.close();
    },
    onError: function (error) {
      console.log(error);
    }
  });

app.use(express.static(__dirname + '/public'));

app.get("/click", function (req, res) {
  //
});

app.get("/login", function (req, res) {
  //
});

app.get("/profile", function (req, res) {
  res.send("../profile.html", {
    root: __dirname + '/public/'
  });
});

app.listen(port);