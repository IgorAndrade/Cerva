module.exports = function (app) {
    var Crud = require('./crud');
    var ModelAv = app.models.avaliacao;
    var crud = new Crud(ModelAv, "user beer");

    var Service = {
    }


    app.post('/services/avaliacao', crud.inserir);
    app.get('/services/avaliacao', crud.listar);
    app.get('/services/avaliacao/:id', crud.buscarById);
    app.put('/services/avaliacao/:id', crud.update);
    app.delete('/services/avaliacao/:id', crud.deletar);


    return Service;

}
;