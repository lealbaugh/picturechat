
function main() {
	init();
}

function init() {
	picPhrase = [];

	var prompt = document.createElement('div');
	prompt.innerHTML = "&gt;";
	prompt.setAttribute("id", "prompt");
	document.querySelector('#editarea').insertBefore(prompt, document.querySelector('#composingstick'));

	var sendbutton = document.createElement('div');
	sendbutton.innerHTML = "<a>^</a>";
	sendbutton.addEventListener("click", function(){ post()});
	sendbutton.setAttribute("id", "sendbutton");
	document.querySelector('#editarea').appendChild(sendbutton);


	window.addEventListener("keypress", function(e){ 
		if(e.keyCode === 13){
			post();
		}
	});

	ws = io.connect()
	ws.on('post', function(picPhrase){
		addPicPhraseToTranscript(picPhrase);
	});

	ws.on('images', function(piclist){
		for (var i=0; i<piclist.length; i++) {
			var buttonname = piclist[i];
			var thisbutton = document.createElement('div');
			thisbutton.innerHTML = "<a><img src=\"assets/"+buttonname+".png\"></a>";
			setupClick(thisbutton, buttonname);
			thisbutton.setAttribute("class", "button")
			document.querySelector('#buttons').appendChild(thisbutton);
			console.log("added", buttonname);
		};
	});

	function setupClick(thisbutton, buttonname){
		thisbutton.addEventListener("click", function(){
				addToComposingStick(buttonname);
			});
	}
	
	ws.emit("getImages");
	// ws.emit("getImages");
	// ws.emit("getImages");
	// ws.emit("getImages");
	// ws.emit("getImages");
	// ws.emit("getImages");
	// ws.emit("getImages");
	// for the sake of having lots of buttons, for visual effect

}

function addToComposingStick(buttonname) {
	console.log(buttonname);
	picPhrase.push(buttonname);
	addPicture(buttonname, '#composingstick');
}

function post(){
	if (picPhrase.length > 0) {
		ws.emit("post", picPhrase);
		picPhrase = [];
		document.querySelector("#composingstick").innerHTML = "";
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
	autoscroll("transcript");
}

function autoscroll(id){
	var toScroll = document.getElementById(id);
		toScroll.scrollTop = toScroll.scrollHeight+200;
}

main();
