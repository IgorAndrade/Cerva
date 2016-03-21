module.exports = function(){
	var db = require('mongoose');

	var cervejaria = db.Schema({
		nome: {type: String, required: true},
		endereco: String,
		cervejas: [{ type:db.Schema.ObjectId, ref:"cervejas" }]
	});

	return db.model('cervejarias',cervejaria);
}