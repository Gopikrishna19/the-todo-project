const bodyParser = require('body-parser');
const express = require('express');

const {connectDatabase} = require('./database');
const argv = require('../utils/argv');
const {getAbsolutePath} = require('../utils/path');
const {send, statuses} = require('./responses');
const {setCORSHeaders, setJSONHeaders} = require('./headers');

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
        console.log(`Server started at ${PORT}!`); // eslint-disable-line no-console
    });

    process.on('exit', () => dbConnection.close());
})();
