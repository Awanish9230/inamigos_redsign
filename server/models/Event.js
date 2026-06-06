import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String },
  isOnline: { type: Boolean, default: false },
  category: { type: String },
  description: { type: String },
  coverImage: { type: String },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }]
});

export default mongoose.model('Event', eventSchema);
