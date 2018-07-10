// path is a build in module
const path = require('path');
//http also build in module
const http = require('http');
const publicPath = path.join(__dirname, '../public')

const express = require('express');
const socketIO = require('socket.io');

// understand path module
console.log(__dirname + '/../public');
console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketIO(server);



io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()

    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined',
        createdAt: new Date().getTime()

    });

    // socket.broadcast.emit('newMessage', {
    //     from: newMessage.from,
    //     text: newMessage.text,
    //     createdAt: new Date().getTime()
    // });

    // socket.emit('newEmail', {
    //     from: "sam@example.com",
    //     text: "Yoo whats up how are you?",
    //     createdAt: 123
    // });

    // socket.emit('newMessage', {
    //     from: "sam",
    //     text: "Yoo whats up how are you?",
    //     createdAt: 123
    // });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
        //io.emit emit to everyone

        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });

        //own emit.. emit to everybody but this socket --broadcast
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('was disconnected')
    })
});




app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`started on port: ${port}`)
});

