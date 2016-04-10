module.exports  = function(app) {
var passport = require('passport');
var Usuario = app.models.usuario;
var configAuth = app.auth;
var FacebookStrategy = require('passport-facebook').Strategy;
var constant = require('../env/all/constants');

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

     passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email']

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            Usuario.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    user.facebook.id    = profile.id;
                    user.facebook.token = token;
                    Usuario.update({_id:user._id},{ $set: {facebook:{id:profile.id,token:token}}});

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser  = new Usuario();

                    // set all of the relevant information
                    newUser.nome  = profile.displayName;
                    newUser.email = profile.emails[0].value.toLowerCase(); // pull the first email
                    newUser.senha = newUser.generateHash("password");
                    newUser.facebook.id    = profile.id;
                    newUser.facebook.token = token;
                    newUser.perfil=[constant.perfis.USER];

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

}