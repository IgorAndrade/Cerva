module.exports  = function(app) {
    "use strict";
    var cloudinary = require('../env/all/imgRepo');
    var ImgModel = app.models.imagens;
    var multer = require('multer');
    var merge = require('merge')

    var service = function(){
        var self = this;
        
        self.uploadFile = function(file, options,cb){
            if(!file){
                cb({error:"Arquivo vazio"});
                return;
            }
            var original = {
                folder:"Cerveja",
                format:"jpg"
            };

            options = merge(original, options);

            cloudinary.v2.uploader.upload(file, options,self.newImagen(cb));
        };

        self.removeImg = function (public_id,cb) {
            cloudinary.v2.uploader.destroy(public_id, function(error, result) {
                ImgModel.findOneAndRemove({public_id:public_id},cb);
            });
        };
        
        self.newImagen = function(cb){
            function cbToCreateImagen(error,retorno){
                if(error){
                    cb(error);
                }else {
                    var img = new ImgModel(retorno);
                    img.save(function(error,imgSalva){
                        if(error)
                            cb(error);
                        else{
                            cb(null,imgSalva);
                        }
                    })
                
                }
            };
            return cbToCreateImagen;
        };
    }


    return service;
    
}