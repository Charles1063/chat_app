var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from:'jane@example.com',
  //   text:'Hey, This is Andrew.'
  // });

});

socket.on('disconnect', function () {
  console.log('disconnect from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);

});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'HI'
// }, function (data) {
//   console.log('callback function',data);
// });

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  //open a new tab for google map infomation
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}:`);
  a.attr('herf', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name = message]').val()
  }, function () {

  });

  var locationButton = jQuery('#send-location');
  locationButton.on('click', function () {
    // see if the user can access to the geo API
    if (!navigator.geolocation) {
      return alert('Geolocation not support by your brower.')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position);
      //fetch the location
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      //
      alert('Unable to fetch location.')
    });
  });

});
