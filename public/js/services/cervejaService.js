

angular.module('app').factory("CervejaModel",function(CERVEJA_STATUS){
	var Cerveja ={
		_id:"",
		name:"",
		brewerydbId:"",
		nameDisplay:"",
		description:"",
		abv:"",
		ibu:"",
		isOrganic:"",
		status:CERVEJA_STATUS.NEW,
		createDate:"",
		glass:"",
		servingTemperatureDisplay:"",
		brewery:{_id:"",name:""},
		style:"",
		imagens:{
			rotulo:"",
			garrafa:"",
			outras:[]
		}
	};

	return function cerveja(obj){
		if(obj){
			return angular.extend(Cerveja, obj);
		}else
			return Cerveja;
	}

	
	});