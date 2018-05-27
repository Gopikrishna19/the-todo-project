const boom = require('boom');
const helperMethods = ['wrap', 'create'];

module.exports.setBoom = (req, res, next) => {
    res.boom = new Proxy(boom, {
        get(...args) {
            if (helperMethods.includes(args[1])) {
                return Reflect.get(...args);
            }

            return error => {
                const boomed = Reflect.get(...args)();

                return res.status(boomed.output.statusCode).send({
                    error,
                    message: boomed.message,
                    resource: req.originalUrl
                });
            };
        }
    });

    next();
};
