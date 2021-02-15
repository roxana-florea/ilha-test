const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instruSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    disabled: Boolean
});

const Instruments = mongoose.model('Instrument', instruSchema);

module.exports = Instruments;