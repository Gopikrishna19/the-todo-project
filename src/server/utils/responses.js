const statuses = module.exports.statuses = {
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    OK: 200,
    UNAUTHORIZED: 401
};

const messages = {
    [statuses.FORBIDDEN]: 'Forbidden',
    [statuses.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [statuses.NOT_FOUND]: 'Not Found',
    [statuses.OK]: 'OK',
    [statuses.UNAUTHORIZED]: 'Unauthorized'
};

module.exports.send = (status, message = true) => (req, res) => {
    const sendArgs = [];

    if (message) {
        sendArgs.push({message: messages[status]});
    }

    return res.status(status).send(...sendArgs);
};
