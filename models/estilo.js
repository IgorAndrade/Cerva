module.exports = function(){
	var findOrCreate = require('mongoose-findorcreate')
	var db = require('mongoose');

	var estilo = db.Schema({
		brewerydbId:String,
		name: {type: String, required: [true,"Nome é obrigatório"]},
		shortName:String,
		description:String,
		ibuMin:String,
		ibuMax:String,
		abvMin:String,
		abvMax:String,
		srmMin:String,
		srmMax:String,
		ogMin:String,
		fgMin:String,
		fgMax:String,
		status:String,
		category:{type:db.Schema.Types.ObjectId, ref:"category",required: [true,"cervejaria é obrigatório"]},
	});
	estilo.plugin(findOrCreate);

	estilo.statics.subDoc =function(obj){
		if(obj.category && obj.category._id){
			obj.category = obj.category._id;
		}
		return obj;
	};
	
	return db.model('style',estilo);
}