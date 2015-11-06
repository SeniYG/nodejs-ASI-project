"use strict"

var utils = require("./../utils/utils.js");
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
	this.getData = function(){ return this.data };
	this.setData = function(data){ this.data = data };

	// ************************************************************************
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE
	// ************************************************************************

  if(utils.isJson(json)) {
  	json = JSON.parse(json);
    if(json.type && json.id && json.title && json.fileName) {
      this.type = json.type;
      this.id = json.id;
      this.title = json.title;
      this.fileName = json.fileName;
    } else {
      // handle error when data is missing
      console.log("ma bite");
    }
  } else {
    // handle error when data is not json

  }
}

// ************************************************************************
// PUBLIC METHODS -- ANYONE MAY READ/WRITE
// ************************************************************************
Slid.create = function(slide, callback){

	var json = '{"id":"1234","type":"png","fileName":"image_1","title":"ma bite","data":"this is the data"}';
	var slid = new Slid(json);
	slid.setData("this is the data");

	console.log(json);
	console.log(slid.fileName);
	console.log(slid.type);
	console.log(slid.getData());

	//store data into fileName
	fs.writeFile(relativePresentationDirectory + "/" + slid.fileName + "." + slid.type, slid.getData(), function (err) {
         if (err) throw err;
         console.log("data has been written in file");
    });

	//create json file to store metadata
	console.log(JSON.stringify(slid));
	fs.writeFile(relativePresentationDirectory + "/" + slid.id + ".meta.json", JSON.stringify(slid), function(err){
		if (err) throw err;
		console.log("metadata stored");
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
