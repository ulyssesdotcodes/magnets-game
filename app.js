var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	fs = require('fs');

server.listen(3000);
console.log("Running at 3000");

app.use(express.static(__dirname + '/assets'));

//app.get('/', function(req, res){
//	res.sendfile(__dirname + '/index.html');
//});

//Delete for log messages
//io.set('log level', 1);

io.sockets.on('connection', function(socket){
	socket.on('player', function(data){
		//Send the event (broadcasts it) to everyone except the originating client
		socket.broadcast.emit('peer', data);
	})
});
