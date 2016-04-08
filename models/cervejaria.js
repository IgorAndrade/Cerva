module.exports = function(){
	var db = require('mongoose');

	var cervejaria = db.Schema({
		beers: [{ type:db.Schema.Types.ObjectId, ref:"beers" }],
		brewerydbId:String,
		name:{type: String, required: [true,"Nome é Obrigatório"]},
		website:String,
		status:String,
		pais:String,
		endereco: String,
		googlePlace:String
	});

	return db.model('breweries',cervejaria);
}