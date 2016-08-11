module.exports = function (app) {
    "use strict";
    var sync = require('synchronize');
    var ModelCerveja = app.models.cerveja;
    var ModelCervejaria = app.models.cervejaria;
    var ModelEstilo = app.models.estilo;
    var ModelCategory = app.models.category;
    var ImgService = require('./imagemService')(app);

    var constant = require('../env/all/constants');

    var service = function (pop) {
        var self = this;
        self.populate = pop;

        this.importarCerveja = function (cerveja,cb) {
            try {
                var imgService = new ImgService();
                cerveja.status = constant.cerveja.status.importado;
                cerveja.brewerydbId = cerveja.id;

                sync(ModelCerveja, "findOne");
                var achou = ModelCerveja.findOne({brewerydbId: cerveja.id});
                if (achou) {
                    ModelCerveja.populate(achou, {path: self.populate}, cb);
                    return;
                }

                //Copo
                var copo = cerveja.glass.name;
                if (constant.cerveja.copos.hasOwnProperty(copo))
                    cerveja.glass = constant.cerveja.copos[copo];
                else
                    cerveja.glass = copo;

                cerveja.brewery = self.importarCervejaria(cerveja.breweries[0]);
                cerveja.style = self.importarEstilo(cerveja.style);

                sync(imgService, "uploadFile");
                var img = imgService.uploadFile(cerveja.labels.medium, {public_id: "cerveja_" + cerveja.brewerydbId});
                cerveja.imagens = {rotulo: img};

                cerveja = ModelCerveja.subDoc(cerveja);

                var model = ModelCerveja(cerveja);
                model.save(function (error, salvo) {
                    if (error)
                        cb(error);
                    else {
                        ModelCerveja.populate(salvo, {path: self.populate}, cb);
                    }
                })

            }catch (error){
                cb(error);
            }

        };

        this.importarCervejaria = function (cervejaria) {
            sync(ModelCervejaria, "findOrCreate");
            cervejaria.status=constant.cerveja.status.importado;
            cervejaria.brewerydbId = cervejaria.id;
            //img
            var imgService = new ImgService();
            sync(imgService, "uploadFile");
            var img = imgService.uploadFile(cervejaria.images.medium, {public_id: "cervejaria_" + cervejaria.brewerydbId});
            cervejaria.imagem = img._id;

            cervejaria = ModelCervejaria.findOrCreate({ brewerydbId: cervejaria.id}, cervejaria);
            return cervejaria;
        };

        this.importarEstilo = function (estilo) {
            sync(ModelEstilo, "findOrCreate");
            estilo.status=constant.cerveja.status.importado;
            estilo.brewerydbId = estilo.id;
            estilo.category = self.importarCategoria(estilo.category);
            estilo = ModelEstilo.subDoc(estilo);
            estilo = ModelEstilo.findOrCreate({ $or:[ { brewerydbId: estilo.id},{name: estilo.name}]}, estilo);
            return estilo;
        };
        this.importarCategoria = function (categoria) {
            sync(ModelCategory, "findOrCreate");
            categoria.brewerydbId = categoria.id;
            categoria = ModelCategory.findOrCreate({ $or:[ { brewerydbId: categoria.id},{name: categoria.name}]}, categoria);
            return categoria;
        };

    };
    return service;
}