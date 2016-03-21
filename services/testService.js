module.exports  = function(app) {

var Test = {

 test1  : function (req, res) {
 	var beer = require('../extra/estilos');
  res.json({
    name: 'teste service 1 wefwfdwef  ff' 
  });
},

test2  : function (req, res) {
  res.json({
    name: process.env.CERVA_PROJECT
  });
}
}
//Mapping
	app.get('/services/test1', Test.test1);
	app.get('/services/test2', Test.test2);

return Test;
}