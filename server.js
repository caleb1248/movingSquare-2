const express = require('express'),
	app = express(),
	server = app.listen(3000),
	io = require('socket.io')(server);

app.use(express.static("."));

io.on('connection', socket => {
	console.log('a user has connected')
})