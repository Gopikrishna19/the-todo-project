const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {statusSchema: status} = require('./todoStatusSchema');

const todoSchema = new Schema({
    createdOn: {
        default: new Date().getTime(),
        type: Number
    },
    description: String,
    status
});

module.exports.Todo = mongoose.model('Todo', todoSchema);
