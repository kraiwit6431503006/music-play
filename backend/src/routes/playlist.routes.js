import express from "express";
import {
  createPlaylist,
  createPlaylistWithSong,
  getPlaylistById,
  getPublicPlaylists,
  getRecommendSongs,
  updatePlaylist,
  updatePlaylistPublic,
  deletePlaylist,
  addSongToPlaylist,
  getMyPlaylists,
  removeSongFromPlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.post("/", createPlaylist);
router.post("/with-song", createPlaylistWithSong);
router.get("/my", getMyPlaylists);
router.get("/public", getPublicPlaylists);
router.get("/:id", getPlaylistById);
router.get("/:playlistId/recommend", getRecommendSongs);
router.put("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);
router.post("/:id/songs", addSongToPlaylist);
router.patch("/:id/public", updatePlaylistPublic);
router.delete("/playlists/:playlistId/songs/:songId", removeSongFromPlaylist);

export default router;
