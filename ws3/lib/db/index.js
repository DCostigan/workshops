var pg = require('pg');

var connString = 'postgres://student:student@localhost/student';

var json = [];

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

function returnUsers(err, users) {
  if (err) {
    throw err;
  }
  else {
    users.forEach(function (user) {
      json[json.length] = user;
    });
    return json;
  }
}

exports.returnUsers = returnUsers
exports.getUsers = getUsers
exports.getUser = getUser

