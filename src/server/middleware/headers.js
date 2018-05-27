module.exports.setCORSHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if (req.method === 'OPTIONS') {
        res.send();
    } else {
        next();
    }
};

module.exports.setJSONHeaders = (req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
};
