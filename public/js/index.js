let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: "john@example.com",
    //     text: "Hey. This is john"
    // });

    // socket.emit('createMessage', {
    //     to: "john",
    //     text: "Hey. new message"
    // }, function (data) {
    //     console.log('Got it', data);
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log('new Email', email);

});

socket.on('newMessage', function (newMessage) {
    console.log('new Message', newMessage);
    let formattedTime = moment(newMessage.createdAt).format('h:mm a')
    let li =jQuery('<li></li>');
    li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function (message){
    let formattedTime = moment(message.createdAt).format('h:mm a')
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);

})


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()

    }, function () {
        messageTextbox.val('')
    })
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});

