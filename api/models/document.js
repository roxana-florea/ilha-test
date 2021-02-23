const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
user: { type: Schema.Types.ObjectId, ref : 'User', required: true, },
path: { type: String, required: true },
name: { type: String, required: true },
author: String,
category: { type: String, required: true, default: 'score' },
status: { type: Boolean, required: true, default: false },
docType: { type: String, required: true, default: 'application/pdf' },
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
