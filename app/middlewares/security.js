const compression = require('compression');
const minify = require('express-minify');
const minifyHtml = require('express-minify-html');
const helmet = require('helmet');
const cors = require('cors');
const sslify = require('express-sslify');
const overloadProtection = require('overload-protection');
const Ddos = require('ddos');
const jwt = require('express-jwt');
const jwtBlacklist = require('express-jwt-blacklist');
const ipFilter = require('express-ip-filter');
const httpErrorPages = require('http-error-pages');

const config = demand('configs');

const ddos = new Ddos({
	burst: 10,
	limit: 15
});

module.exports = app => {
	app.use(compression());
	app.use(minify());
	app.use(minifyHtml({
		override: true,
		exception_url: false,
		htmlMinifier: {
			removeComments: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true
		}
	}));

	// app.use(ipFilter({
	// 	forbidden: '403: Get out of here!',
	// 	filter: [
	// 		...config.security.whitelists,
	// 		...config.security.blacklists
	// 	]
	// }));

	// TODO: Change secret
	// app.use(jwt({
	// 	secret: 'secret-here',
	// 	isRevoked: jwtBlacklist.isRevoked
	// }));

	// app.use(helmet.contentSecurityPolicy({
	// 	directives: {
	// 		defaultSrc: ["'self'"],
	// 		scriptSrc: ["'self'"],
	// 		styleSrc: ["'self'"],
	// 		reportUri: '/violation-csp'
	// 	},
	// 	reportOnly: true
	// }));

	// app.use(helmet.permittedCrossDomainPolicies());

	// app.use(helmet.dnsPrefetchControl());

	// app.use(helmet.frameguard({ action: 'sameorigin' }));

	app.use(helmet.hidePoweredBy({
		setTo: config.security.poweredBy
	}));

	// const thirtyDaysInSeconds = 2592000;

	// app.use(helmet.hsts({
	// 	maxAge: thirtyDaysInSeconds
	// }));

	// app.use(helmet.ieNoOpen());

	// app.use(helmet.noCache());

	// app.use(helmet.noSniff());

	// app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

	app.use(helmet.xssFilter({
		reportUri: '/violation-xss'
	}));

	// app.use(cors());

	// TODO: Fix HTTPS protocol
	// app.use(sslify.HTTPS());

	// const overloadConfig = {
	// 	production: process.env.NODE_ENV === 'production',
	// 	clientRetrySecs: 1,
	// 	sampleInterval: 5,
	// 	maxEventLoopDelay: 42,
	// 	maxHeapUsedBytes: 0,
	// 	maxRssBytes: 0,
	// 	errorPropagationMode: false
	// };

	// TODO: Check ddos and overload protection for possible discarding of packages
	// app.use(overloadProtection('express', overloadConfig));
	// app.use(ddos.express);

	// httpErrorPages.express(app, {
	// 	lang: 'en_US',
	// 	footer: config.server.admin
	// });
};