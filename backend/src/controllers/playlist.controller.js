import {
  createPlaylistService,
  createPlaylistWithSongService,
  getMyPlaylistsService,
  getPublicPlaylistsService,
  getPlaylistByIdService,
  getRecommendSongsService,
  updatePlaylistService,
  updatePlaylistPublicService,
  deletePlaylistService,
  addSongToPlaylistService,
  removeSongFromPlaylistService
} from '../services/playlist.service.js';

export const createPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const playlist = await createPlaylistService(
      userId,
      name
    );

    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createPlaylistWithSong = async (req, res) => {
  try {
    const { name, userId, coverImage, songId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ message: "name and userId are required" });
    }

    const playlist = await createPlaylistWithSongService({
      name,
      userId,
      coverImage,
      songId,
    });

    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyPlaylists = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const playlists = await getMyPlaylistsService(userId);
    res.json(playlists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPublicPlaylists = async (req, res) => {
  try {
    const playlists = await getPublicPlaylistsService();
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await getPlaylistByIdService(req.params.id);
    res.json(playlist);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRecommendSongs = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { limit } = req.query;

    const songs = await getRecommendSongsService(
      playlistId,
      Number(limit) || 10
    );

    res.json(songs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await updatePlaylistService(
      req.params.id,
      req.body
    );
    res.json(playlist);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    await deletePlaylistService(req.params.id);
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await addSongToPlaylistService(
      req.params.id,
      req.body.songId
    );
    res.json(playlist);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const updatePlaylistPublic = async (req, res) => {
  try {
    const { isPublic } = req.body;

    if (typeof isPublic !== "boolean") {
      return res.status(400).json({ message: "isPublic must be boolean" });
    }

    const playlist = await updatePlaylistPublicService(
      req.params.id,
      isPublic
    );

    res.json(playlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const playlist = await removeSongFromPlaylistService(playlistId, songId);
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

