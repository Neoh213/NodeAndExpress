/*
      This is practice for building apps with node,express and linking it to mysql
*/

//required variables to allow express, mysql and node to function
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser")

//faker is used to insert made up data
var faker = require('faker');
//this variable stores the decibel abount to be displayed to the user.
var newDecibel;

//needed for express and to parse info
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));

//sets and links up to the mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'DJ',
  database : 'practice',
  password : ''   //your root user's password
});

//home page and shows the count of the stores on the command terminal
app.get("/", function(req, res){
      var info = "SELECT COUNT(*) as count FROM videogame";
      connection.query(info, function(err, results) {
      if(err) throw err;
      var count = results[0].count;
      //renders the home page.
      var num_of_levels = 0;
      var highscore = 0;
      var title = req.body.title;
      res.render("high", {num_of_levels: num_of_levels, title: title, highscore: highscore});
      });
});

//need to get the highest value of a store
app.post("/high", function(req, res){
  var title = req.body.title;
      var info = "SELECT title, highscore, num_of_levels FROM videogame WHERE title = \'" +  title + "\' ORDER BY num_of_levels DESC LIMIT 1";
      connection.query(info, function(err, results) {
      if(err) throw err;
      var num_of_levels = results[0].num_of_levels;
      var highscore = results[0].highscore;

      //renders the home page.
      res.render("high", {num_of_levels: num_of_levels, title: title, highscore: highscore});
    //console.log("sound is: " + sound_level + " at: " + store); for debugging
      });
});
//lowest value of a store
app.post("/high", function(req, res){
  //this title might be an issue...
  var title = req.body.title;
      var info = "SELECT title, highscore, num_of_levels FROM videogame WHERE title = \'" +  title + "\' ORDER BY num_of_levels ASC LIMIT 1";


      connection.query(info, function(err, results) {
      if(err) throw err;
      var num_of_levels = results[0].num_of_levels;
      var highscore = results[0].highscore;

      //renders the home page.
      res.render("high", {num_of_levels: num_of_levels, title: title, highscore: highscore});
    //console.log("sound is: " + sound_level + " at: " + store); for debugging
      });
});


// shows decibel levels
app.get("/score", function(req, res){
    //  res.send("Decibel level is: " + newDecibel);
      res.render("decibel",{ newDecibel: newDecibel});
});



// adds data from forms to database
app.post('/register', function(req, res){
        var decibel = req.body.decibel;
        newDecibel = decibel;
        var data = [];
        //stores the items I want in an array
        data.push([
             faker.company.companyName(),
             req.body.decibel,
             req.body.highscore
        ]);

/****** this comment is only for debugging *********
/console.log(whenwhere); shows info if I need to check on particular items
console.log("decibel is " + req.body.decibel + "time is: " + req.body.time);
******** this comment is only for debugging *********/

        var q = 'INSERT INTO videogame(title, num_of_levels, highscore) VALUES ?';

        connection.query(q, [data], function(err, result) {
                  console.log(err);
                  console.log(result);
                  // for degugging:  res.send("Decibel level is: " + req.body.decibel )
                  res.redirect("/score");// to redirect page;
        });
});

/*for debugging, checks to make sure node is working
app.get("/joke", function(req,res){
    res.send("haha that's funny")
});
*/

//shows port access and prints info to the console if port is running
app.listen(3000, function(){
    console.log("Server running on 3000!")
});
