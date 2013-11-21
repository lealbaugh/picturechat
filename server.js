var http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(port, function() { console.log(this._connectionKey)});

console.log('http server listening on %d', port);


var pictures = [];
var dir = require('node-dir');
dir.readFiles(__dirname+"/public/assets", {match: /.png$/}, function(err, content, filename, next) {
		if (err) throw err;
		filename = filename.replace(__dirname+"/public/assets/", "");
		filename = filename.replace(".png", "");
		pictures.push(filename);
		next();
	}, function () {
		console.log("Finished cataloging pictures!");
		console.log(pictures);
	});



// Create a Socket.IO instance, passing it our server
var io = require('socket.io').listen(server);
io.set('log level', 1);

// Add a connect listener
io.sockets.on('connection', function(socket){ 
	socket.on('message',function(event){ 
		console.log('Message: ',event);
	});
	socket.on('disconnect',function(){	
		console.log('Disconnect');	
	});
	socket.on('getImages', function(){
		socket.emit("images", pictures);
		// for (var i = 0; i<pictures.length; i++) {
		// 	socket.emit("image", pictures[i]);
		// }
	});
	socket.on('post', function(picPhrase){
		socket.broadcast.emit("post", picPhrase);
		socket.emit("post", picPhrase);
	});

});







