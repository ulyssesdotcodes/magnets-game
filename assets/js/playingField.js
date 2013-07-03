define('PlayingField',[], function(){
	var PlayingField = function(fs, fk) {
		//Variables
		this.fs = fs;
		this.fk = fk;

		//Constructors
		if(fs == undefined || fk == undefined) {
			this.fs = 0.95;
			this.fk = 0.4;
		}
	}	
	return PlayingField;
    
});
