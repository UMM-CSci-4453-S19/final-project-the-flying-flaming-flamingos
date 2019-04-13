var credentials = require('./credentials.json'),
  express = require('express'),
  mysql = require("mysql"),
  app = express(),
  port = process.env.PORT || 1337;

credentials.host = 'ids.morris.umn.edu';
var connection = mysql.createConnection(credentials);

connection.connect(function(err) {
  if (err) {
    console.log("Problems with MySQL: " + err);
  } else {
    console.log("Connected to Database.");
  }
});

app.use(express.static(__dirname + '/public'));

app.get("/click", function(req, res) {
  var id = req.param('id');
  var sql = 'YOUR SQL HERE'
  console.log("Attempting sql ->" + sql + "<-");

  connection.query(sql, (function(res) {
    return function(err, rows, fields) {
      if (err) {
        console.log("We have an insertion error:");
        console.log(err);
      }
      res.send(err); // Let the upstream guy know how it went
    }
  })(res));
});

app.get("/login", function(req, res) {
  // getting the email entered in the form
  var emailAddress = document.getElementById("authentication-form");
  var sql = "SELECT EXISTS(SELECT 1 FROM users WHERE email=" + emailAddress + ");";
  console.log("searching if email address exists in database...");
});



app.listen(port);