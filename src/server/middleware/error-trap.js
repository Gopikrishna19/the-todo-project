const {log} = require('../../utils/logger');

module.exports.setErrorTrap = (req, res, next) => {
    res.trap = handler => (error, ...args) => {
        if (error) {
            log('Handling', req.originalUrl, 'failed:', error.message);

            return res.boom.badGateway(error);
        }

        return handler(...args);
    };

    next();
};
