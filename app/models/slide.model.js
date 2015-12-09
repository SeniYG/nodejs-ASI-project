"use strict"

var utils = require("./../utils/utils");
var validator = require("validator");
var fs = require("fs");
var path = require("path");
var Promise = require("promise");
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;
var relativeContentDirectory = __dirname + CONFIG.contentDirectory;


function Slide(slide) {
  if(!validator.isJSON(slide)) {
    console.log("Default constructor.");
    var slide = {
      "type":"",
      "title":"",
      "fileName":"",
      "id":utils.generateUUID()
    };
    slide = JSON.stringify(slide);
  }

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

// ************************************************************************
// PUBLIC METHODS
// ************************************************************************

/**
* Prend un objet slidModel en paramètre, stocke le contenu de [slid.data]
* dans le fichier [slid.fileName] et stocke les meta­données dans un fichier
* [slidModel.id].meta.json dans le répertoire [CONFIG.contentDirectory]..
*/
Slide.create = function(slide, callback){
  if(!validator.isJSON(JSON.stringify(slide)) || slide.id === null) {
    console.log("Not a json or bad id. Creation failed.");
    return null;
  }
  // Store slide.data into slide.fileName
  var promiseDataStored = new Promise(function (resolve, reject) {
    fs.writeFile(relativeContentDirectory + "/" + slide.fileName, slide.getData(), function (err, res) {
      if (err) {
        console.log("Error in CREATION during STORE DATA.");
        reject(err);
      } else {
        console.log("Data stored.");
        resolve(res);
      }
    });
  });

  // Create json file to store metadata
  var promiseMetadataStored = new Promise(function (resolve, reject) {
    fs.writeFile(relativeContentDirectory + "/" + slide.id + ".meta.json", JSON.stringify(slide), function(err, res){
      if (err) {
        console.log("Error in CREATION during STORE METADATA.");
        reject(err);
      } else {
        console.log("Metadata stored.");
        resolve(res);
      }
    });
  });

  // If callback, wait two promise and call callback
  Promise.all([promiseDataStored, promiseMetadataStored])
  .then(function (res) {
    if(callback) {
      callback();
    }
  })
  .catch(function (err) {
    if(callback) {
      callback(err);
    }
  });

};

/**
* Prend un id en paramètre et retourne l’objet slidModel lu depuis le fichier
* [slid.id].meta.json
*/
Slide.read = function(id, callback){
  if(id === null) {
    console.log("Id can't be null. Reading failed.");
    return null;
  }
  var promiseJsonRead = new Promise(function(resolve, reject) {
    var filePath = "./" + utils.getMetaFilePath(id);
    fs.readFile(filePath,'utf-8', function(err, json) {
      if (err) {
        reject(err);
      } else {
        if(validator.isJSON(json)) json = JSON.parse(json);
        if (json.id === id) {
          var dataTemp = json.data;
          json = JSON.stringify(json);
          var slide = new Slide(json);
          slide.setData(dataTemp);
          resolve(slide);
        }
      }
    });
  });

  Promise.all([promiseJsonRead])
  .then(function (slide) {
    if(callback) {
      callback(null, slide[0]);
    } else {
      return slide;
    }
  })
  .catch(function (err) {
    if(callback) {
      callback(err, null);
    } else {
      return {};
    }
  });
};

/**
* Prend l’id d’un SlidModel en paramètre et met à jour le fichier de metadata
* ([slid.id].meta.json) et le fichier [slid.fileName] si [slid.data] est renseigné
* (non nul avec une taille > 0).
*/
Slide.update = function(slide, callback) {
  if(validator.isJSON(slide)) slide = JSON.parse(slide);
  var promiseUpdateMetadata = new Promise(function (resolve, reject) {
    // Check if exist
    Slide.read(slide.id, function(err, slide) {
      if(err) {
        console.log("Slide doesn't exist. Updating failed.");
        reject(err);
      } else {
        Slide.create(slide, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });

  Promise.all([promiseUpdateMetadata])
  .then(function () {
    if(callback) {
      callback(null);
    }
  })
  .catch(function (err) {
    if(callback) {
      callback(err);
    }
  });
};

/**
* supprime les fichiers data ([slid.src]) et metadata ([slid.id].meta.json)
*/
Slide.delete = function(id, callback){
  this.read(id, function(err, slide) {
    if(err) console.log(err);

    var promiseDeleteData = new Promise(function(resolve, reject) {
      fs.unlink(relativeContentDirectory + "/" + slide.fileName, function (err) {
        if (err) {
          reject(err);
        } else {
          console.log('Successfully deleted ' + slide.fileName);
          resolve();
        }
      });
    });

    var promiseDeleteMetadata = new Promise(function(resolve, reject) {
      fs.unlink(relativeContentDirectory + "/" + slide.id + ".meta.json", function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
          console.log('Successfully deleted ' + slide.id + ".meta.json");
        }
      });
    });

    Promise.all([promiseDeleteData, promiseDeleteMetadata])
    .then(function () {
      if(callback) {
        callback();
      }
    })
    .catch(function (err) {
      if(callback) {
        callback(err);
      }
    });
  });

};

module.exports = Slide;
