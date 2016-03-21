module.exports = function(modelo){
	var self = this;
	this.Modelo = modelo;
	this.callback = function(req,res,next){
		var callback = function(erro, obj){
			if(erro){
			    res.status(412).json({ "error": erro });
			}else{
				self.Modelo.find(function(erro,lista){
	        		if(erro) 
	        			res.status(412).json({ "error": erro });
	        		else{
	        			res.status(200).json(lista);
	        		}
				});
			}
		};
		return callback;
	};

	this.inserir = function(req,res,next){
			var model = new self.Modelo(req.body);
        	model.save(self.callback(req,res,next));
	    };

	this.update = function(req,res,next){
	
			self.Modelo.update({_id:req.params.id},{ $set: req.body},self.callback(req,res,next));
	};

	this.listar = function(req,res,next){
		self.Modelo.find(function(erro,lista){
    		if(erro) 
    			res.status(400).json({ "error": erro });
    		else{
    			res.status(200).json(lista);
    		}
	    });
	};
	this.buscarById = function(req,res,next){
		if(req.params.id)
			self.Modelo.findById(req.params.id,function(erro,obj){
	    		if(erro) 
	    			res.status(400).json({ "error": erro });
	    		else{
	    			res.status(200).json(obj);
	    		}
		    });
		else
			res.status(400).json({ "error": "Sem id" });
	};

	this.deletar = function(req,res,next){
		
		self.Modelo.findByIdAndRemove(req.params.id,self.callback(req,res,next));
	};

};