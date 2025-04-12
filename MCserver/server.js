const express = require('express'); // Import express
require('dotenv').config(); // Load environment variables from .env file
const path = require('path'); // Import path module to handle file paths
const fs = require('fs'); // Import file system module to handle file operations
const { exec } = require('child_process'); // Import child_process module to execute shell commands
const { spawn } = require('child_process'); // Import child_process module to spawn new processes
const app = express();              // Create an instance of express
const cors = require('cors');          // Import cors for cross-origin resource sharing
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    optionSuccessStatus:200
};

app.use(cors(corsOptions)); // Use cors middleware to allow cross-origin requests
//app.use(express.json()); // Middleware to parse JSON requests

const LOCAL_IP = process.env.DIGITAL_OCEAN_IP; // Get the local IP address from environment variables
const MINECRAFT_SERVER = process.env.MINECRAFT_SERVER; // Get the Minecraft server address from environment variables
const PORT = process.env.PORT || 8080; // Set the port to the value from environment variables or default to 8080


app.use(express.static(path.join(__dirname, '../MC\ Server\ Hub'))) // Serve the static files from the 'MC Server HUB' directory

app.get("/", (req, res) => { // Define a GET route for the root URL
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    res.sendFile(path.join(__dirname, "../MC\ Server\ Hub/index.html")); // Serve the index.html file
});


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
    res.json({ ip: MINECRAFT_SERVER }); // Key-value pair in JSON format
})

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server is running on port 8080"); // Log message when server starts
    console.log("Visit http://localhost:8080/api to see the message"); // Log message with URL
});