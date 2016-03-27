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
        'clientID'      : '597270929398-0ighs8qon4pdfsp7h90m5gfb9auahftq.apps.googleusercontent.com',
        'clientSecret'  : 'rbJUcdU7MmuOQBIdP3_0LG_q',
        'callbackURL'   : 'http://mundodacerveja-irsa.rhcloud.com/auth/google/callback'
    }

};