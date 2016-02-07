module.exports  = function(app) {

var Service = {

	novo : function(req,res,next){
		req.assert(['cerveja', 'nome'], 'Insira um nome').notEmpty();

		var errors = req.validationErrors();

		if(!errors){
	        	var cervejaModel = app.models.cerveja;
	        	
	        	cervejaModel.create(req.body, function(erro, cerveja){
	    			if(erro){
	    				res.writeHead(403, {
					        'Content-Type': 'application/json; charset=utf-8'
					    });
					    res.end(JSON.stringify(erro));
	    			}else{
		    			cervejaModel.find(function(erro,cervejas){
			        		if(erro) 
			        			res.status(412).json({ "error": erro });
			        		else{
			        			res.status(200).json(cervejas);
			        		}
	        			});
		    		}
	    		});

	        	

	        	
		    }else{
		    	res.status(412).json({ "error": errors });
		    	
		    }

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
app.get('/services/cerveja', Service.listar);

return Service;

}