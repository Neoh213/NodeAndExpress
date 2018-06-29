var mysql = require('mysql');
var faker = require('faker');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'DJ',
  database : 'practice',
  password : ''   //your root user's password
});

//makes test data to put into tables
var data = [];
for(var i = 0; i < 10; i++){
    data.push([
        faker.company.companyName(),
        faker.random.number(),
        faker.date.past()

    ]);
}


var q = 'INSERT INTO app_practice (store, sound_level, whenwhere) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

connection.end();
