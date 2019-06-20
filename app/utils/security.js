const jwt = require('express-jwt');
const jwtBlacklist = require('express-jwt-blacklist');
const helmet = require('helmet');
const cors = require('cors');
const sslify = require('express-sslify');
const overloadProtection = require('overload-protection');
const Ddos = require('ddos');
const agentBlocker = require('express-user-agent-blocker');
const httpErrorPages = require('http-error-pages');

const logger = demand('utils/logger');
const config = demand('configs');

module.exports = (app) => {
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
	app.use(helmet.contentSecurityPolicy(config.security.csp));

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
	app.use(helmet.frameguard(config.security.frameguard));

	/**
	 * * X-Powered-By
	 *
	 * * removes or changes the X-Powered-By header
	 * * to avoid exploitation of known vulnerabilities
	 * * on whatever technology you are using
	 */
	app.use(helmet.hidePoweredBy(config.security.poweredBy));

	/**
	 * * Strict-Transport-Security
	 *
	 * * keeps users on HTTPS or tells browsers to stick with HTTPS
	 * * it helps to mitigate man-in-the-middle attacks
	 */
	app.use(helmet.hsts(config.security.hsts));

	/**
	 * * Referrer-Policy
	 *
	 * * sets the value of Referer
	 * * it tells a server where a request is coming from
	 */
	app.use(helmet.referrerPolicy(config.security.referrer));

	/**
	 * * X-XSS-Protection
	 *
	 * * prevents reflected XSS attacks
	 *
	 * * defaults to 1; mode=block
	 */
	app.use(helmet.xssFilter(config.security.xss));

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

	/**
	 * * Enforces HTTPS connections on any incoming GET and HEAD requests
	 * * any HTTP request will automatically redirects to an HTTPS address
	 */
	// TODO: Needs certificate
	// app.use(sslify.HTTPS());

	/**
	 * * Load detection and shedding capabilities
	 */
	app.use(overloadProtection('express', config.security.overload));

	/**
	 * * Denial-Of-Service prevention for http services
	 *
	 * * limit is the maximum request allowed, if exceeded the request is denied
	 * * maxcount is the amount of punishment applied to a denial time out
	 * * burst is the amount of allowed burst request before being penalize
	 * * maxexpiry is maximun expiration time of penalty in seconds
	 */
	const onDenial = function (req) {
		logger.info('Denied ' + req.method + ' request from ' + req.ip + ' due to possible DOS attack');
	};
	const ddos = new Ddos({
		...config.security.ddos,
		onDenial
	});
	app.use(ddos.express);

	/**
	 * * User Agent Blocker
	 */
	app.use(agentBlocker(config.security.blacklists.agent));

	/**
	 * * HTTP Error Pages
	 *
	 * * displays pre-built pages for status codes 4XX and 5XX
	 *
	 * * comment out to display error on development
	 */
	httpErrorPages.express(app, config.security.errorPages);
};