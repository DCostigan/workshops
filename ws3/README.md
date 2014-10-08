Derek Costigan ws3
==================

How to run code
------------------
To run the code install the 'fs' and 'csvtojson' modules, as well as the homemade 'db' module. And then run the client and server just as was done in the lecture example. The only difference is that instead of the parameters 'h|rh|json|csv' on the client, run with the parameter 'db' on http://localhost:4000. If you'd like to print out only one user then add the following: 'fname' 'lname' after the end of the http. As for the server run with the same pattern as the example and use 'db' as the parameter.

index.js
------------------
Used the 'pg' module and created a local database named 'student'. Made a connString to the database from postgres. Implemented getUsers method that: takes a callback and response, connects to the database, queries using the string I made to find all users and their addresses, and then calls the callback with the resulting rows and the soon to be sent response. Implemented getUser as the same as getUsers but with a slightly different query and parameters that allow for the input of first and last name. ReturnUsers creates an array and stores each of the users depending on which getUser/getUsers function called it. It then stringifys the array and send it back to the server via the response callback.  

http-server.js
------------------
The same http-server.js as last time but with an added dbHandler to take a http request and decide if it is an individual user query or a multiple user query. The remaining methods and switches were edited to be able to use this new dbHandler. Also this is where i called require on my homemade modules 'db'.

http-client.js
------------------
The client remained mostly the same. I changed it to allow the new db http request, but all it really does it call the old csv handler to parse the json into a readable format. Changed the options object to include the fname and lname headers that were passed as parameters.
