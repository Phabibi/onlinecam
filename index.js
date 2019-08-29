const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cv = require('opencv4nodejs');
const wcam = new cv.VideoCapture(0)
port = 8080
const farme_rate = 20;

app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
    console.log(req)
});
setInterval(()=>{
    const frame = wcam.read();
    const image = cv.imencode('.jpg',frame).toString('base64');

    io.emit('image', image)
}, 1000 / farme_rate);

console.log('listening on port 8080')
server.listen(port);



