const mongoose = require('mongoose');

const {log} = require('../utils/logger');

const CONNECTION_URL = 'mongodb://localhost:27017';
const DB_NAME = 'todos';

module.exports.connectDatabase = () => new Promise(
    (resolve, reject) => mongoose.connect(
        `${CONNECTION_URL}/${DB_NAME}`,
        (error, connection) => {
            if (error) {
                return reject(error);
            }

            log('Connected to database!');

            return resolve(connection);
        }
    )
);
