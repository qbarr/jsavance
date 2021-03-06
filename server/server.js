
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const port = process.env.PORT || 3000;
let app = express();
app.use(cors())
let server = http.createServer(app);
let io = socketIO(server, {
    cors: {
        origin: '*',
    }
});


app.get('/', (req, res) => {
    res.send('coucou')

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});

io.on('connection', (socket) => {
    socket.on('startGame', () => {
        console.log('startgameserver');
        io.emit('startGame')
        socket.broadcast.emit('inverse')
    })
    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })

    socket.on('translation', (position) => {
        socket.broadcast.emit('translation', { x: position.x, y: position.y })

    })
});

