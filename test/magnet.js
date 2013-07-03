var should = require('chai').should()
	, Magnet = require('../assets/js/magnet.js')
	, Vector = require('../assets/js/vector.js')
	, PlayingField = require('../assets/js/playingField.js')
	, myMagnet;

describe('Magnet', function() {
	before(function() {
		myMagnet = new Magnet(new PlayingField(), 23, 25);
	});

	describe('myMagnet', function() {
		it('should be instantiated', function() {
			should.exist(myMagnet);
		});
	})

	describe('#magnitude', function() {
		it('should respond with the magnet\'s magnitude', function() {
			should.exist(myMagnet.magnitude);
			myMagnet.magnitude.should.equal(10);
		}) 
	});

	describe('#reactTo', function() {
	 	 it('should apply force to the magnet with respect to the other magnet', function() {
	 	 	var currentPosition = new Vector(myMagnet.physics.position.x, myMagnet.physics.position.y);

	 	 	myMagnet.reactTo(new Magnet(new PlayingField(), myMagnet.physics.position.x-10, myMagnet.physics.position.y-10));
	 	 	console.log(myMagnet);
	 	 	myMagnet.physics.force.x.should.be.below(currentPosition.x);
	 	 	myMagnet.physics.force.y.should.be.below(currentPosition.y);
	 	 })
	 }); 



})