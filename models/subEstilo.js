module.exports = function(){
	var db = require('mongoose');

	var subEstilos = db.Schema({
		nome: {type: String, required: true},
		descricao: {type: String, required: true},
		estilo: { type:db.Schema.ObjectId, ref:"estilos", childPath:"subEstilos" }
	});

	return db.model('subEstilos',subEstilos);
}