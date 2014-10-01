Derek Costigan ws2
==================

How to run code
------------------
To run the code install the 'fs' and 'csvtojson' modules. And then run the client and server just as was done in the example. The only difference is that instead of the parameters 'h|rh|json' on the client, run with the parameter 'csv' on http://localhost:4000. As for the server run with the same pattern as the example and use 'csv' as the parameter.

user.csv
------------------
Generated csv file with 200 entires. Each entry has a first name, 
last name, uid, phone number, and address.

http-server.js
------------------
The http-server utilizes the 'fs' and 'csvtojson' modules. Using these two modules I created an fs file stream and then gave that filestream to the csvtojson converter to turn the file in json. The new handler then stringified that json and wrote it to the client. In the process of doing this I created the new handler type csv, added a switch statement for the server initilization using the new handler, and checked for the new appropriate arguments. More comments are in the code to help follow exactly each step I took. 

http-client.js
------------------
The client just like the server now allows the handler type for 'csv' as it checks the arguments as well as make a new http request to the server using that new handler type. The implementation of the handler takes in a stringified json, parses it using the JSON parser, and then uses string parsing logic to convert the returned text back into the csv format. Once it is sucessfully converted into a string it prints the result out to the console. The clients also has comments inbedded in the code to help describe everything in detail.
