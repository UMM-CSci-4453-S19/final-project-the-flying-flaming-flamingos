var express = require('express'),
  app = express(),
  port = process.env.PORT || 1337;
var neo4j = require("neo4j-driver");
neo4j = neo4j.v1;

var driver = neo4j.driver("bolt://csci-4409.morris.umn.edu:7687", neo4j.auth.basic("tempadmin", "dbfgnomes"));

var session = driver.session();

app.use(express.static(__dirname + '/public'));

app.get("/login", function(req, res) {
  var email = req.query['email'];
  var password = req.query['password'];
  var flag = true;

  session
    .run("MATCH (n:user {email:'" + email + "'}) RETURN n")
    .subscribe({
      onNext: function(record) {
        flag = false;
        console.log(record);
        if (record._fields[0].properties.password == password) {
          res.status(200).send(email);
        } else {
          res.status(400).send("You entered your password INCORRECTLY!");
          errorMessage = "You entered your password INCORRECTLY!";
        }
      },
      onCompleted: function(record) {
        if (flag) {
          res.status(400).send("there is no profile with that email")
        }
      }
    })


});

app.get("/signup", function(req, res) {
  var email = req.query['email'];
  var password = req.query['password'];
  var passwordRepeat = req.query['passwordRepeat'];
  var flag = true;

  if (password != passwordRepeat) {
    res.status(400).send("the passwords do not match");
  } else {
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
                onCompleted: function(n) {
                  res.status(200).send(email)
                }
              });
          } else {
            res.status(400).send("profile already exists with given email");
          }
        }
      })
  }
});

app.get("/profile", function(req, res) {
  res.status(200).sendFile("/profile/profile.html", {
    root: __dirname + '/public/'
  });
});

app.get("/match", function(req, res) {
  var firstname = req.query['firstname'];
  var lastname = req.query['lastname'];
  var gender = req.query['gender'];
  var records = [];

  session.run("MATCH (n:person {gender:'" + gender + "'}) WHERE n.firstName =~ '(?i)" + firstname + ".*' AND n.lastName =~ '(?i)" + lastname + ".*' RETURN n")
    .subscribe({
      onNext: function(record) {
        records.push(record);
      },
      onCompleted: function(record) {
        res.status(200).send(records);
      }
    })
});

app.get("/linkPerson", function(req, res) {
  console.log("inside linkPerson in express")
  var email = req.query['email'];
  var firstname = req.query['firstname'];
  var lastname = req.query['lastname'];
  var gender = req.query['gender'];
  var dob = req.query['dob'];

  console.log("inside appget linkPerson");
  console.log(email, firstname, lastname, gender, dob);

  // creating person node
  session.run("MATCH (n:user {email:'" + email + "'}) MERGE (n)-[:isPerson]->(m: person {firstName:'" + firstname + "', lastName:'" + lastname + "', gender:'" + gender + "', birthDate:'" + dob + "'})")


    //session.run("MERGE (m:person {firstName:'" + firstname + "',lastName:'" + lastname + "',gender:'" + gender + "',birthDate:'" + dob + "'})")
    //session.close();
    //session.run("MATCH (n:user {email:'" + email + "'}), (m:person {firstName:'" + firstname + "', lastName:'" + lastname + "'}) MERGE (n)-[r:isUser]->(m)")

    .subscribe({
      onCompleted: function() {
        console.log("link person session onComplete i am here")
      }
    })

  session.close();
});


app.get("/registeredProfile", function(req, res) {
  console.log("inside registeredProfile in express")
  res.status(200).sendFile("/profile/registeredProfile.html", {
    root: __dirname + '/public/'
  });
})



app.listen(port);