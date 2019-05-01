var express = require('express'),
  app = express(),
  port = process.env.PORT || 1337;
var neo4j = require("neo4j-driver");
neo4j = neo4j.v1;

var driver = neo4j.driver("bolt://csci-4409.morris.umn.edu:7687", neo4j.auth.basic("tempadmin", "dbfgnomes"));

var session = driver.session();

app.use(express.static(__dirname + '/public'));

app.get("/click", function (req, res) {
  //
});

app.get("/login", function (req, res) {
  //
});

app.get("/signup", function (req, res) {
  console.log("i made it to signup on express.js")
  //
  var email = req.query['email'];
  var password = req.query['password'];
  var passwordRepeat = req.query['passwordRepeat'];
  console.log(email, password, passwordRepeat)

  if (password != passwordRepeat) {

    console.log("the passwords do not match")

    // $scope.errorMessage = "Passwords do NOT match!";
    console.log("Hey! you are in the if password statement")

  } else {
    console.log("passwords match")
    session
      .run("MERGE(n:user{email:'" + email + "',password:'" + password + "'}) ON CREATE SET n.email='" + email + "', n.password='" + password + "' ON MATCH RETURN count(*);")
      .subscribe({
        onCompleted: function (record) {
          if (record._fields[0].low > 0) {
            console.log("user already exists")
              .error(function () {
                $scope.errorMessage = "User already exists!";
              })
          } else {
            console.log("Success!")
              .success(function () { })
          }
          console.log(record);
        }
      });


  }

  app.use(express.static(__dirname + '/public/profile'));
  //res.status(200).sendFile("/public/profile/profile.html");

  // res.send("../profile.html", {
  //   root: __dirname + '/public/'
  // });
});

app.get("/profile", function (req, res) {
  res.send("../profile.html", {
    root: __dirname + '/public/'
  });
});

app.listen(port);