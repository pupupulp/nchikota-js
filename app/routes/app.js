const express = require('express');
const moment = require('moment');
const kony = require('konyvtar-js');

const limiter = demand('middlewares/limiter');

const router = express.Router();
const year = moment().year();

const info = {
	name: 'NchikotaJS',
	abbrev: 'NJS',
	package: 'App',
	entry: 'js/landing',
	author: 'Eagan Martin',
	year,
	kony,
};

router.get('/',
	limiter.slowDown,
	limiter.global,
	(req, res) => {
		res.render('main', {
			locals: {
				...info,
				module: 'LandingView',
			}
		});
	});


module.exports = router;