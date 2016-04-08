module.exports  = function(app) {
var Crud = require('./crud');
var Importador = require('./importadorService')(app);

var crud = new Crud(app.models.cerveja);
var conf = app.conf;

var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb(conf.all.chaves.brewerydb);
var Service = {
	pesquisar:function(req,res,next){
		brewdb.search.beers(req.query, function(error,obj,obj2){
			if(error)
				res.status(412).json({ "error": error });
			else
				res.status(200).json(obj);
		});
	},
	buscarById:function(req,res,next){
		brewdb.beer.getById(req.params.id, { withBreweries: "Y" }, function(error,obj,obj2){
			if(error)
				res.status(412).json({ "error": error });
			else
				res.status(200).json(obj);
		}); 
	},

	convertFromBreweryDb:function(lista){
		var resultado=[];
		for (var c in lista) {
			var cerveja = new app.models.cerveja();
			cerveja.nome=c.name;
			cerveja.abv=c.abv;
			cerveja.descricao=c.description;
		

			resultado.push(cerveja);
		}
	},

	importar:function(req,res,next){
		brewdb.beer.getById(req.params.id, { withBreweries: "Y" }, function(error,obj,obj2){
			if(error)
				res.status(412).json({ "error": error });
			else{
				var importador = new Importador(
					function(obj){
						res.status(200).json(obj);
					},
					function(erro){
						res.status(412).json({ "error": erro });
					});
				importador.importarCerveja(obj);
			}
				
		}); 
	}



};

app.post('/services/cerveja', crud.inserir);
app.get('/services/cerveja', crud.listar);
app.get('/services/cerveja/pesquisar', Service.pesquisar);
app.get('/services/cerveja/:id', Service.buscarById);
app.get('/services/cerveja/importar/:id', Service.importar);
app.put('/services/cerveja/:id', crud.update);
app.delete('/services/cerveja/:id', crud.deletar);

return Service;

}