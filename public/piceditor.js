
function main() {
	init();
}

function init() {
	picPhrase = [];

	var prompt = document.createElement('div');
	prompt.innerHTML = "&gt;";
	prompt.setAttribute("class", "lineitem");
	document.querySelector('#composingstick').appendChild(prompt);

	var sendbutton = document.createElement('div');
	sendbutton.innerHTML = "<a>SUBMIT</a>";
	sendbutton.addEventListener("click", function(){ post()});
	sendbutton.setAttribute("class", "button");
	sendbutton.setAttribute("id", "sendbutton");
	document.querySelector('#wrapper').insertBefore(sendbutton, document.querySelector('#buttons'));

	ws = io.connect()
// 'http://localhost:5000/'
// console.log("Handshook");
	ws.on('post', function(picPhrase){
		addPicPhraseToTranscript(picPhrase);
	});

	ws.on('image', function(buttonname){
		var thisbutton = document.createElement('div');
		thisbutton.innerHTML = "<a><img src=\"assets/"+buttonname+".png\"></a>";
		thisbutton.addEventListener("click", function(){ addToComposingStick(buttonname)});
		thisbutton.setAttribute("class", "button")
		document.querySelector('#buttons').appendChild(thisbutton);
	})
	ws.emit("getImages");
	ws.emit("getImages");
	ws.emit("getImages");
	ws.emit("getImages");
	ws.emit("getImages");
	ws.emit("getImages");
	ws.emit("getImages");
	// for the sake of having lots of buttons, for visual effect

}

function addToComposingStick(buttonname) {
	console.log(buttonname);
	picPhrase.push(buttonname);
	addPicture(buttonname, '#composingstick');
}

function post(){
	ws.emit("post", picPhrase);
	picPhrase = [];
	console.log(document.querySelector("#composingstick").childNodes);
	while (document.querySelector("#composingstick").childNodes.length > 1){
		
		console.log(document.querySelector("#composingstick").childNodes.item(1));
		document.querySelector("#composingstick").removeChild(document.querySelector("#composingstick").childNodes.item(1));	
	}
	
}


function addPicture(imagename, location) {
	var thisimage = document.createElement('div');
	thisimage.innerHTML = "<img src=\"assets/"+imagename+".png\">";
	thisimage.setAttribute("class", "lineitem")
	document.querySelector(location).appendChild(thisimage);
}

function addPicPhraseToTranscript(picPhrase){
	var phrase = document.createElement('div');
	phrase.setAttribute("id", "activephrase");
	document.querySelector('#transcript').appendChild(phrase);
	for (var i = 0; i<picPhrase.length; i++){
		imagename = picPhrase[i];
		addPicture(imagename, "#activephrase");
	}
	

	document.querySelector('#activephrase').setAttribute("class", "phrase");
	document.querySelector('#activephrase').setAttribute("id", "inactivephrase");

}

main();