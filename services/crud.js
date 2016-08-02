module.exports = function (modelo, populate) {
    "use strict";

    require('mongoose-pagination');
    var self = this;
    this.Modelo = modelo;
    this.populate = populate;
    this.callback = function (req, res, next) {
        var callback = function (erro, obj) {
            if (erro) {
                res.status(412).json(erro);
            } else {
                res.status(200).json(obj);
            }
        };
        return callback;
    };

    this.inserir = function (req, res, next) {
        var obj = req.body;
        if (self.Modelo.subDoc)
            obj = self.Modelo.subDoc(obj)

        var model = new self.Modelo(obj);
        model.save(self.callback(req, res, next));
    };

    this.update = function (req, res, next) {
        var obj = req.body;
        if (self.Modelo.subDoc)
            obj = self.Modelo.subDoc(obj)
        self.Modelo.update({_id: req.params.id}, {$set: obj}, function (error, row, a) {
            if (error) {
                res.status(412).json(error);
            }else{
                self.Modelo.findById(req.params.id,self.callback(req, res, next));
            }
        });
    };

    this.listar = function (req, res, next) {

        var q = {query: {}};
        if (req.query.q) {
            q.query = JSON.parse(req.query.q);
            for (var key in q.query) {
                var regex = new RegExp(q.query[key], 'i');
                q.query[key] = regex;
            }
        }
        if (req.query.sort)
            q.sort = JSON.parse(req.query.sort);
        if (self.populate)
            q.populate = self.populate;

        if (req.query.qtd && req.query.pg) {
            q.qtd = req.query.qtd;
            q.pg = req.query.pg;
            self.pesquisar(q, function (erro, docs, total) {
                if (erro) {
                    res.status(412).json(erro);
                } else {
                    res.status(200).json({data: docs, total: total});
                }
            })
        } else
            self.pesquisar(q, self.callback(req, res, next));
    }


    this.pesquisar = function (q, cb) {
        var query = self.Modelo.find(q.query);
        if (q.sort)
            query.sort(q.sort);
        if (q.populate)
            query.populate(q.populate);
        if (q.qtd && q.pg)
            query.paginate(parseInt(q.pg), parseInt(q.qtd), cb);
        else
            query.exec(cb);
    };

    this.buscarById = function (req, res, next) {
        if (req.params.id) {
            var query = self.Modelo.findById(req.params.id);
            if (self.populate)
                query.populate(self.populate);
            query.exec(self.callback(req, res, next));
        } else
            res.status(400).json({"error": "Sem id"});
    };

    this.deletar = function (req, res, next) {

        self.Modelo.findByIdAndRemove(req.params.id, self.callback(req, res, next));
    };

};