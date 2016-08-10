module.exports = function(app){
	"use strict";
	var findOrCreate = require('mongoose-findorcreate');
	var relationship = require("mongoose-relationship");
	var db = require('mongoose');

	var cerveja = db.Schema({
		brewerydbId:String,
		name: {type: String, required: [true,"nome é obrigatório"]},
		nameDisplay:String,
		description:String,
		abv:Number,
		ibu:Number,
		isOrganic:String,
		status:String,
		createDate:Date,
		glass:String,
		servingTemperatureDisplay:String,
		brewery: { type:db.Schema.Types.ObjectId, ref:"breweries", childPath:"beers" , required: [true,"Cervejaria é obrigatório"]},
		style:{type:db.Schema.Types.ObjectId, ref:"style",required: [true,"style é obrigatório"]},
		imagens:{
			rotulo:{type:db.Schema.Types.ObjectId, ref:"imagens"},
			garrafa:{type:db.Schema.Types.ObjectId, ref:"imagens"},
			outras:[{type:db.Schema.Types.ObjectId, ref:"imagens"}]
		}

	});
	cerveja.plugin(findOrCreate);
	cerveja.plugin(relationship, { relationshipPathName:'brewery' });

	cerveja.statics.subDoc = function(obj) {
	 	if(obj.imagens){
	 		if(obj.imagens.rotulo){
	 			var rotulo = obj.imagens.rotulo;
	 			if(rotulo._id){
	 				obj.imagens.rotulo = rotulo._id
	 			}
	 		}
	 		if(obj.imagens.garrafa){
	 			var garrafa = obj.imagens.garrafa;
	 			if(garrafa._id){
	 				obj.imagens.garrafa = garrafa._id
	 			}
	 		}
	 		if(obj.style && obj.style._id)
	 			obj.style = obj.style._id;
	 		
	 		if(obj.brewery && obj.brewery._id)
	 			obj.brewery = obj.brewery._id;
	 	}
	 	return obj;
	};


	cerveja.statics.isObjectid = function(str){
		str = str + '';
		var len = str.length, valid = false;
		if (len == 12 || len == 24) {
			valid = /^[0-9a-fA-F]+$/.test(str);
		}
		return valid;
	};

	return db.model('beers',cerveja);
}