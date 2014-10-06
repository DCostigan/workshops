var pg = require('pg');

var connString = 'postgres://student:student@localhost/student';

function getUsers(callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query('select * from users', function (err, result) {
        // Ends the "transaction":
        done();
        // Disconnects from the database:
        client.end();
        if (err) {
          callback(err);
        }
        else {
          callback(undefined, result.rows);
        }
      });
    }
  });
}

function getUser(fname, lname, callback) {
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query('select * from users where fname=$1 and lname=$2', function (err, result) {
        // Ends the "transaction":
        done();
        // Disconnects from the database:
        client.end();
        if (err) {
          callback(err);
        }
        else {
          callback(undefined, result.rows);
        }
      });
    }
  });
}

function printUsers(err, users) {
  if (err) {
    throw err;
  }
  else {
    users.forEach(function (user) {
      console.log(user);
    });
  }
}

if (process.argv.length < 3) {
  console.log('usage: node users.js [a|u]');
  process.exit(1);
}

switch (process.argv[2]) {
case 'a':
  getUsers(printUsers);
  break;
case 'u': 
  var fname = process.argv[3];
  var lname = process.argv[4];
  getUser(fname, lname, printUsers);
  break;
default:
  console.log("Invalid parameter: " + process.argv[2]);
  process.exit(1);
}



function foo(){
	return "foo";
}

exports.foo = foo