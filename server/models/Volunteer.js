import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  areaOfInterest: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'Pending' },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Volunteer', volunteerSchema);
