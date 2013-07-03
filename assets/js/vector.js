define('Vector', [], function(){

	var Vector = function(x, y) {
		this.x = x;
		this.y = y;

		if(!x) this.x = 0;
		if(!y) this.y = 0;

		this.normal = function() {
			var inverseLength = 1 / this.length(),
				normalVector = new Vector();

			normalVector.x = this.x * inverseLength;
			normalVector.y = this.y * inverseLength;

			return normalVector;
		}

		this.length = function() {
			return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
		}

		this.makeZero = function() {
			this.x = 0;
			this.y = 0;
		}
	}

	return Vector;
});
