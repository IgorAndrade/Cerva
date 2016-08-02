module.exports  = function(app) {
var Crud = require('./crud');

var crud = new Crud(app.models.cervejaria,"imagem");

var Service = {



};

app.post('/services/cervejaria', crud.inserir);
app.get('/services/cervejaria', crud.listar);
app.get('/services/cervejaria/:id', crud.buscarById);
app.put('/services/cervejaria/:id', crud.update);
app.delete('/services/cervejaria/:id', crud.deletar);

return Service;

};