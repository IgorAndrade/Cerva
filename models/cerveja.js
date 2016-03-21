module.exports = function(){
	var db = require('mongoose');

	var cerveja = db.Schema({
		nome: {type: String, required: true},
		descricao: {type: String, required: true},
		pais:{type: String, required: false},
		cervejaria: { type:db.Schema.ObjectId, ref:"cervejarias", childPath:"cervejas" , required: true}
	});

	return db.model('cervejas',cerveja);
}