module.exports = {
	/**
	 * * limit is the maximum request allowed, if exceeded the request is denied
	 * * maxcount is the amount of punishment applied to a denial time out
	 * * burst is the amount of allowed burst request before being penalize
	 * * maxexpiry is maximun expiration time of penalty in seconds
	 * * whitelists are the list of ip that are not penalized
	 */
	ddos: {
		limit: 20,
		maxcount: 10,
		burst: 10,
		maxexpiry: 60,
		Whitelists: [
			// '*'
		],
	},
	blacklists: [
		'!213.15.*'
	],
	poweredBy: 'PHP 7.3.0'
};