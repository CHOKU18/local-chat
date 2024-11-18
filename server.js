const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the HTML file
app.use(express.static('public'));

// Listen for incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // When a message is received, broadcast it to other users
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);  // Emit to all clients
    });

    // When the user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
