const mailer = require('express-mailer');

const config = demand('configs');

module.exports = (app, mail) => {
	mailer.extend(app, config.mailer);

	app.mailer.send(mail.template, {
		to: mail.to,
		subject: mail.subject,
	}, (error) => {
		if(error) {
			// TODO: Handle email error
		}
		// TODO: Response for successful email
	});
};