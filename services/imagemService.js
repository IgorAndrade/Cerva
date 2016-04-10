module.exports  = function(app) {
	var cloudinary = require('../env/all/imgRepo');
	var ImgModel = app.models.imagens;

var service = function(callback,callbackErro){
	this.callback = callback;
	this.callbackErro=callbackErro;
	var self = this;

	this.uploadCerveja = function(file,nome,callback){
		if(!file || !nome)
			return;

		var options = {
			public_id:"cerveja_"+nome,
			folder:"Cerveja",
			format:"jpg"
		};

		if(callback)
			self.callback = callback;

		cloudinary.v2.uploader.upload(file, options, self.salvaRetorno);
	},

	this.uploadAvaliacao = function(file,nome,callback){
		if(!file || !nome)
			return;
		
		var options = {
			public_id:"Aval_"+nome,
			folder:"Avaliacao",
			format:"jpg"
		};

		if(callback)
			self.callback = callback;

		cloudinary.v2.uploader.upload(file, options, self.salvaRetorno);
	},

	this.salvaRetorno = function(erro,retorno){
		if(!retorno || erro)
			self.callbackErro(erro);
		else{
			var img = new ImgModel(retorno);
			img.save(function(erro,imgSalva){
				if(erro)
					self.callbackErro(erro);
				else{
					self.callback(imgSalva);
				}
			});
		}
	}
}


return service;
}