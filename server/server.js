const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //use for creating an event
  // socket.emit('newMessage',{
  //   from:'mike@example.com',
  //   test: 'Hey. What is going on.',
  //   createAt: 123123
  // });

  //socket.emit from admin text welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
  // socket.broadccast.emit from admin text new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // //send to everybudy except this socket
  // socket.broadcast.emit('newMessage',, {
  //   from: message.from,
  //   text:message.text,
  //   createAt: new Date().getTime()
  // });
// });
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // emit to every single connection
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback('This is from the server');
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
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
