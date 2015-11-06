function Slide (jsonObj) {

	// ************************************************************************
	// PRIVATE VARIABLES AND FUNCTIONS
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE
	// ***********************************************************************
	var data;

	// ************************************************************************
	// PRIVILEGED METHODS
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS
	// ************************************************************************
	this.getData = function(){ return data };
	this.setData = function(data){ this.data = data };

	// ************************************************************************
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE
	// ************************************************************************
	this.type = type;
	this.id = id;
  this.title = title;
  this.fileName = fileName;
}


// ************************************************************************
// PUBLIC METHODS -- ANYONE MAY READ/WRITE
// ************************************************************************
Slid.create = function(slid, callback){

}

Slid.read = function(id, callback){
	
}

Slid.update = function(slid, callback){

}

Slid.delete = function(id, callback){

}
