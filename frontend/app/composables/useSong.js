
export const useSong = () => {
  const state = reactive({
    songs: [],
    loading: false,
    error: null
  })

  const fetchSongs = async () => {
    state.loading = true
    try {
      const res = await $fetch('http://localhost:5001/api/songs')
      state.songs = res
    } catch (err) {
      state.error = err
    } finally {
      state.loading = false
    }
  }

  const addSong = async (payload) => {
    await $fetch('http://localhost:5001/api/songs', {
      method: 'POST',
      body: payload
    })
    await fetchSongs()
  }

  const updateSong = async (id, payload) => {
    await $fetch(`http://localhost:5001/api/songs/${id}`, {
      method: 'PUT',
      body: payload
    })
    await fetchSongs()
  }

  const deleteSong = async (id) => {
    await $fetch(`http://localhost:5001/api/songs/${id}`, {
      method: 'DELETE'
    })
    await fetchSongs()
  }

  return {
    state,
    fetchSongs,
    addSong,
    updateSong,
    deleteSong
  }
}
