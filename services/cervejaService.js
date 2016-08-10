module.exports = function (app) {
    var sync = require('synchronize');
    var Crud = require('./crud');
    var multer = require('multer');
    var upload = multer({dest: './uploads'});
    var ModelCerveja = app.models.cerveja;
    var crud = new Crud(ModelCerveja, "brewery style imagens.rotulo imagens.outros");
    var conf = app.conf;
    var constant = require('../env/all/constants');
    var ImgService = require('./imagemService')(app);

    var BreweryDb = require('brewerydb-node');
    var brewdb = new BreweryDb(conf.all.chaves.brewerydb);

    var Service = {
        pesquisar: function (req, res, next) {
            try {
                sync.parallel(function () {
                    brewdb.search.beers({withBreweries: "Y", q: req.query.q}, sync.defers());
                    ModelCerveja.find({name: new RegExp(req.query.q,"i")}).populate("brewery style imagens.rotulo imagens.outros").exec(sync.defers());
                });
                var results = sync.await();
                results = [].concat.apply(results[0][0], results[1]);
                res.status(200).json(results);
            } catch (e) {
                res.status(412).json({"error": e});
            }
        },
        buscarById: function (req, res, next) {
            var cerveja = null;
            if(ModelCerveja.isObjectid(req.params.id))
                crud.buscarById(req, res, next);
            else
                Service.importar(req,res,next);
        },

        convertFromBreweryDb: function (lista) {
            var resultado = [];
            for (var c in lista) {
                var cerveja = new app.models.cerveja();
                cerveja.nome = c.name;
                cerveja.abv = c.abv;
                cerveja.descricao = c.description;


                resultado.push(cerveja);
            }
        },

        listarEstilos: function (req, res, next) {
            var crud = new Crud(app.models.estilo);
            crud.listar(req, res, next);
        },

        importar: function (req, res, next) {
            var Importador = app.services.importadorService;
            var retorno = sync.await(brewdb.beer.getById(req.params.id, {withBreweries: "Y"}, sync.defer()));

            var importador = new Importador("brewery style  imagens.rotulo");

            importador.importarCerveja(retorno, Service.callback(req, res, next));

        },

        listarStatus: function (req, res, next) {
            var lista = [];
            var Status = constant.cerveja.status;
            for (var status in Status)
                lista.push(Status[status]);
            res.status(200).json(lista);

        },

        uploadImg: function (req, res, next) {
            sync.fiber(function () {
                if (req.files) {
                    var imgService = new ImgService();
                    sync(imgService, "uploadFile");
                    sync(ModelCerveja, "findById", "populate");
                    var cerveja = ModelCerveja.findById(req.body.id);
                    var imgs = {imagens: {}};
                    cerveja = ModelCerveja.populate(cerveja, {path: "imagens.rotulo imagens.garrafa"});
                    if (req.files.rotulo) {
                        if (cerveja.imagens.rotulo) {
                            imgService.removeImg(cerveja.imagens.rotulo.public_id, function (error, result) {

                            });
                        }
                        var rotulo = imgService.uploadFile(req.files.rotulo[0].path, {public_id: "cerveja_rotulo_" + cerveja._id});
                        imgs.imagens.rotulo = rotulo._id;

                    }
                    if (req.files.garrafa) {
                        if (cerveja.imagens.garrafa) {
                            imgService.removeImg(cerveja.imagens.garrafa.public_id, function () {
                            });
                        }
                        var garrafa = imgService.uploadFile(req.files.garrafa[0].path, {public_id: "cerveja_garrafa_" + cerveja._id});
                        imgs.imagens.garrafa = garrafa._id;
                    }
                    if (imgs.imagens) {
                        ModelCerveja.update({_id: req.body.id}, {$set: imgs}, function (error, result) {
                            if (error)
                                res.status(412).json({"error": error});
                            else
                                res.status(200).json(cerveja);
                        })
                    }
                }
            });
        },

        callback: function (req, res, next) {
            function cb(error, retorno) {
                if (error)
                    res.status(412).json({"error": error});
                else
                    res.status(200).json(retorno);
            }

            return cb;
        }

    };

    app.post('/services/cerveja', crud.inserir);
    app.get('/services/cerveja', crud.listar);
    app.get('/services/cerveja/status', Service.listarStatus);
    app.get('/services/cerveja/pesquisar', function (req, res, next) {
        sync.fiber(next)
    }, Service.pesquisar);
    app.post('/services/cerveja/estilos', Service.listarEstilos);
    app.get('/services/cerveja/brewdb/:id', Service.buscarById);
    app.get('/services/cerveja/:id', function (req, res, next) {
        sync.fiber(next)
    }, Service.buscarById);
    app.get('/services/cerveja/importar/:id', function (req, res, next) {
        sync.fiber(next)
    }, Service.importar);
    app.get('/services/cerveja/:id/importar', function (req, res, next) {
        sync.fiber(next)
    }, Service.importar);
    app.post('/services/cerveja/upload', upload.fields([{name: 'rotulo'}, {name: 'garrafa'}]), Service.uploadImg);
    app.put('/services/cerveja/:id', crud.update);
    app.delete('/services/cerveja/:id', crud.deletar);


    return Service;

}
;