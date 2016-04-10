// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
module.exports  = function(app) {
var LocalStrategy   = require('passport-local').Strategy;    
var passport = require('passport');
var constant = require('../env/all/constants');
var Usuario = app.models.usuario;
var configAuth = app.auth;

// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, user) {
            done(err, user);
        });
    });

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'senha',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // asynchronous
    process.nextTick(function() {
        Usuario.findOne({ 'email' :  email }, function(err, user) {
            try{
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, { error: 'Usuário não encontrado' });

                if (!user.validPassword(password))
                    return done(null, { error: 'Senha inválida!' });

                // all is well, return user
                else
                    return done(null, user);
            }catch(e){
                return done("Erro ao efetuar Login!");
            }

        });
    });
}));


passport.use('logado-redesocial', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'senha',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // asynchronous
    process.nextTick(function() {
        Usuario.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user){
                var novo = new Usuario(req.body);
                novo.perfil=[constant.perfis.USER];
                novo.senha=novo.generateHash(novo.senha||"password");
                novo.save(function(err, salvo) {
                    return done(null, salvo);
                });
                
            }
             // all is well, return user
            else
                return done(null, user);
        });
    });
}));

passport.use('cadastro', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'senha',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // asynchronous
    process.nextTick(function() {
        Usuario.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user){
                var novo = new Usuario(req.body);
                novo.perfil=[constant.perfis.USER];
                novo.senha=novo.generateHash(novo.senha);
                novo.save(function(err, salvo) {
                    return done(err, salvo);
                });
                
            }
             // Usuário ja cadastrado
            else
                return done(null, { error: 'Usuário já cadastrado!' });
        });
    });
}));

};