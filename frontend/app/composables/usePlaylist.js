const state = reactive({
  playlists: [],
  playlist: null,
  publicPlaylists: [],
  recommendSongs: [],
  loading: false,
  error: null,
});

export const usePlaylist = () => {
  const createPlaylist = async (name, userId) => {
    state.loading = true;
    try {
      const res = await $fetch("http://localhost:5001/api/playlists", {
        method: "POST",
        body: { name, userId },
      });
      state.playlists.push(res);
      return res;
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const createPlaylistWithSong = async ({
    name,
    userId,
    coverImage,
    songId,
  }) => {
    state.loading = true;
    try {
      const res = await $fetch(
        "http://localhost:5001/api/playlists/with-song",
        {
          method: "POST",
          body: { name, userId, coverImage, songId },
        },
      );

      state.playlists.unshift(res);
      state.playlist = res;

      return res;
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const getMyPlaylists = async (userId) => {
    state.loading = true;
    try {
      const res = await $fetch(
        `http://localhost:5001/api/playlists/my?userId=${userId}`,
      );
      state.playlists = res;
      return res;
    } finally {
      state.loading = false;
    }
  };

  const getPlaylistPublic = async () => {
    state.loading = true;
    try {
      const res = await $fetch("http://localhost:5001/api/playlists/public");

      state.publicPlaylists = res;
      return res;
    } catch (err) {
      state.error = err?.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const getPlaylistById = async (id) => {
    state.loading = true;
    try {
      const res = await $fetch(`http://localhost:5001/api/playlists/${id}`);
      state.playlist = res;
      return res;
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const getRecommendSongs = async (playlistId, limit = 10) => {
    state.loading = true;
    try {
      const res = await $fetch(
        `http://localhost:5001/api/playlists/${playlistId}/recommend?limit=${limit}`,
      );

      state.recommendSongs = res;
      return res;
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const updatePlaylist = async (id, payload) => {
    state.loading = true;
    try {
      const res = await $fetch(`http://localhost:5001/api/playlists/${id}`, {
        method: "PUT",
        body: payload,
      });
      state.playlist = res;
      return res;
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const deletePlaylist = async (id) => {
    state.loading = true;
    try {
      await $fetch(`http://localhost:5001/api/playlists/${id}`, {
        method: "DELETE",
      });
      state.playlists = state.playlists.filter((p) => p._id !== id);
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const addSongToPlaylist = async (playlistId, songId) => {
    state.loading = true;
    try {
      const res = await $fetch(
        `http://localhost:5001/api/playlists/${playlistId}/songs`,
        {
          method: "POST",
          body: { songId },
        },
      );
      state.playlist = res;
      return res;
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const removeSongOutPlaylist = async (playlistId, songId) => {
    state.loading = true;
    try {
      const res = await $fetch(
        `http://localhost:5001/api/playlists/playlists/${playlistId}/songs/${songId}`,
        {
          method: "DELETE",
        },
      );

      state.playlist = res;
      return res;
    } catch (err) {
      state.error = err?.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  const updatePlaylistPublic = async (playlistId, isPublic) => {
    state.loading = true;
    try {
      const res = await $fetch(
        `http://localhost:5001/api/playlists/${playlistId}/public`,
        {
          method: "PATCH",
          body: { isPublic },
        },
      );

      state.playlist = res;
      const index = state.playlists.findIndex((p) => p._id === playlistId);
      if (index !== -1) {
        state.playlists[index] = res;
      }

      return res;
    } catch (err) {
      state.error = err.data?.message || err.message;
      throw err;
    } finally {
      state.loading = false;
    }
  };

  return {
    state,
    createPlaylist,
    createPlaylistWithSong,
    getMyPlaylists,
    getPlaylistById,
    getRecommendSongs,
    updatePlaylist,
    addSongToPlaylist,
    removeSongOutPlaylist,
    deletePlaylist,
    updatePlaylistPublic,
    getPlaylistPublic
  };
};
