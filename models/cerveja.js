module.exports = function(){
	var db = require('mongoose');

	var cerveja = db.Schema({
		nome: {type: String, required: true},
		descricao: {type: String, required: false}
	});

	return db.model('cervejas',cerveja);
}