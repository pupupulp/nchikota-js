const thirtyDaysInSeconds = 2592000;

module.exports = {
	csp: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'"],
			styleSrc: ["'self'"],
			reportUri: '/violation-csp'
		},
		reportOnly: true
	},
	frameguard: {
		action: 'sameorigin'
	},
	poweredBy: {
		setTo: 'PHP 7.3.0'
	},
	hsts: {
		maxAge: thirtyDaysInSeconds
	},
	referrer: {
		policy: 'same-origin'
	},
	xss: {
		reportUri: '/violation-xss'
	},
	overload: {
		production: process.env.NODE_ENV === 'production',
		clientRetrySecs: 1,
		sampleInterval: 5,
		maxEventLoopDelay: 42,
		maxHeapUsedBytes: 0,
		maxRssBytes: 0,
		errorPropagationMode: false
	},
	ddos: {
		limit: 100,
		maxcount: 50,
		burst: 100,
		maxexpiry: 60,
		whitelists: [
			// '*'
		],
	},
	errorPages: {
		lang: 'en_US',
		footer: 'security@admin.com'
	},
	blacklists: {
		ip: [
			'!213.15.*'
		],
		agent: []
	}
};