module.exports = function(app){
	var findOrCreate = require('mongoose-findorcreate');
	var relationship = require("mongoose-relationship");
	var db = require('mongoose');
	var img = require('./imagens');

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
		style:{type:db.Schema.Types.ObjectId, ref:"style",required: [true,"cervejaria é obrigatório"]},
		imagens:{
			rotulo:{type:db.Schema.Types.ObjectId, ref:"imagens"},
			garrafa:{type:db.Schema.Types.ObjectId, ref:"imagens"},
			outras:[{type:db.Schema.Types.ObjectId, ref:"imagens"}]
		}

	});
	cerveja.plugin(findOrCreate);
	cerveja.plugin(relationship, { relationshipPathName:'brewery' });
	return db.model('beers',cerveja);
}