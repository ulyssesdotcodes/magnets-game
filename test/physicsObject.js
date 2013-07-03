var should = require('chai').should()
	, expect = require('chai').expect
	, PhysicsObject = require('../assets/js/physicsObject')
	, PlayingField = require('../assets/js/playingField')
	, Vector = require('../assets/js/vector.js')
	, myPhysicsObject;

describe('PhysicsObject', function() {
	 before(function() {
	 	myPhysicsObject = new PhysicsObject(1, 23, 25, new PlayingField());
	 });

	 describe('myPhysicsObject', function() {
	 	 it('should be instantiated to the correct values', function() {
	 	 	should.exist(myPhysicsObject);
	 	 	myPhysicsObject.position.x.should.equal(23);
	 	 });
	 });


	describe('#applyForce()', function() {
		it('should update the force', function() {
			var currentForce = new Vector(myPhysicsObject.force.x, myPhysicsObject.force.y);

			myPhysicsObject.applyForce(1,  new Vector(1,1));
			myPhysicsObject.force.should.not.equal(currentForce);
		});
	});

	describe('#update()', function() {
		var currentPosition, notEnoughForce, enoughForce;
		before(function() {
			currentPosition = new Vector(myPhysicsObject.position.x, myPhysicsObject.position.y);
			notEnoughForce = 1;
			enoughForce = 100;
		});

		 it('should not update the position if not enough force is applied', function() {

			myPhysicsObject.force = new Vector();
			myPhysicsObject.applyForce(notEnoughForce,  new Vector(1,1));

			myPhysicsObject.update(300 / 1000);
			myPhysicsObject.position.x.should.equal(currentPosition.x);
			myPhysicsObject.position.y.should.equal(currentPosition.y);
		 });

		 it('should update the position if enough force is applied', function() {

			myPhysicsObject.force = new Vector();
			myPhysicsObject.applyForce(enoughForce,  new Vector(1,1));

			myPhysicsObject.update(300 / 1000);
			myPhysicsObject.position.x.should.not.equal(currentPosition.x);
			myPhysicsObject.position.y.should.not.equal(currentPosition.y);

		 });

		 it('should simulate momentum with respect to friction', function() {
		 	currentPosition = new Vector(myPhysicsObject.position.x, myPhysicsObject.position.y);

			myPhysicsObject.update(300 / 1000);
			myPhysicsObject.position.x.should.be.above(currentPosition.x);
			myPhysicsObject.position.y.should.be.above(currentPosition.y);
		 });
	});
});