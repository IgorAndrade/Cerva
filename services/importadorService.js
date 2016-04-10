module.exports  = function(app) {
	var ModelCerveja = app.models.cerveja;
	var ModelCervejaria = app.models.cervejaria;
	var ModelEstilo = app.models.estilo;
	

	var constant = require('../env/all/constants');

var service = function(callbackSucesso,callbackErro){ 
	self=this;
	this.callbackSucesso=callbackSucesso;
	this.callbackErro=callbackErro;
	this.imgServ = new app.services.imagemService(null,callbackErro);

	this.importarCerveja = function(novaCerveja){
		if(!self.novaCerveja){
			self.novaCerveja=novaCerveja

		}	

		//var cerveja = new ModelCerveja(novaCerveja);

		//Check cervejaria
		if(!self.isObjectid(novaCerveja.brewery)){
			self.importarCervejaria(novaCerveja,novaCerveja.breweries[0]);

			//Check style
		}else if(!self.isObjectid(novaCerveja.style)){
			self.importarEstilo(novaCerveja,self.novaCerveja.style);
		}else{
			//Cria de fato a cerveja
			var cerveja = new ModelCerveja(novaCerveja);

			cerveja.brewerydbId = self.novaCerveja.id;
			cerveja.status=constant.cerveja.status.importado;
			var copo = self.novaCerveja.glass.name;
			if(constant.cerveja.copos.hasOwnProperty(copo))
				cerveja.glass=constant.cerveja.copos[copo];
			else
				cerveja.glass=copo;

			ModelCerveja.findOne({brewerydbId:self.novaCerveja.id},function(erro,achou){
				if(achou)
					callbackSucesso(achou);
				else{
					//upload da img
					self.imgServ.uploadCerveja(self.novaCerveja.labels.medium,
						self.novaCerveja.id,
						function(img){

							cerveja.imagens.rotulo=img._id;

							cerveja.save(function(erro,cervejaSalva){
								if(!erro){ 
									
									ModelCerveja.populate(cervejaSalva,{path:"brewery style imagens.rotulo"},function(erro,populado){
										if(!erro)
											self.callbackSucesso(populado);
										else
											self.callbackErro(erro);
									})
								}else{
									self.callbackErro(erro);
								}
							});

						})
				}
			}).populate('brewery style imagens.rotulo');

			
		}


	};

	this.importarCervejaria = function(novaCerveja,novaCervejaria){
		novaCervejaria.brewerydbId = novaCervejaria.id;
		novaCervejaria.status=constant.cerveja.status.importado;

		//novaCervejaria.beers=[novaCerveja._id];

		ModelCervejaria.findOrCreate(
			{brewerydbId: novaCervejaria.brewerydbId},novaCervejaria,function(erro,cervejariaSalva,isNova){

			if(!erro){ 
				novaCerveja.brewery=cervejariaSalva._id;
				self.importarCerveja(novaCerveja);
			}else
				self.callbackErro(erro);
		})
	};

	this.importarEstilo = function(novaCerveja,novoEstilo){
		novoEstilo.brewerydbId =novoEstilo.id;
		//var style = new ModelEstilo(novoEstilo);
		//style.save(function(erro,newStyle){
		ModelEstilo.findOrCreate(
			{brewerydbId: novoEstilo.brewerydbId},novoEstilo,function(erro,newStyle,isNova){
			if(!erro){
				novaCerveja.style=newStyle._id;
				self.importarCerveja(novaCerveja);
			}else
				self.callbackErro(erro);
		});

	};

	this.isObjectid = function(str){
		str = str + '';
		var len = str.length, valid = false;
		if (len == 12 || len == 24) {
			valid = /^[0-9a-fA-F]+$/.test(str);
		}
		  return valid;
	};

};
return service;
}