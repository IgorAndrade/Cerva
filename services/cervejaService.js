module.exports  = function(app) {
var Crud = require('./crud');

var crud = new Crud(app.models.cerveja);
var conf = app.conf;

var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb(conf.all.chaves.brewerydb);
var Service = {
	pesquisar:function(req,res,next){
		var q = req.query.q;
		brewdb.search.beers({ q: q }, function(error,obj,obj2){
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
	}



};

app.post('/services/cerveja', crud.inserir);
app.get('/services/cerveja', crud.listar);
app.get('/services/cerveja/pesquisar',app.isLoggedInAjax, Service.pesquisar);
app.get('/services/cerveja/:id', crud.buscarById);
app.put('/services/cerveja/:id', crud.update);
app.delete('/services/cerveja/:id', crud.deletar);

return Service;

}