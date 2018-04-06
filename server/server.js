const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //use for creating an event
  socket.emit('newMessage',{
    from:'mike@example.com',
    test: 'Hey. What si going on.',
    createAt: 123123
  });

socket.on('createMessage', (message) => {
  console.log('createMessage', message);
});

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
    console.log(`Sever is up on ${port}`);
});





//console.log(__dirname+'/../public');
//
//console.log(publicPath);
