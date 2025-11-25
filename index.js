// Filename - index.js

// Importing the http module
const http = require("http")

// Creating server 
const server = http.createServer((req, res) => {
    // Sending the response
    res.write("A simple node application is up and running")
    res.end();
})

// Server listening to port 3000
server.listen((8000), () => {
    console.log("Server is Running");
})
