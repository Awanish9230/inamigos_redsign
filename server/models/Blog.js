import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  coverImage: { type: String },
  category: { type: String },
  author: { type: String },
  tags: [String],
  publishedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
});

export default mongoose.model('Blog', blogSchema);
