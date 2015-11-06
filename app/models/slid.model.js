"use strict"

var utils = require("../utils/utils.js");
var fs = require("fs");
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;
var relativecontentDirectory = __dirname + CONFIG.contentDirectory;
var path = require("path");

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

  if(utils.isJson(json)) {
    if(json.type && json.id && json.title && json.fileName) {
      this.type = json.type;
    	this.id = json.id;
      this.title = json.title;
      this.fileName = json.fileName;
    } else {
      // handle error when data is missing
    }
  } else {
    // handle error when data is not json
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
	var jsonToReturn = {};
	fs.readdir(relativecontentDirectory, function(err, files) {
      if (err) throw err;
      files.forEach(function(file, i) {
      	console.log(path.extname(file));
      	 if (path.extname(file) == ".json") {
      	 	fs.readFile(relativecontentDirectory + "/" + file,'utf-8', function(err, json) {
          if (err) throw err;
          jsonToReturn = JSON.parse(json);
          if (jsonToReturn.id == id)
          {
          	var slid=new Slid(jsonToReturn);
          	console.log(slid);
          }
      	 	
      	 });
      }
      });
	});
}

Slid.update = function(slid, callback){

}

Slid.delete = function(id, callback){

}

module.exports = Slid;
