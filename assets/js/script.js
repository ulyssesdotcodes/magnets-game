define('Game', ['Magnet', 'PlayingField', 'Vector', 'Kinetic', 'jquery', 'jquery-mobile', 'socket'], 
	function(Magnet, PlayingField, Vector, Circle, $, jQueryMobile, socket) {
	
	var Circle = Kinetic.Circle;
	$(function(){

		if(!('getContext' in document.createElement('canvas'))){
			alert("You don't support canvas!");
			return false;
		}

		//HTML5 variables
		var doc, layer, stage, background;

		//Network variables
		var peers, player, url, socket, lastEmit;
		var drawScene = true, updateServer = true;

		//Game variables
		var redraw = true;
		var fps = 30;
		var mspf = 1000 / fps;
		var lastFrame = $.now();
		var magnets, playingField, playerMagnet,
			magnetCircles, playerMagnetCircle;
		var newMousePosition;

		//Using the jQuery callbacks which allows a list of methods to be fired. Put needed parameters in the player object.
		var updateMethods = $.Callbacks();

		//Update methods
		//Define methods here which cause updates to the html5 canvas and/or the player.pub

		var moveMagnets = function(deltaTime) {
			score = 0;
			magnets.forEach(function(magnet) {
				magnet.reactTo(playerMagnet);
				score += 1/
					Math.sqrt(Math.pow(magnet.physics.position.x - magnet.physics.playingField.width/2, 2) 
						+ Math.pow(magnet.physics.position.y- magnet.physics.playingField.height/2, 2));
				magnet.update(deltaTime);
			});
			$('#score').text('Score: ' + Math.floor(score * 10000));
		}

		var movePlayerMagnet = function(deltaTime) {
			if(newMousePosition) {
				playerMagnet.updatePosition(newMousePosition.pageX, newMousePosition.pageY);
				newMousePosition = undefined;
			}
		}

		// Initialize everything here and use setInterval to trigger the update calls
		function init(){
			initNetwork();
			initStage();
			initInput();
			setInterval(update, mspf);
		}

		function initStage(){
			doc = $(document);

			layer = new Kinetic.Layer();

			stage = new Kinetic.Stage({
				container: 'stage',
				width: $(document).width(),
				height: $(document).height()
			});

			background = new Kinetic.Rect({
				x:0,
				y:0,
				width: stage.getWidth(),
				height: stage.getHeight(),
				fill: "white"
			});

			player.pub.x = stage.getWidth() / 2;
			player.pub.y = stage.getHeight() / 2;

			layer.add(background);

			playingField = new PlayingField(0.95, 0.4, stage.getHeight(), stage.getWidth());
			$("#target").css({
				'margin-left': stage.getWidth()/2+'px',
				'margin-top':  stage.getHeight()/2 + 'px'
			});
			playerMagnet = new Magnet(playingField, 30, 30, 20, 2, {stroke: 'red'});
			layer.add(playerMagnet.circle);
			magnets = new Array();
			for(var i = 0; i < 20; i++) {
				magnets.push(new Magnet(playingField, stage.getWidth() * Math.random(), stage.getHeight() * Math.random() ));	
				layer.add(magnets[magnets.length-1].circle);
			}

			stage.add(layer);
			layer.drawScene();

			updateMethods.add(moveMagnets);
			updateMethods.add(movePlayerMagnet);
		}

		function initNetwork(){
			url = "http://localhost:8080/";

			// The player.pub variable should contain all the information that peers (other players) need to know about the player (id, health, position, etc)
			player = {};
			player.pub = {};
			player.pub.id =  Math.round($.now()*Math.random());
			peers = {};
			socket = io.connect(url);
			lastEmit = $.now();
		}

		function update(){
			//Calls all the updateMethods with deltaTime
			updateMethods.fire($.now() - lastFrame);

			// If there are any methods called then update the canvas and the server
			if(updateMethods.has(movePlayerMagnet)){
				drawScene = true;
				//updateServer = true;
			}

			lastFrame = $.now();

			//SocketIO
			if(updateServer){
				sendPlayer();
				updateServer = false;
			}

			//Canvas update
			if(drawScene){
				layer.drawScene();	
				drawScene = false;
			}
		}

		init();

		//Inputs
		function initInput() {

			// Each input should correspond to a function in the update methods section
			// Each method can then be added to the jQuery callbacks and it will get called every update
			//

			doc.on('mousemove', function(m) {
				newMousePosition = m;
			});

			doc.on('vmousemove', function(t) {
				newMousePosition = t;
			});
			// For example, the following code adds the moveLeft function to the update methods when the left key is pressed down.
			// doc.on('keydown', function(e){
			// 	switch(e.keyCode){
			// 	case 37:
			// 		if(!updateMethods.has(moveLeft))
			// 			updateMethods.add(moveLeft);
			// 		break;
			// });

			// And removes it when the key is released
			// doc.on('keyup', function(e) {
			// 	switch(e.keyCode){
			// 	case 37:
			// 		if(updateMethods.has(moveLeft))
			// 			updateMethods.remove(moveLeft);
			// 		break;
			// });
		}

		//SocketIO - if the server needs to be updated, emit the player packet with the player.pub variable
		function sendPlayer(){
			if($.now() - lastEmit > mspf){
				socket.emit('player', {
					peer: player.pub
				});
				lastEmit = $.now();
			}
		}

		//When a peer packet is received, update the canvas and peers array accordingly
		socket.on('peer', function(data) {
			if(!(data.peer.id in peers)) {
				//Add the new peer to the array
				peers[data.peer.id] = data.peer;
			} else {
				//Update the current peer
				peers[data.peer.id] = data.peer;
			}
		});

	});
});
