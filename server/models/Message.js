import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  repliedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
