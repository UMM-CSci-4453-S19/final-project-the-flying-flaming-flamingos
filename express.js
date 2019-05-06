var express = require('express'),
    app = express(),
    port = process.env.PORT || 1337;
var neo4j = require("neo4j-driver");
neo4j = neo4j.v1;

var driver = neo4j.driver("bolt://csci-4409.morris.umn.edu:7687", neo4j.auth.basic("tempadmin", "dbfgnomes"));

var session = driver.session();

app.use(express.static(__dirname + '/public'));

app.get("/login", function (req, res) {
    var email = req.query['email'];
    var password = req.query['password'];
    var flag = true;

    session
        .run("MATCH (n:user {email:'" + email + "'}) RETURN n")
        .subscribe({
            onNext: function (record) {
                flag = false;
                console.log(record);
                if (record._fields[0].properties.password == password) {
                    res.status(200).send("success");
                } else {
                    res.status(400).send("You entered your password INCORRECTLY!");
                    errorMessage = "You entered your password INCORRECTLY!";
                }
            },
            onCompleted: function (record) {
                if (flag) {
                    res.status(400).send("there is no profile with that email")
                }
            }
        })


});

app.get("/signup", function (req, res) {
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
                onNext: function (record) {
                    flag = false;
                },
                onCompleted: function (record) {

                    if (flag) {
                        session
                            .run("CREATE (n:user{email:'" + email + "', password:'" + password + "'})")
                            .subscribe({
                                onCompleted: function (n) {
                                    res.status(200).send("success")
                                }
                            });
                    } else {
                        res.status(400).send("profile already exists with given email");
                    }
                }
            })
    }
});

app.get("/profile", function (req, res) {
    res.status(200).sendFile("/profile/profile.html", {root: __dirname + '/public/'});
});

app.listen(port);