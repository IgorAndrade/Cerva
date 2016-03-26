module.exports = function(){
	var db = require('mongoose');

	var cerveja = db.Schema({
		nome: {type: String, required: [true,"nome é obrigatório"]},
		descricao: {type: String, required: false},
		pais:{type: String, required: false},
		abv:Number,
		cervejaria: { type:db.Schema.ObjectId, ref:"cervejarias", childPath:"cervejas" , required: [true,"cervejaria é obrigatório"]}
	});

	return db.model('cervejas',cerveja);
}