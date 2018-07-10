let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: "john@example.com",
        text: "Hey. This is john"
    });

    // socket.emit('createMessage', {
    //     to: "john",
    //     text: "Hey. new message"
    // })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log('new Email', email);

});

socket.on('newMessage', function (newMessage) {
    console.log('new Message', newMessage);

});