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

app.get("api/checkstatus", (req, res) => { // Define a GET route to check the status of the Minecraft server
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    
    const serverProcess = spawn('screen', ['-dmS', 'mcserver', 'java', '-Xmx1024M', '-Xms1024M', '-jar', 'server.jar', 'nogui']); // Spawn a new process to run the Minecraft server

    serverProcess.stdout.on('data', (data) => { // Listen for data from the server process
        console.log(`stdout: ${data}`); // Log the output from the server process
    });

    serverProcess.stderr.on('data', (data) => { // Listen for errors from the server process
        console.error(`stderr: ${data}`); // Log the error output from the server process
    });

    serverProcess.on('close', (code) => { // Listen for when the server process closes
        console.log(`Server process exited with code ${code}`); // Log the exit code of the server process
        if (code === 0) {
            res.json({ status: 'Server is running' }); // Send success response if server is running
        } else {
            res.status(500).json({ error: 'Failed to start server' }); // Send error response if server failed to start
        }
    });
});


app.post("/api/changeip", (req, res) => { // Define a POST route to change the IP address in the .env file
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    
    const newIp = req.body.ip; // Get the new IP address from the request body
    const envFilePath = path.join(__dirname, './.env'); // Path to the .env file

    // Read the .env file
    fs.readFile(envFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading .env file:', err); // Log error if reading fails
            return res.status(500).json({ error: 'Failed to read .env file' }); // Send error response
        }

        // Replace the MINECRAFT_SERVER variable with the new IP address
        const updatedData = data.replace(/MINECRAFT_SERVER=.*/, `MINECRAFT_SERVER=${newIp}`);

        // Write the updated data back to the .env file
        fs.writeFile(envFilePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to .env file:', err); // Log error if writing fails
                return res.status(500).json({ error: 'Failed to write to .env file' }); // Send error response
            }

            console.log('Updated MINECRAFT_SERVER IP address in .env file'); // Log success message
            res.json({ message: 'IP address updated successfully' }); // Send success response
        });
    });
} 
);


// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server is running on port 8080"); // Log message when server starts
    console.log("Visit http://localhost:8080/api to see the message"); // Log message with URL
});