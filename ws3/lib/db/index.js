var pg = require('pg');

var connString = 'postgres://student:student@localhost/student';

function getUsers(callback, response) {
  var querystring = 'SELECT U.fname, U.lname, A.* FROM users U, address A, lives L WHERE U.uid = L.uid AND A.aid = L.aid';
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query(querystring, function (err, result) {
        // Ends the "transaction":
        done();
        // Disconnects from the database:
        client.end();
        if (err) {
          callback(err);
        }
        else {
          callback(undefined, result.rows, response);
        }
      });
    }
  });
}

function getUser(fname, lname, callback, response) {
  var querystring = 'SELECT U.fname, U.lname, A.* FROM users U, address A, lives L WHERE U.fname=$1 AND U.lname=$2 AND U.uid = L.uid AND A.aid = L.aid';
  pg.connect(connString, function (err, client, done) {
    if (err) {
      callback(err);
    }
    else {
      client.query(querystring, [fname, lname], function (err, result) {
        // Ends the "transaction":
        done();
        // Disconnects from the database:
        client.end();
        if (err) {
          callback(err);
        }
        else {
          callback(undefined, result.rows, response);
        }
      });
    }
  });
}

function returnUsers(err, users, response) {
  if (err) {
    throw err;
  }
  else {
  	var jsonOBJ = [];
    users.forEach(function (user) {
    	jsonOBJ.push(user);
    });
    json = JSON.stringify(jsonOBJ);
 	response.write(json);
 	response.end();
  }
}

exports.returnUsers = returnUsers
exports.getUsers = getUsers
exports.getUser = getUser

