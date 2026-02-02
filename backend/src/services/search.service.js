import Song from "../models/Song.js";
import Playlist from "../models/Playlist.js";

export const searchSongAndPlaylistService = async (keyword) => {
  if (!keyword) {
    return { songs: [], playlists: [] };
  }

  const regex = new RegExp(keyword, "i");

  const songs = await Song.find({
    $or: [
      { title: regex },
      { artist: regex },
      { album: regex },
    ],
  }).limit(20);

  const playlists = await Playlist.find({
    name: regex,
    isPublic: true,
  })
    .populate("user")
    .limit(10);

  return { songs, playlists };
};
