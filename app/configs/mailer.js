module.exports = {
	from: 'no-reply@sample.com',
	host: 'smtp.gmail.com',
	secureConnection: true,
	port: 465,
	transportMethod: 'SMTP',
	auth: {
		user: 'mailer@gmail.com',
		pass: 'password'
	}
};