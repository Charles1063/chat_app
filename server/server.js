const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // //socket.emit from admin text welcome to the chat app
  // socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
  // // socket.broadccast.emit from admin text new user joined
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // // //send to everybudy except this socket

// });

  socket.on('join', (params, callback) =>{
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required!');
    }

    socket.join(params.room);
    //socket.leave(room's name);

    //io.emit to every single connection
    //socket.broadcast.emit every single connection except for the current user
    //socket.emit one user
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));


    //socket.emit from admin text welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
    // socket.broadccast.emit from admin text new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    // //send to everybudy except this socket

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      // emit to every single connection
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage',(coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
  });


  socket.on('disconnect', () => {
    // console.log('User was disconnected');
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
    console.log(`Sever is up on ${port}`);
});





//console.log(__dirname+'/../public');
//
//console.log(publicPath);
