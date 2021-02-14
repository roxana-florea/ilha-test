const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lngSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    disabled: Boolean
});

const Languages = mongoose.model('Language', lngSchema);

module.exports = Languages;