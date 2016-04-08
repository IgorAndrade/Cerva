module.exports = function(app){
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
		style:{type:db.Schema.Types.ObjectId, ref:"style",required: [true,"cervejaria é obrigatório"]}

	});

	return db.model('beers',cerveja);
}