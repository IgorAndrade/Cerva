(function(){
  "use strict";

	var conf = require('../'+process.env.NODE_ENV +'/config');
	var cloudRepo = require('cloudinary');

	cloudRepo.config({ 
	  cloud_name: conf.cloudinary.cloud_name, 
	  api_key: conf.cloudinary.api_key, 
	  api_secret: conf.cloudinary.api_secret
	});

module.exports = cloudRepo;
}());	



