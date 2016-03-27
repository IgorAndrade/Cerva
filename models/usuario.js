module.exports = function(){
	var db = require('mongoose');

	var usuario = db.Schema({
		nome: {type: String, required: [true,"nome é obrigatório"]},
		email:{type: String, required: [true,"email é obrigatório"]},
		senha:{type: String, required: [true,"senha é obrigatório"]},
		tokenGoogle: String
	});

	return db.model('usuarios',usuario);
}