const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { simulateTick, initialData } = require('./data/simulator');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all for hackathon
    methods: ["GET", "POST"]
  }
});

let currentState = { ...initialData };

// HTTP Routes
app.get('/api/status', (req, res) => {
  res.json(currentState);
});

// Mock wait queue route
app.post('/api/queue/join', (req, res) => {
  const { zoneId } = req.body;
  // In a real app we'd increment wait time slightly or track user ID
  res.json({ success: true, message: `Joined queue for ${zoneId}` });
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Send immediate state
  socket.emit('simulation_update', currentState);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Simulation Loop every 5 seconds
setInterval(() => {
  currentState = simulateTick(currentState);
  io.emit('simulation_update', currentState);
}, 5000);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
