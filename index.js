const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(()=>{
    io.emit('img', 'some data');
}, 1000);

server.listen(3000);
