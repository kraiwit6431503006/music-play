import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";

export const createPlaylistService = async (userId, name) => {
  return await Playlist.create({
    name,
    user: userId,
  });
};

export const createPlaylistWithSongService = async ({
  name,
  userId,
  coverImage,
  songId,
}) => {
  const playlist = await Playlist.create({
    name,
    user: userId,
    coverImage,
    songs: songId ? [songId] : [],
  });

  return await Playlist.findById(playlist._id)
    .populate("user")
    .populate("songs");
};

export const getMyPlaylistsService = async (userId) => {
  return await Playlist.find({ user: userId }).sort({ createdAt: -1 });
};

export const getPlaylistByIdService = async (playlistId) => {
  const playlist = await Playlist.findById(playlistId)
    .populate("songs")
    .populate("user");

  if (!playlist) throw new Error("Playlist not found");
  return playlist;
};

export const getPublicPlaylistsService = async () => {
  return await Playlist.find({ isPublic: true })
    .populate("user")
    .populate("songs")
    .sort({ createdAt: -1 });
};

export const updatePlaylistService = async (playlistId, data) => {
  const playlist = await Playlist.findByIdAndUpdate(playlistId, data, {
    new: true,
  })
    .populate("user")
    .populate("songs");

  if (!playlist) throw new Error("Playlist not found");
  return playlist;
};

export const deletePlaylistService = async (playlistId) => {
  const playlist = await Playlist.findByIdAndDelete(playlistId);
  if (!playlist) throw new Error("Playlist not found");
  return playlist;
};

export const addSongToPlaylistService = async (playlistId, songId) => {
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new Error("Playlist not found");

  if (!playlist.songs.includes(songId)) {
    playlist.songs.push(songId);
  }

  await playlist.save();
  return playlist;
};

export const updatePlaylistPublicService = async (playlistId, isPublic) => {
  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    { isPublic },
    { new: true },
  )
    .populate("user")
    .populate("songs");

  if (!playlist) throw new Error("Playlist not found");
  return playlist;
};

export const getRecommendSongsService = async (playlistId, limit = 10) => {
  const playlist = await Playlist.findById(playlistId);

  if (!playlist) throw new Error("Playlist not found");

  const songIdsInPlaylist = playlist.songs || [];

  const songs = await Song.find({
    _id: { $nin: songIdsInPlaylist },
  }).limit(limit);

  return songs;
};

export const removeSongFromPlaylistService = async (playlistId, songId) => {
  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { songs: songId } },
    { new: true },
  )
    .populate("user")
    .populate("songs");

  if (!playlist) throw new Error("Playlist not found");
  return playlist;
};
