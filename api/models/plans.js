const mongoose = require('mongoose');
const taskSchema = require('./tasks').schema;


const Schema = mongoose.Schema;

const planSchema = new Schema(

    {
        planName: { type: String, required: true },
        tasks: [{ type: String, enum: taskSchema }]
    },

    {
        timestamps: true,
    }
);


const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;

