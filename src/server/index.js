const bodyParser = require('body-parser');
const express = require('express');

const {connectDatabase} = require('./utils/database');
const argv = require('../utils/argv');
const {log} = require('../utils/logger');
const {getAbsolutePath} = require('../utils/path');
const {send, statuses} = require('./utils/responses');
const {setCORSHeaders, setJSONHeaders} = require('./utils/headers');

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use(express.static(getAbsolutePath('public')));

app.use('/api', setCORSHeaders, setJSONHeaders);
app.use('/api/todos', require('./api/todos'));
app.use('/api/*', send(statuses.NOT_FOUND));

if (argv.mode === 'development') {
    require('./index.dev')(app);
}

(async () => {
    const dbConnection = await connectDatabase();

    app.listen(PORT, () => {
        log(`Server started at ${PORT}!`); // eslint-disable-line no-console
    });

    const closeConnection = trigger => (...args) => {
        log('Triggered:', trigger, '!', 'Closing database before stopping...');
        dbConnection.close();
        process.exit(...args);
    };

    process.on('beforeExit', closeConnection('beforeExit'));
    process.on('SIGINT', closeConnection('SIGINT'));
    process.on('SIGKILL', closeConnection('SIGKILL'));
})();
