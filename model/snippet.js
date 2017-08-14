const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  notes: { type: String, required: true },
  language: { type: String },
  tags: []
});

// create a model for a club
const snippet = mongoose.model('snippet', snippetSchema);

module.exports = snippet;
