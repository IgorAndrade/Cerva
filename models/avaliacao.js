module.exports = function () {
    var findOrCreate = require('mongoose-findorcreate')
    var db = require('mongoose');

    var avaliacao = db.Schema({
        beer: {type: db.Schema.Types.ObjectId, ref: "beers",  required: [true, "cerveja é obrigatório"]},
        user: {type: db.Schema.Types.ObjectId, ref: "usuarios", childPath:"avaliacoes" , required: [true, "Usuário é obrigatório"]},
        data: Date,
        rates: {
            aroma: Number,
            appearance: Number,
            taste: Number,
            palate: Number,
            overall: Number
        },
        comments: String,
        total: Number
    });
    avaliacao.plugin(findOrCreate);

    avaliacao.statics.subDoc = function (obj) {
        if (obj.beer && obj.beer._id) {
            obj.beer = obj.beer._id;
        }
        if (obj.user && obj.user._id) {
            obj.user = obj.user._id;
        }
        return obj;
    };

    return db.model('avaliacao', avaliacao);
}