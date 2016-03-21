module.exports = function(){
	var db = require('mongoose');

	var estilo = db.Schema({
		nome: {type: String, required: true},
		tipo:{type: String, required: true},
		subEstilos: [{ type:db.Schema.ObjectId, ref:"subEstilos"}]
	});

	return db.model('estilos',estilo);
}