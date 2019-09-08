const path = require('path');
const cv = require('opencv4nodejs');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const FPS = 30;
const wCap = new cv.VideoCapture(0); //face camera - webcam
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(()=>{
    const frame = wCap.read();
    const img = cv.imencode('.jpg', frame).toString('base64');
    io.emit('img', img);
}, 1000/FPS);

server.listen(3000);
