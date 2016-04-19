angular.module('User',['ngStorage']).service("userService",function($rootScope,$localStorage,$http,$window,EVENTS){
	var host = "http://"+$window.location.host;
	var self=this;
	self.usuarioLogado={};
	self.isLogado=false;
	self.perfis=[];

	$rootScope.$on(EVENTS.USER_LOGIN, function(ev, args){
		self.usuarioLogado=args.user;
        self.isLogado=true;
        $localStorage.credencial=args.user.email;
	});

	self.logar = function(email,senha,callbackSucesso,callbackFalha){
		var data={"email":email,"senha":senha};
		$http.post(host + '/login', data).success(successLogin).error(errorLogin)
	

		function successLogin(res,status){
			if (status==200) {
            	$rootScope.$emit(EVENTS.USER_LOGIN,{user:res})
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
				$rootScope.$emit(EVENTS.USER_LOGIN,{user:user});
		})
	};

	



});