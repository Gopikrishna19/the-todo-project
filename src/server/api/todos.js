const express = require('express');

const {Todo} = require('../schemas/Todo');
const {send, statuses} = require('../responses');

const router = new express.Router();

router.get('/', (req, res) => {
    Todo
        .find()
        .exec((error, todos) => {
            if (error) {
                console.log(error); // eslint-disable-line

                return send(statuses.INTERNAL_SERVER_ERROR)(req, res);
            }

            return res.send({todos});
        });
});

router.post('/', (req, res) => {
    new Todo(req.body)
        .save((error, todos) => {
            if (error) {
                console.log(error); // eslint-disable-line

                return send(statuses.INTERNAL_SERVER_ERROR)(req, res);
            }

            return res.send({todos});
        });
});

module.exports = router;
