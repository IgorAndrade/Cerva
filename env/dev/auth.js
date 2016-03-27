module.exports = {
    "local":{
        'usernameField' : 'email',
        'passwordField' : 'password',
        'passReqToCallback' : true
    },
    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '597270929398-an5coaiq4id09ssfdb0lna1t1ivps9u4.apps.googleusercontent.com',
        'clientSecret'  : 'rSM2VQnVqcQxS1RIcCDjHmG6',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};