import { searchSongAndPlaylistService } from "../services/search.service.js";

export const searchController = async (req, res) => {
  try {
    const { q } = req.query;

    const result = await searchSongAndPlaylistService(q);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
};
