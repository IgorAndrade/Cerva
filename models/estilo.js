module.exports = function(){
	var findOrCreate = require('mongoose-findorcreate')
	var db = require('mongoose');

	var estilo = db.Schema({
		brewerydbId:String,
		name: {type: String, required: [true,"Nome é obrigatório"]},
		shortName:String,
		description:String,
		ibuMin:String,
		ibuMax:String,
		abvMin:String,
		abvMax:String,
		srmMin:String,
		srmMax:String,
		ogMin:String,
		fgMin:String,
		fgMax:String,
		category:String
	});
	estilo.plugin(findOrCreate);
	
	return db.model('style',estilo);
}