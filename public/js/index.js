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
  var formattedTime = moment(message.createAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);

});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'HI'
// }, function (data) {
//   console.log('callback function',data);
// });

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var li = jQuery('<li></li>');
  //open a new tab for google map infomation
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name = message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
      messageTextbox.val('')
  });

  var locationButton = jQuery('#send-location');
  locationButton.on('click', function () {
    // see if the user can access to the geo API
    if (!navigator.geolocation) {
      return alert('Geolocation not support by your brower.')
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position);
      locationButton.removeAttr('disabled').text('Send location');
      //fetch the location
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      // didn't allow to fetch the location
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.')


    });
  });

});
