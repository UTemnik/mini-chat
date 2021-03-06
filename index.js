let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function (socket) {
	console.log('Успешное соединение');
	connections.push(socket);

	socket.on('disconnect', function (data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log('отключились');
	});

	socket.on('send message', function (data) {
		io.sockets.emit('add message', { msg: data.message, name: data.name })
	});
});

//node index.js




