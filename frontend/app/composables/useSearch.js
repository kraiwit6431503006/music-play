import { reactive, watch } from "vue";

const state = reactive({
  keyword: "",
  songs: [],
  playlists: [],
  loading: false,
  error: null,
});

export const useSearch = () => {
  const search = async (q) => {
    if (!q || !q.trim()) {
      clear();
      return;
    }

    state.keyword = q;
    state.loading = true;
    state.error = null;

    try {
      const res = await $fetch("http://localhost:5001/api/search", {
        params: { q },
      });

      state.songs = res.songs || [];
      state.playlists = res.playlists || [];
    } catch (err) {
      console.error("search error:", err);
      state.error = "Search failed";
    } finally {
      state.loading = false;
    }
  };

  const clear = () => {
    state.keyword = "";
    state.songs = [];
    state.playlists = [];
    state.loading = false;
    state.error = null;
  };

  return {
    state,
    search,
    clear,
  };
};
