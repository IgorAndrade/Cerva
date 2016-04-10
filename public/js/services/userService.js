angular.module('User',[]).service("userService",function($http,$window){
	var host = "http://"+$window.location.host;
	var self=this;
	self.usuarioLogado={};
	self.isLogado=false;
	self.perfis=[];


self.logar = function(email,senha,callbackSucesso,callbackFalha){
		var data={"email":email,"senha":senha};
		$http.post(host + '/login', data).success(successLogin).error(errorLogin)
	

		function successLogin(res,status){
			if (status==200) {
            	self.logado(res);
				callbackSucesso(res);
        	}else{    
				callbackFalha(res);
			}
		};
	

		function errorLogin(res,o){
			if(res && res.error)
				callbackFalha(res.error);
			else
				callbackFalha(res);
		};

	};

	self.init = function(){
		$http.get(host+"/profile").success(function(user,status){
			if(status =200)
				self.logado(user);
		})
	};

	self.logado=function(user){
        self.usuarioLogado=user;
        self.isLogado=true;
        $localStorage.credencial=user.email;
    };	

});