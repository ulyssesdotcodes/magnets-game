define('Magnet', ['PhysicsObject', 'Kinetic', 'Vector'], function(PhysicsObject, Kinetic, Vector){
	var Circle = Kinetic.Circle;
	var Magnet = function(playingField, startX, startY, magnitude, mass, circleOptions) {
		//Variables
		this.physics = new PhysicsObject(mass, startX, startY, playingField);
		this.magnitude = 20;
		this.circle = new Circle( {
			x: this.physics.position.x,
			y: this.physics.position.y,
			radius: (circleOptions && circleOptions.radius) ? circleOptions.radius : 30,
			fillEnabled: (circleOptions && circleOptions.fillEnabled) ? circleOptions.fillEnabled : true,
			stroke: (circleOptions && circleOptions.stroke) ? circleOptions.stroke : 'black'
		})

		if(magnitude) this.magnitde = magnitude;

		//Methods

		this.reactTo = function(otherMagnet) {
			var force, direction;

			direction = new Vector(this.physics.position.x - otherMagnet.physics.position.x, this.physics.position.y - otherMagnet.physics.position.y);

			force = (otherMagnet.magnitude * this.magnitude) / (4 * Math.PI * direction.length());

			this.physics.applyForce(force, direction);
		}

		this.update = function(dt) {
			this.physics.update(dt);
			this.circle.setX(this.physics.position.x);
			this.circle.setY(this.physics.position.y);
		}

		this.updatePosition = function(x, y) {
			this.physics.position.x = x;
			this.physics.position.y = y;
			this.circle.setX(this.physics.position.x);
			this.circle.setY(this.physics.position.y);
		}
	};
	return Magnet;
});

