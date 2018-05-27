const express = require('express');

const {Todo} = require('../schemas/Todo');
const {trip} = require('../utils/api-error-trip');

const router = new express.Router();

router.get('/', (req, res) => Todo.find().exec(trip(req, res, todos => res.send({todos}))));

router.post('/', (req, res) => new Todo(req.body).save(trip(req, res, ({_id: id}) => res.send({id}))));

module.exports = router;
