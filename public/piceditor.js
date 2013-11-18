
function main() {
	init();
}

function init() {
	picPhrase = [];

	var transcript = document.createElement('div');
	transcript.setAttribute("id", "transcript");
	document.querySelector('body').appendChild(transcript);

	var composingstick = document.createElement('div');
	composingstick.setAttribute("id", "composingstick");
	document.querySelector('body').appendChild(composingstick);

	var prompt = document.createElement('div');
	prompt.innerHTML = "&gt;";
	prompt.setAttribute("style", "float:left; clear:both; font-size:20px");
	document.querySelector('#composingstick').appendChild(prompt);


	var buttonsplace = document.createElement('div');
	buttonsplace.setAttribute("id", "buttons");
	buttonsplace.setAttribute("style", "clear: both");
	document.querySelector('body').appendChild(buttonsplace);

	var sendbutton = document.createElement('div');
	sendbutton.innerHTML = "<a>SUBMIT</a>";
	sendbutton.addEventListener("click", function(){ post()});
	sendbutton.setAttribute("style", "float:left; border:1px dotted")
	document.querySelector('body').appendChild(sendbutton);


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
		thisbutton.setAttribute("style", "float:left; border:1px dotted")
		document.querySelector('#buttons').appendChild(thisbutton);
	})
	ws.emit("getImages");
}

function addToComposingStick(buttonname) {
	console.log(buttonname);
	picPhrase.push(buttonname);
	addPicture(buttonname, '#composingstick');
}

function post(){
	ws.emit("post", picPhrase);
	picPhrase = [];
	while (document.querySelector("#composingstick").childNodes.length > 1){
		console.log("removin");
		document.querySelector("#composingstick").removeChild(document.querySelector("#composingstick").childNodes[1]);	
	}
	
}


function addPicture(imagename, location) {
	var thisimage = document.createElement('div');
	thisimage.innerHTML = "<img src=\"assets/"+imagename+".png\">";
	thisimage.setAttribute("style", "float:left")
	document.querySelector(location).appendChild(thisimage);
}

function addPicPhraseToTranscript(picPhrase){
	var phrase = document.createElement('div');
	phrase.setAttribute("id", "activephrase");
	phrase.setAttribute("style", "clear: both");
	document.querySelector('#transcript').appendChild(phrase);
	for (var i = 0; i<picPhrase.length; i++){
		imagename = picPhrase[i];
		addPicture(imagename, "#activephrase");
	}
	document.querySelector('#activephrase').setAttribute("id", "phrase");
}

main();