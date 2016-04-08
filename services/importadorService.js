module.exports  = function(app) {
	var ModelCerveja = app.models.cerveja;
	var ModelCervejaria = app.models.cervejaria;
	var ModelEstilo = app.models.estilo;

	var constant = require('../env/all/constants');

var service = function(callbackSucesso,callbackErro){ 
	self=this;
	this.callbackSucesso=callbackSucesso;
	this.callbackErro=callbackErro;


	this.importarCerveja = function(novaCerveja){
		if(!self.novaCerveja)
			self.novaCerveja=novaCerveja

		var cerveja = new ModelCerveja(novaCerveja);

		//Check cervejaria
		if(!self.isObjectid(cerveja.brewery)){
			self.importarCervejaria(cerveja,novaCerveja.breweries[0]);

			//Check style
		}else if(!self.isObjectid(cerveja.style)){
			self.importarEstilo(cerveja,self.novaCerveja.style);
		}else{
			//Cria de fato a cerveja
			cerveja.status=constant.cerveja.status.importado;
			var copo = self.novaCerveja.glass.name;
			if(constant.cerveja.copos.hasOwnProperty(copo))
				cerveja.glass=constant.cerveja.copos[copo];
			else
				cerveja.glass=copo;


			cerveja.save(function(erro,cervejaSalva){
				if(!erro){ 
					ModelCerveja.populate(cervejaSalva,{path:"brewery style"},function(erro,populado){
						if(!erro)
							self.callbackSucesso(cervejaSalva);
						else
							self.callbackErro(erro);
					})
				}else{
					self.callbackErro(erro);
				}
			});
		}


	};

	this.importarCervejaria = function(novaCerveja,novaCervejaria){
		novaCervejaria.brewerydbId = novaCervejaria.id;
		novaCervejaria.status=constant.cerveja.status.importado;

		var cervejaria = new ModelCervejaria(novaCervejaria);
		cervejaria.beers.push(novaCerveja._id);

		cervejaria.save(function(erro,cervejariaSalva){
			if(!erro){ 
				novaCerveja.brewery=cervejariaSalva._id;
				self.importarCerveja(novaCerveja);
			}else
				self.callbackErro(erro);
		})
	};

	this.importarEstilo = function(novaCerveja,novoEstilo){
		novoEstilo.brewerydbId =novoEstilo.id;
		var style = new ModelEstilo(novoEstilo);
		style.save(function(erro,newStyle){
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