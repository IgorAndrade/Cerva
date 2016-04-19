module.exports  = function(finaliza){
	var self = this;
	self.finaliza = finaliza;
	self.etapas=[];

	this.wait=function(etapa){
		self.etapas.push(etapa);
	},

	this.notifica=function(etapa,isCheck){
		var idx = self.etapas.indexOf(etapa);
		if(idx>=0){
			self.etapas.splice(idx, 1);
			if(isCheck){
				self.check();
			}
		}
	},

	this.check=function(){
		if(self.etapas.length==0)
			self.finaliza();
	}
}