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
  var username = req.param("user");
  console.log("username:"+username);
  var sql = "SELECT count(*) as c FROM FFF.users WHERE username='" + username + "';";
  console.log("searching if email address exists in database...");

    connection.query(sql, (function(res) {
        return function(err, rows, fields) {
            if (err) {
                console.log("We have an error:");
                console.log(err);
            }
            if(rows[0].c==0){
                res.send("could not login");
            }else {
                app.use(express.static("public" + '/profile'));
            }
            res.send(err); // Let the upstream guy know how it went
        }
    })(res));
});

app.get("/profile",function (req,res) {
    res.send("../profile.html", {root: __dirname + '/public/'});
});

app.listen(port);