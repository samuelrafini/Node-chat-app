// path is a build in module
const path = require('path');
//http also build in module
const http = require('http');
const publicPath = path.join(__dirname, '../public')


const express = require('express');
const socketIO = require('socket.io');

const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users');
const { generateMessage, generateLocationMessage } = require('./utils/message');
// understand path module
console.log(__dirname + '/../public');
console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();


io.on('connection', (socket) => {
    console.log('new user connected');


    socket.on('Join', (params, callback) => {
        console.log(params);
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    })
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

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
        console.log(generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);
        //io.emit emit to everyone

        let user = users.getUser(socket.id);

        if(user && isRealString(newMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }

        callback();
        //own emit.. emit to everybody but this socket --broadcast
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }

        console.log('was disconnected')
    })
});




app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`started on port: ${port}`)
});

