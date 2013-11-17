var otherMouseX = 0;
var otherMouseY = 0;

var sayHi = function(){
	console.log("client sees button pressed");
	ws.emit("buttonpressed",function(whatever){
		console.log(whatever)
	});
}

function addToTranscript(submittedText){
	var li = document.createElement('li');
	li.innerHTML = submittedText;
	document.querySelector('#transcript').appendChild(li);
}

function submitForm(event){
	var theForm = document.forms["form"];
	var submittedText = theForm.elements[0].value
	event.preventDefault();
	ws.emit("buttonpressed", submittedText, addToTranscript);
}


function main() {
	init();
	gameLoop();
}

function init() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	canvas.height = 300;
	canvas.width = 400;
	ctx.fillStyle = "eeeeee";
	ctx.fillRect(0,0,canvas.width, canvas.height);

	addEventListener('mousemove', mouseMoved, false); 
	//boolean is for "capturing vs bubbling"
}

function gameLoop() {
	draw();
	setTimeout(gameLoop, 25);
}


function draw() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = "ff0000";
	ctx.fillRect(otherMouseX-5,otherMouseY-5,10, 10);
}

function  mouseMoved(e) {     //e is the event handed to us
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
    ws.emit("mouseMoved", mouseX, mouseY)
}


var ws = io.connect()
// 'http://localhost:5000/'
// console.log("Handshook");

ws.on('message', function(data) {
	console.log(arguments);
	console.log("got message: "+data);
	var li = document.createElement('li');
	li.innerHTML = data;
	document.querySelector('#pings').appendChild(li);
});

ws.on('mouseMoved', function(mouseX, mouseY){
	otherMouseX = mouseX;
	otherMouseY = mouseY;
})

document.querySelector('#form').onsubmit = submitForm;

main();
