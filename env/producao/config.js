module.exports = {
	port:process.env.OPENSHIFT_NODEJS_PORT,
	ip:process.env.OPENSHIFT_NODEJS_IP,
	db:{
		ip:process.env.OPENSHIFT_MONGODB_DB_HOST,
		url:process.env.OPENSHIFT_MONGODB_DB_URL
		dbName:"mundodacerveja",
		user:process.env.OPENSHIFT_MONGODB_DB_USERNAME,
		password:process.env.OPENSHIFT_MONGODB_DB_PASSWORD
	}
}