import {
  getSongsService,
  getSongByIdService,
  createSongService,
  updateSongService,
  deleteSongService
} from '../services/song.service.js';

export const getSongs = async (req, res) => {
  const songs = await getSongsService();
  res.json(songs);
};

export const getSongById = async (req, res) => {
  const song = await getSongByIdService(req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json(song);
};

export const createSong = async (req, res) => {
  const song = await createSongService(req.body);
  res.status(201).json(song);
};

export const updateSong = async (req, res) => {
  const song = await updateSongService(req.params.id, req.body);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json(song);
};

export const deleteSong = async (req, res) => {
  const song = await deleteSongService(req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json({ message: 'Song deleted successfully' });
};
