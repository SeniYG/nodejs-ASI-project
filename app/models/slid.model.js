"use strict"

var isJson = require("../../modules/is-json");

function Slid (json) {

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
	// isJson?
  if(isJson(json)) {
    if(json.type && json.id && json.title && json.fileName) {
      this.type = json.type;
    	this.id = json.id;
      this.title = json.title;
      this.fileName = json.fileName;
    }
  } else {

  }

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

module.exports = Slid;
