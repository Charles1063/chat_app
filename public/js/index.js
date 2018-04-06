var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from:'jane@example.com',
    text:'Hey, This is Andrew.'
  });

});

socket.on('disconnect', function () {
  console.log('disconnect from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message',message);
});
