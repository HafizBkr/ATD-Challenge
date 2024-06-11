const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  status: { type: String, default: 'submitted', enum: ['submitted', 'approved', 'rejected'] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
