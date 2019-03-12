const express = require('express');
const moment = require('moment');

const router = express.Router();
const year = moment().year();

const info = {
	name: 'NchikotaJS',
	abbrev: 'NJS',
	package: 'App',
	entry: 'js/landing',
	author: 'Eagan Martin',
	year
};

router.get('/', (req, res) => {
	res.render('main', {
		locals: {
			...info,
			module: 'LandingView',
		}
	});
});


module.exports = router;