module.exports  = function(app) {
	var cloudinary = require('../env/all/imgRepo');
	var ImgModel = app.models.imagens;
	var multer  = require('multer');
	var Etapas  = require('../utils/wait');
	//var storage = multer.memoryStorage()
	//var upload = multer({ storage: storage })
	var upload = multer({ dest: './uploads'});

var service = function(callback,callbackErro){
	this.callback = callback;
	this.callbackErro=callbackErro;
	this.retorno = {rotulo:"",garrafa:""};
	var self = this;

	this.upload = function(file,nome,pasta,callback){
		if(!file || !nome)
			return;

		var options = {
			public_id:nome,
			folder:pasta,
			format:"jpg"
		};

		if(callback)
			self.callback = callback;

		cloudinary.v2.uploader.upload(file.path, options, self.salvaRetorno);
	},

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



		cloudinary.v2.uploader.upload(file, options, self.salvaRetorno(callback));
	},

	this.salvaRetorno = function(callback){

		return function(erro,retorno){
			if(!retorno || erro)
				self.callbackErro(erro);
			else{
				var img = new ImgModel(retorno);
				img.save(function(erro,imgSalva){
					if(erro)
						self.callbackErro(erro);
					else{
						callback(imgSalva);
					}
				});
			}
		}
	},

	this.uploadUrl = function(req,res,next){
		var f;
		var etapa = new Etapas(termino);
		self.callbackErro = trataErro;
		if(req.files){
			var dados = req.body;
			if(req.files.rotulo){
				f=req.files.rotulo[0];
				etapa.wait("rotulo");
				self.trataFiles(f,dados,"rotulo",function(img){
					self.retorno.rotulo=img;
					etapa.notifica("rotulo",true);
				},trataErro);
			}
			if(req.files.garrafa){
				f=req.files.garrafa[0];
				etapa.wait("garrafa");
				self.trataFiles(f,dados,"garrafa",function(img){
					self.retorno.garrafa=img;
					etapa.notifica("garrafa",true);
				},trataErro);
			}
			etapa.check();
		}else
			res.status(412).json({ "error": "Sem arquivo" });

		function termino(){
			res.status(200).json(self.retorno);
		}
		function trataErro(erro){
			res.status(412).json({ "error": erro });
		}
	},

	this.trataFiles = function(file,dados,etapa,cbSucesso,cbErro){
		self.upload(file,dados.name,dados.pasta,cbSucesso);
	}
};

var up = new service();

app.post('/services/upload', upload.fields([{ name: 'rotulo' },{name:'garrafa'}]) ,up.uploadUrl);

return service;
}