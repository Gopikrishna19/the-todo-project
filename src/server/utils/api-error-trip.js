const {send, statuses} = require('./responses');
const {log} = require('../../utils/logger');

module.exports.trip = (req, res, handler) => (error, ...args) => {
    if (error) {
        log('Handling', req.originalUrl, 'failed:', error.message);

        return send(statuses.INTERNAL_SERVER_ERROR)(req, res);
    }

    return handler(...args);
};
