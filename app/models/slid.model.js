"use strict"

var utils = require("../../utils/utils");
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;

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
  if(utils.isJson(json)) {
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

	//store data into fileName
	fs.writeFile(slid.fileName, data, function (err) {
         if (err) throw err;
         console.log("data has been written in file");
    });

	//create json file to store metadata
	fs.writeFile(slid.id + ".meta.json", slid.stringify(), function(err){
		if (err) throw err;
	});

	if(callback)
		callback();

}

Slid.read = function(id, callback){

}

Slid.update = function(slid, callback){

}

Slid.delete = function(id, callback){

}

module.exports = Slid;
