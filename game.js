
var http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(3000, '192.168.1.3', function() { console.log(this._connectionKey)});

console.log('http server listening on %d', port);

// Create a Socket.IO instance, passing it our server
var io = require('socket.io').listen(server);
io.set('log level', 1);

// Add a connect listener
io.sockets.on('connection', function(socket){ 
	// console.log(io.sockets.clients());
	// console.log(io.sockets.clients().length);
	// var interval = setInterval(function(){
	// 	client.send("Hello");
	// }, 1000);

	socket.on('message',function(event){ 
		console.log('Received message from client!',event);
	});
	socket.on('disconnect',function(){
		// clearInterval(interval);
		
	});
	socket.on('buttonpressed', function(submittedText, fn){
		if (submittedText.match(/cats/i)) {
			fn("You said: "+submittedText);
		}
		else {
			fn("Nope!");
		}
	});
	socket.on('mouseMoved', function(mouseX, mouseY){
		socket.broadcast.emit('mouseMoved', mouseX, mouseY);
		socket.emit('mouseMoved', mouseX, mouseY);
	});

});
