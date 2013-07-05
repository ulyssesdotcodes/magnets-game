define('PhysicsObject', ['Vector', 'PlayingField'], function(Vector, PlayingField){

	var PhysicsObject = function(mass, startX, startY, playingField) {
		this.mass = 2;
		this.position = new Vector();
		this.velocity = new Vector();
		this.force = new Vector();
		this.moving = false;
		this.playingField = playingField;

		if(startX) this.position.x = startX;
		if(startY) this.position.y = startY;
		if(mass) this.mass = mass;
	}

	PhysicsObject.prototype = {
		applyForce: function(force, direction) {
			var directionNormal =  direction.normal();

			this.force.x += directionNormal.x * force;
			this.force.y += directionNormal.y * force;
		},
		applyFriction: function() {
			//Use either fs or fk
			var coefficient = (this.moving) ? this.playingField.fk : this.playingField.fs;
			var normalForce = this.mass;

			var frictionForce = coefficient * normalForce;

			// If it's already moving, or if enough force has been applied to get it to move
			if(this.moving || frictionForce < this.force.length()) {
				this.velocity.x -= this.velocity.x * frictionForce;
				this.velocity.y -= this.velocity.y * frictionForce;
			}
		},
		move: function(dt) {
			this.velocity.x += (this.force.x * dt) / this.mass;
			this.velocity.y += (this.force.y * dt) / this.mass;
			this.force = new Vector();

			this.moving = (this.velocity.length() >= 1);
			if(!this.moving)  {
				this.velocity = new Vector();
			}

			this.position.x += Math.round(this.velocity.x);
			this.position.y += Math.round(this.velocity.y);

			if(this.position.x < 0) this.position.x = 0;
			else if(this.position.x > this.playingField.width) this.position.x = this.playingField.width;

			if(this.position.y < 0) this.position.y = 0;
			else if(this.position.y > this.playingField.height) this.position.y = this.playingField.height;
				
		},
		update: function(dt) {
			this.applyFriction();
			this.move(dt);
		}
	}
	return PhysicsObject;
});
