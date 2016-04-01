module.exports = function(){
	var db = require('mongoose');
	var bcrypt   = require('bcrypt-nodejs');
	var generatePassword = require("password-generator");

	var usuario = db.Schema({
		nome: {type: String, required: [true,"nome é obrigatório"]},
		email:{type: String, required: [true,"email é obrigatório"]},
		senha:{type: String, required: [true,"senha é obrigatório"]},
		google:{
			id:String,
			token:String
		},
		facebook:{
			id:String,
			token:String
		}
	});


// generating a hash
usuario.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usuario.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.senha);
};

// gerador de senha
usuario.methods.gerarSenha= function() {
    return generatePassword(6, false);
};

	return db.model('usuarios',usuario);
}