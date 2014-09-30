var url = require('url');
var http = require('http');

//make sure the client takes the appropriate number of arguments
if (process.argv.length < 3) {
  console.log('usage: node http-client.js [h|rh|json|csv] [url]');
  process.exit(1);
}

// The handler function to invoke:
var handlerType = process.argv[2];

// The url to connect to:
var urlStr = process.argv[3] || 'http://www-edlab.cs.umass.edu/cs326/schedule/';

//Added the csv handlerType to the valid handlerType check
if (!(handlerType === 'h' || handlerType === 'rh' || handlerType === 'json' || handlerType ==='csv')) {
  console.log('usage: node http-client.js [h|rh|json|csv] [url]');
  process.exit(1);  
}

var url = url.parse(urlStr);

var options = {
    host: url.hostname,
    path: url.path,
    port: url.port || 80,
    method: 'GET'
  };

/**
 * A function to create a response handler.
 */
function createResponseHandler (callback) {
  /**
   * A function to handle a response.
   */
  function responseHandler(res) {
    // A variable to capture the data from the response:
    var str = '';

    // When data is received we append to string.
    res.on('data', function (chunk) {
      str += chunk;
    });

    // When the connection is closed, we invoke our callback.
    res.on('end', function () {
      callback(str);
    });
  }

  // Return the created function:
  return responseHandler;
}

// Create a basic handler:
var handler = createResponseHandler(function (data) {
  console.log(data);
});

// A slightly more interesting handler:
var re_handler = createResponseHandler(function (data) {
  var lines = data.split("\n");

  console.log('Found Links:');
  var re = /<a +href="([^"]+)".*>/; // <a href="URL">link text</a>
  lines.forEach(function (line) {
    var match = re.exec(line);

    if (match !== null) {
      console.log(match[1]);
    }
  });
});

// Even more interesting:
var json_handler = createResponseHandler(function (data) {
  var obj = JSON.parse(data);
  console.log(obj);
});

//New hanlder to parse the json array object back into csv and print it
var csv_handler = createResponseHandler(function (data) {
  var arrayObj = JSON.parse(data);
  var str = '';
  for (var i = 0; i < arrayObj.length; i++) {
    var line = '';
    for (var index in arrayObj[i]) {
      if (line != ''){ 
        line += ',';
      }
      line += arrayObj[i][index];
    }

    str += line + '\r\n';
  }
  console.log(str);
});

console.log(' --> connecting to ' + options.host + ' on port ' + options.port);
console.log(' --> resource ' + options.path);

//Added csv switch to request the data from the server
switch (handlerType) {
  case 'h':
    var req = http.request(options, handler);
    req.end();
    break;
  case 'rh':
    var req = http.request(options, re_handler);
    req.end();
    break;
  case 'json':
    var req = http.request(options, json_handler);
    req.end();
    break;  
  case 'csv':
    var req = http.request(options, csv_handler);
    req.end();
    break;
  default:
    console.log('unknown handler type');
}


