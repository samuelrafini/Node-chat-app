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
    let li =jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()

    }, function () {

    })
});