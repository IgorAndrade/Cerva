module.exports = function(){
	var findOrCreate = require('mongoose-findorcreate')
	var db = require('mongoose');

	var category = db.Schema({
		brewerydbId:String,
		name: {type: String, required: [true,"Nome é obrigatório"]},
		familia:String
	});
	category.plugin(findOrCreate);
	
	return db.model('category',category);
}