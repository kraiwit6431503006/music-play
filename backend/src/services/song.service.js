import Song from '../models/Song.js';

export const getSongsService = async () => {
  return await Song.find();
};

export const getSongByIdService = async (id) => {
  return await Song.findById(id);
};

export const createSongService = async (songData) => {
  return await Song.create(songData);
};

export const updateSongService = async (id, songData) => {
  return await Song.findByIdAndUpdate(id, songData, {
    new: true,        
    runValidators: true
  });
};

export const deleteSongService = async (id) => {
  return await Song.findByIdAndDelete(id);
};
