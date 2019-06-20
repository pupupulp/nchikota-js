const logger = demand('utils/logger');

const handleError = async (error) => {
	if (error.isOperational) {
		await logger.info('Operational error occured: ' + error);
	} else {
		await logger.error(error);
	}
	// TODO: Add send email if critical
};

const isTrustedError = (error) => {
	return error.isOperational;
};

const errorHandler = function() {
	this.handleError = handleError;
	this.isTrustedError = isTrustedError;
}

module.exports.error = new errorHandler();