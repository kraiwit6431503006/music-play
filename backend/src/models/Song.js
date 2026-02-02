import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: String,
  album: String,
  duration: Number,
  audioUrl: String,
  coverImage: String
}, { timestamps: true });

export default mongoose.model('Song', songSchema);