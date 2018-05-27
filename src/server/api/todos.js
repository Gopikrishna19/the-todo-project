const express = require('express');

const {Todo} = require('../schemas/Todo');

const router = new express.Router();

router.get(
    '/',
    (req, res) => Todo
        .find()
        .exec(res.trap(todos => res.send({todos})))
);

router.post(
    '/',
    (req, res) => new Todo(req.body)
        .save(res.trap(({_id: id}) => res.send({id})))
);

router.get(
    '/:id',
    (req, res) => Todo
        .find({_id: req.params.id})
        .exec(res.trap(todos => res.send({todos})))
);

module.exports = router;
