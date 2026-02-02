<script>
export default {
  data() {
    return {
      auth: null,
      player: null,
      playlistStore: null,
      searchStore: null
    }
  },

  async created() {
    this.auth = useAuth()
    this.player = usePlayer()
    this.playlistStore = usePlaylist()
    this.searchStore = useSearch()

    await this.auth.fetchUser()
    await this.playlistStore.getMyPlaylists(this.auth.user._id)
  },

  computed: {
    playlists() {
      return this.playlistStore.state.playlists;
    },
  },

  methods: {
    logout() {
      this.auth.logout()
    },

    onSearch(keyword) {
      this.searchStore.search(keyword);
      navigateTo(`/search?q=${keyword}`);
    },

    async createPlaylist() {
      const count = this.playlistStore.state.playlists.length + 1
      const name = `Playlist #${count}`

      const playlist = await this.playlistStore.createPlaylist(name, this.auth.user._id)
      this.$router.push(`/playlist/${playlist._id}`)
    }
  }
}
</script>


<template>
  <div class="h-screen bg-black text-white flex flex-col overflow-hidden">
    <Topbar :user="auth.user" :search-state="searchStore.state" :on-search-submit="onSearch" @logout="logout" />

    <div class="flex flex-1 overflow-hidden">
      <Sidebar class="shrink-0" :playlists="playlists" @create="createPlaylist" />

      <div class="flex-1 flex flex-col bg-spotify-bg-main overflow-hidden">
        <main class="flex-1 overflow-y-auto md:ml-4 md:mr-4">
          <div class="bg-background-main rounded-lg">
            <slot />
            <Footer />
          </div>
        </main>
      </div>
    </div>

    <Player v-if="player.state.currentSong" />
  </div>
</template>
