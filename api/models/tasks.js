const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: { type: String, required: false },
  description: { type: String, required: false },
  duration: { type: Number, required: false }
}, 
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;