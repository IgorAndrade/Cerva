module.exports = function(){
	var findOrCreate = require('mongoose-findorcreate');
	var db = require('mongoose');

	var cervejaria = new db.Schema({
		beers: [{ type:db.Schema.Types.ObjectId, ref:"beers" }],
		brewerydbId:String,
		description:String,
		name:{type: String, required: [true,"Nome é Obrigatório"]},
		website:String,
		imagem:{type:db.Schema.Types.ObjectId,ref:"imagens"},
		status:String,
		pais:String,
		endereco: String,
		googlePlace:String
	});
	cervejaria.plugin(findOrCreate);
	return db.model('breweries',cervejaria);
}