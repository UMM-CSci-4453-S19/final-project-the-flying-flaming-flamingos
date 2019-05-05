var express = require('express'),
  app = express(),
  port = process.env.PORT || 1337;
var neo4j = require("neo4j-driver");
neo4j = neo4j.v1;

var driver = neo4j.driver("bolt://csci-4409.morris.umn.edu:7687", neo4j.auth.basic("tempadmin", "dbfgnomes"));

var session = driver.session();

app.use(express.static(__dirname + '/public'));

app.get("/click", function(req, res) {
  //
});

app.get("/login", function(req, res) {
  //

    var email = req.query['email'];
    var password = req.query['password'];
    var flag = true;
    var errorMessage;
    console.log(email, password);


        console.log("passwords match")
        session
            .run("MATCH (n:user {email:'" + email + "'}) RETURN n")
            .subscribe({
                onNext: function(record) {
                    flag = false;
                    console.log(record)
                    if (record._fields[0].properties.password == password) {

                        console.log("logging in")
                    } else {
                        errorMessage = "You entered your password INCORRECTLY!";
                    }
                    console.log(record._fields[0].properties.email)
                    console.log(record);
                }
            })


});

app.get("/signup", function(req, res) {
  console.log("i made it to signup on express.js")
  //
  var email = req.query['email'];
  var password = req.query['password'];
  var passwordRepeat = req.query['passwordRepeat'];
  var flag = true;
  var errorMessage;
  console.log(email, password, passwordRepeat)

  if (password != passwordRepeat) {

    console.log("the passwords do not match")

    // $scope.errorMessage = "Passwords do NOT match!";
    console.log("Hey! you are in the if password statement")

  } else {
    console.log("passwords match")
    session
      .run("MATCH (n:user {email:'" + email + "'}) RETURN n")
      .subscribe({
        onNext: function(record) {
          flag = false;

        },
        onCompleted: function(record) {

          if (flag) {
            session
              .run("CREATE (n:user{email:'" + email + "', password:'" + password + "'})")
                .subscribe({
                    onCompleted: function (n) {
                      console.log(n);
                        res.status(200).send("success")
                            //.sendFile("/profile/profile.html",{root: __dirname + '/public/'});
                        //console.log(res);
                    }
                });

          }
          console.log("onCompleted");
          console.log(record);
        }
      })

  }
});

app.get("/profile", function(req, res) {
  // res.send("../profile.html", {
  //   root: __dirname + '/public/'
  // });
    console.log("in profile api");
    res.status(200).sendFile("/profile/profile.html",{root: __dirname + '/public/'});
    console.log("finished profile api");
});

app.listen(port);