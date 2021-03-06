module.exports = function (app) {
    var Crud = require('./crud');
    var ModelStyle = app.models.estilo;
    var ModelCat = app.models.category;
    var crud = new Crud(ModelStyle, "category");
    var crudCat = new Crud(ModelCat, null);

    var Service = {
        update:function (req, res,next) {
            var obj = req.body;
            var category = obj.category;
            if(category) {
                if (category._id){
                    var id = category._id;
                    delete category._id;
                    ModelCat.update({_id: id}, {$set: category}, function (error, row, a) {
                        req.body.category=id;
                        next();
                    });
                }
                else {
                    var model = new ModelCat(category);
                    model.save(function (error,cat) {
                        req.body.category=cat;
                        next();
                    });
                }
            }

        }
    }


    app.post('/services/style', crud.inserir);
    app.get('/services/style', crud.listar);
    app.get('/services/style/categoria', crudCat.listar);
    app.get('/services/style/:id', crud.buscarById);
    app.put('/services/style/:id', Service.update);
    app.put('/services/style/:id', crud.update);
    app.delete('/services/style/:id', crud.deletar);


    return Service;

}
;