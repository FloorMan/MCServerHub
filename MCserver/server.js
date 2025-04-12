const express = require('express'); // Import express
const app = express();              // Create an instance of express
const cors = require('cors');          // Import cors for cross-origin resource sharing
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    optionSuccessStatus:200
};

app.use(cors(corsOptions)); // Use cors middleware to allow cross-origin requests
//app.use(express.json()); // Middleware to parse JSON requests





app.get("/api", (req, res) => { // Define a GET route
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    res.json({ message: ["Hello from the server!", "Next Message!"] }); // Key-value pair in JSON format
});


app.get("/api/ip", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    res.json({ ip: "22.ip.gl.ply.gg:44710" }); // Key-value pair in JSON format
})

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server is running on port 8080"); // Log message when server starts
    console.log("Visit http://localhost:8080/api to see the message"); // Log message with URL
});