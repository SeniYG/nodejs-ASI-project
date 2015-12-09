"use strict"

var utils = require("./../utils/utils");

function Presentation (json) {

	// ************************************************************************
	// PRIVATE VARIABLES AND FUNCTIONS
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE
	// ***********************************************************************
	//var data = "";

	// ************************************************************************
	// PRIVILEGED METHODS
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS
	// ************************************************************************
	//this.getData = function(){ return this.data };
	//this.setData = function(data){ this.data = data };

	// ************************************************************************
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE => constructor
	// ************************************************************************
	this.type = "";
	this.id = "";
	this.description = "";
	this.slidArray = {};
}

module.exports = Presentation;
gi
