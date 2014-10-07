var pg = require('pg');

var connString = 'postgres://student:student@localhost/student';

function getUsers(callback, res) {
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
          callback(undefined, result.rows, res);
        }
      });
    }
  });
}

function getUser(fname, lname, callback, res) {
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
          callback(undefined, result.rows, res);
        }
      });
    }
  });
}

function returnUsers(err, users, res) {
  if (err) {
    throw err;
  }
  else {
  	var jsonOBJ = [];
    users.forEach(function (user) {
    	jsonOBJ.push(user);
    });
    console.log(JSON.stringify(jsonOBJ));
 	res.write(JSON.stringify(jsonOBJ));
 	res.end();
  }
}

exports.returnUsers = returnUsers
exports.getUsers = getUsers
exports.getUser = getUser

