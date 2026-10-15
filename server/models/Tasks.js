const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Done', 'Not done'], 
        default: 'Not done' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema, 'tasks');