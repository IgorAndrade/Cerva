module.exports  = function(app) {
var Crud = require('./crud');

var crud = new Crud(app.models.cerveja);

var Service = {



};

app.post('/services/cerveja', crud.inserir);
app.get('/services/cerveja', crud.listar);
app.get('/services/cerveja/:id', crud.buscarById);
app.put('/services/cerveja/:id', crud.update);
app.delete('/services/cerveja/:id', crud.deletar);

return Service;

}