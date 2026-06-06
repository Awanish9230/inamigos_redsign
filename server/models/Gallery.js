import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  caption: { type: String },
  story: { type: String },
  date: { type: Date, default: Date.now },
  addedBy: { type: String }
});

export default mongoose.model('Gallery', gallerySchema);
