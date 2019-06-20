const axios = require('axios');

module.exports = (url) => {
	return axios.create({ baseURL: url});
};