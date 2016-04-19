angular.module('app')
	.constant('ROLES', {
	  admin: 'admin_role',
	  user: 'user_role',
	  public: 'public_role'
	})
	.constant('EVENTS',{
		USER_LOGIN:"user_logado",
		USER_LOGOUT:"user_logout"
	})
	.constant('CERVEJA_STATUS',{
		NEW:"novo"
	})
	.constant('CONFIG',{
		url_base:"http://192.168.0.13:3000"
		//url_base:"http://mundodacerveja-irsa.rhcloud.com"
	});
