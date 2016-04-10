module.exports = {
	port:process.env.OPENSHIFT_NODEJS_PORT,
	ip:process.env.OPENSHIFT_NODEJS_IP,
	url:process.env.OPENSHIFT_APP_DNS,
	db:{
		ip:process.env.OPENSHIFT_MONGODB_DB_HOST,
		url:process.env.OPENSHIFT_MONGODB_DB_URL,
		dbName:"mundodacerveja",
		user:process.env.OPENSHIFT_MONGODB_DB_USERNAME,
		password:process.env.OPENSHIFT_MONGODB_DB_PASSWORD
	},
	cloudinary:{
		cloud_name:"mundodacerveja",
		api_key:"366249413158599",
		api_secret:"RbfUY_7fuD4Z6MzCKZNT7J8SngM"
	}
}