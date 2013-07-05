define('PlayingField',[], function(){
	var PlayingField = function(fs, fk, height, width) {
		//Variables
		this.fs = fs;
		this.fk = fk;
		this.height = height;
		this.width = width;


		//Constructors
		if(fs == undefined || fk == undefined) {
			this.fs = 0.95;
			this.fk = 0.4;
		}

		if(width == undefined ) {
			this.width = 1900;
			this.height = 1000;
		}
	}	
	return PlayingField;
    
});
