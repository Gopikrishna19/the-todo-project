const path = require('path');

module.exports.getAbsolutePath = relativePath => path.resolve(__dirname, '../..', relativePath);
