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


	// TODO: Change secret
	// app.use(jwt({
	// 	secret: 'secret-here',
	// 	isRevoked: jwtBlacklist.isRevoked
	// }));

	/**
	 * * Content-Security-Policy
	 *
	 * * protects againts malicious injection (XSS) of:
	 * * - JavaScript
	 * * - CSS
	 * * - plugins
	 * * - etc
	 */
	app.use(helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'"],
			styleSrc: ["'self'"],
			reportUri: '/violation-csp'
		},
		reportOnly: true
	}));

	/**
	 * * X-Permitted-Cross-Domain-Policies
	 *
	 * * restricts clients like Flash and Acrobat
	 * * from what data to load from our domain
	 *
	 * * defaults to none
	 */
	app.use(helmet.permittedCrossDomainPolicies());

	/**
	 * * X-DNS-Prefetch-Control
	 *
	 * * restricts DNS requests that happens even before
	 * * the user clicks a link or loads a resource
	 *
	 * * defaults to off
	 */
	app.use(helmet.dnsPrefetchControl());

	/**
	 * * X-Frame-Options
	 *
	 * * mitigates clickjacking attacks
	 * * allow only from same origin
	 */
	app.use(helmet.frameguard({ action: 'sameorigin' }));

	/**
	 * * X-Powered-By
	 *
	 * * removes or changes the X-Powered-By header
	 * * to avoid exploitation of known vulnerabilities
	 * * on whatever technology you are using
	 */
	app.use(helmet.hidePoweredBy({ setTo: config.security.poweredBy }));

	/**
	 * * Strict-Transport-Security
	 *
	 * * keeps users on HTTPS or tells browsers to stick with HTTPS
	 * * it helps to mitigate man-in-the-middle attacks
	 */
	const thirtyDaysInSeconds = 2592000;
	app.use(helmet.hsts({ maxAge: thirtyDaysInSeconds }));

	/**
	 * * Referrer-Policy
	 *
	 * * sets the value of Referer
	 * * it tells a server where a request is coming from
	 */
	app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

	/**
	 * * X-XSS-Protection
	 *
	 * * prevents reflected XSS attacks
	 *
	 * * defaults to 1; mode=block
	 */
	app.use(helmet.xssFilter({ reportUri: '/violation-xss' }));

	/**
	 * * Access-Control-*
	 *
	 * * allows restricted resources to be requested from another domain
	 *
	 * * add cors to options for pre-flight request
	 *
	 * * defaults to
	 * * origin: *
	 * * methods: GET, HEAD, PUT, PATCH, POST, DELETE
	 * * preflightContinue: false
	 * * optionSuccessStatus: 204
	 */
	app.options('*', cors());
	app.use(cors());

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