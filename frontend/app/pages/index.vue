<script>
export default {
  data() {
    return {
      auth: null,
      playlistStore: null,
      songStore: null,
      player: null,
    };
  },

  async created() {
    this.auth = useAuth();
    this.playlistStore = usePlaylist();
    this.songStore = useSong();
    this.player = usePlayer();

    await this.auth.fetchUser();
  },

  async mounted() {
    await this.playlistStore.getPlaylistPublic();
    this.songStore.fetchSongs();
    await this.playlistStore.getMyPlaylists(this.auth.user._id);

  },

  computed: {

    publicPlaylists() {
      return this.playlistStore.state.publicPlaylists || [];
    },

    myPlaylists() {
      return this.playlistStore.state.playlists || [];
    },

    songs() {
      return this.songStore.state.songs || [];
    }
  },

  methods: {
    async playSong(song) {
      await this.player.play(song)
    },

    async playPlaylist(playlist) {
      const selectPlaylist = await this.playlistStore.getPlaylistById(playlist._id);
      await this.player.playPlaylist(selectPlaylist.songs, 0);
    },

    goToPlaylist(playlist){
      this.$router.push(`/playlist/${playlist._id}`);
    }
  }
};
</script>

<template>
  <div class="bg-[#121212] rounded-lg">

    <HomeWelcome :name="auth?.user?.name" />


    <div v-if="songs != 0" class="p-4 space-y-4">

      <HomeMyPlaylist v-if="myPlaylists.length" :my-playlists="myPlaylists" @play="playPlaylist" />

      <HomeRecommended :songs="songs" @play="playSong" />

      <HomePlaylist :playlists="publicPlaylists" @select="goToPlaylist"/>

      <HomeReleases :songs="songs" @play="playSong"/>
    </div>
   <div v-else class="p-6 flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
  <i class="mdi mdi-music-off text-5xl text-gray-500"></i>

  <p class="text-lg font-semibold text-white">
    No songs yet
  </p>

  <p class="text-sm max-w-md">
    You don’t have any songs in your library yet.  
    Start by adding songs so you can create playlists and enjoy your music.
  </p>

  <button
    @click="navigateTo('/music-management')"
    class="mt-2 px-6 py-2 rounded-full
           bg-green-500 hover:bg-green-400
           text-black font-semibold
           transition active:scale-95"
  >
    Add songs
  </button>
</div>

  </div>
</template>
