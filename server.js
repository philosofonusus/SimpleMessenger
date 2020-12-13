const express = require('express')
const config = require('config')
const app = express()

const PORT = config.get('PORT')

server = app.listen(PORT, () => console.log("Server is running..."));

const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('New user connected')
    socket.username = "Anonymous"

    socket.on('usernameChange', (data) => {
        socket.username = data.username
    })

    socket.on('newMsg', (data) => {
        io.sockets.emit('add_msg', {message : data.message, username : socket.username});
    })

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
})