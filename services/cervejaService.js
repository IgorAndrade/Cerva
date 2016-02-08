module.exports  = function(app) {

var Service = {

	novo : function(req,res,next){
		req.assert(['cerveja', 'nome'], 'Insira um nome').notEmpty();

		var errors = req.validationErrors();

		var callback = function(erro, cerveja){
			if(erro){
			    res.status(412).json({ "error": erro });
			}else{
				var cervejaModel = app.models.cerveja;
				cervejaModel.find(function(erro,cervejas){
	        		if(erro) 
	        			res.status(412).json({ "error": erro });
	        		else{
	        			res.status(200).json(cervejas);
	        		}
				});
			}
		};

		if(!errors){
        	var cervejaModel = app.models.cerveja;
        	var cerveja = new cervejaModel(req.body);
        	if(!req.params.id)
	       		cerveja.save(callback);
	       	else
	       		cervejaModel.update({id:req.params.id},{ $set: cerveja.toObject()},callback);
	     }else{
	    	res.status(412).json({ "error": errors });
		}

	},

	update : function(req,res,next){
		var callback = function(erro, cerveja){
			if(erro){
			    res.status(412).json({ "error": erro });
			}else{
				var cervejaModel = app.models.cerveja;
				cervejaModel.find(function(erro,cervejas){
	        		if(erro) 
	        			res.status(412).json({ "error": erro });
	        		else{
	        			res.status(200).json(cervejas);
	        		}
				});
			}
		};
		var cervejaModel = app.models.cerveja;
        var cerveja = new cervejaModel(req.body);
        if(!req.params.id)
			cervejaModel.update({_id:cerveja._id},cerveja.toObject(),callback);
		else
			cervejaModel.update({id:req.params.id},{ $set: cerveja.toObject()},callback);


	},

	listar : function(req,res,next){
		var cervejaModel = app.models.cerveja;
		cervejaModel.find(function(erro,cervejas){
    		if(erro) 
    			res.status(400).json({ "error": erro });
    		else{
    			res.status(200).json(cervejas);
    		}
	    });
	}

};

app.post('/services/cerveja', Service.novo);
app.post('/services/cerveja/:id', Service.novo);
app.get('/services/cerveja', Service.listar);
app.put('/services/cerveja', Service.update);
app.put('/services/cerveja/:id', Service.update);

return Service;

}