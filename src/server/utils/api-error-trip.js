const {send, statuses} = require('./responses');

module.exports.trip = (req, res, handler) => (error, ...args) => {
    if (error) {
        console.log(error); // eslint-disable-line

        return send(statuses.INTERNAL_SERVER_ERROR)(req, res);
    }

    return handler(...args);
};
