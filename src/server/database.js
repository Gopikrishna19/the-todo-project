const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb://localhost:27017';
const DB_NAME = 'todos';

module.exports.connectDatabase = () => new Promise(
    (resolve, reject) => mongoose.connect(
        `${CONNECTION_URL}/${DB_NAME}`,
        (error, connection) => {
            if (error) {
                return reject(error);
            }

            console.log('Connected to database!'); // eslint-disable-line no-console

            return resolve(connection);
        }
    )
);
