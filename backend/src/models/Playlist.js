import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  coverImage: String,
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Playlist', playlistSchema);
