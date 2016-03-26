
/**
 * Module dependencies
 */

var express = require('express');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var expressValidator = require("express-validator");
var morgan = require('morgan'),
  http = require('http'),
  conf = require('./env/'+process.env.NODE_ENV +'/config'),
  allconf = require('./env/all/config'),
  load = require('express-load'),
  path = require('path');
var app = module.exports = express();
app.conf=conf;
app.conf.all=allconf;
/**
 * Configuration
 */

// all environments
app.set('port', conf.port || 3000);
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, 
                  secret: 'uwotm8' }));
app.use(expressValidator());


// parse application/json
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse multipart/form-data
app.use(multer());



var env = process.env.NODE_ENV || 'dev';

// development only
if (env === 'dev') {
  app.use(errorHandler());
}

// production only
if (env === 'producao') {
  // TODO
}


/**
 * Routes
 */

load("models").
then("services").into(app);

/**
 * DB
 */
var mongoose = require('mongoose');

global.db = mongoose.connect(conf.db.url);

//DB  fim

// serve index and view partials
app.get('/', function(req, res){
  res.render('index');
});

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
  res.render('index');
});


/**
 * Start Server
 */

http.createServer(app).listen(conf.port, conf.ip, function () {
  console.log('Express server listening on port ' + app.get('port'));
});
