"use strict"

var utils = require("./../utils/utils");
var validator = require("validator");

function Slide(slide) {
  if(!validator.isJSON(slide)) {
    console.log("Can't create object with an invalid json.");
    return null;
  } else {
    // Parse to json object if isJSON is valid
    slide = JSON.parse(slide);

    // ************************************************************************
  	// PRIVATE VARIABLES AND FUNCTIONS
  	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE
  	// ***********************************************************************
  	var data = "";

  	// ************************************************************************
  	// PRIVILEGED METHODS
  	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS
  	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS
  	// ************************************************************************
  	this.getData = function(){ return this.data };
  	this.setData = function(data){ this.data = data };

  	// ************************************************************************
  	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE => constructor
  	// ************************************************************************
  	this.type = slide.type || "";
  	this.id = slide.id || utils.generateUUID();
  	this.title = slide.title || "";
  	this.fileName = slide.fileName || "";
  }
}

// ************************************************************************
// PUBLIC METHODS -- ANYONE MAY READ/WRITE
// ************************************************************************

/**
 * Prend un objet slidModel en paramètre, stocke le contenu de [slid.data]
 * dans le fichier [slid.fileName] et stocke les meta­données dans un fichier
 * [slidModel.id].meta.json dans le répertoire [CONFIG.contentDirectory]..
 */
Slide.create = function(slide, callback){

};

/**
 * Prend un id en paramètre et retourne l’objet slidModel lu depuis le fichier
 * [slid.id].meta.json
 */
Slide.read = function(id, callback){

};

/**
 * Prend l’id d’un SlidModel en paramètre et met à jour le fichier de metadata
 * ([slid.id].meta.json) et le fichier [slid.fileName] si [slid.data] est renseigné
 * (non nul avec une taille > 0).
 */
Slide.update = function(slide, callback) {

};

/**
 * supprime les fichiers data ([slid.src]) et metadata ([slid.id].meta.json)
 */
Slide.delete = function(id, callback){
  
};

module.exports = Slide;
