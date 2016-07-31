

angular.module('app').factory("CervejaModel",function(CERVEJA_STATUS){
	var Cerveja ={
		id:"",
		name:"",
		brewerydbId:"",
		nameDisplay:"",
		description:"",
		abv:"",
		ibu:"",
		isOrganic:"",
		status:CERVEJA_STATUS.NOVO,
		createDate:"",
		glass:"",
		servingTemperatureDisplay:"",
		brewery:{id:"",name:""},
		style:"",
		rotulo:"",
		garrafa:"",
		outras:[]
	};

	return function cerveja(obj){
		if(obj){
			return angular.extend(Cerveja, obj);
		}else
			return Cerveja;
	}

	
	});