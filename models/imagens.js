module.exports = function(){
	var findOrCreate = require('mongoose-findorcreate')
	var db = require('mongoose');

	var imagem = db.Schema({
		public_id: String,
		format: String,
		bytes: Number,
		url: String,
		secure_url: String
	});
	imagem.plugin(findOrCreate);
	return db.model('imagens',imagem);
}