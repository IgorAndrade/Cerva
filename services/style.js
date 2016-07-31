module.exports = function (app) {
    var Crud = require('./crud');

    var crud = new Crud(app.models.estilo, "category");


    app.post('/services/style', crud.inserir);
    app.get('/services/style', crud.listar);
    app.put('/services/style/:id', crud.update);
    app.delete('/services/style/:id', crud.deletar);


    return null;

}
;