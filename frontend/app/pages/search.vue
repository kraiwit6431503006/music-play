<script>
export default {
  data() {
    return {
      searchStore: null,
      playlistStore: null,
      auth: null,
      player: null,
      openMenuId: null,
      openPlaylistMenu: false,
    };
  },

  async created() {
    this.searchStore = useSearch();
    this.playlistStore = usePlaylist();
    this.auth = useAuth();
    this.player = usePlayer();

    const q = this.$route.query.q;
    if (q) {
      await this.searchStore.search(q);
    }

    if (this.auth?.user?._id) {
      await this.playlistStore.getMyPlaylists(this.auth.user._id);
    }
  },

  watch: {
    "$route.query.q"(newQ) {
      if (newQ) {
        this.searchStore.search(newQ);
      }
    },
  },

  computed: {
    songs() {
      return this.searchStore.state.songs || [];
    },
    playlists(){
      return this.searchStore.state.playlists || [];
    },
    mePlaylists() {
      return this.playlistStore.state.playlists || [];
    },
    loading() {
      return this.searchStore.state.loading;
    },
  },

  methods: {
    toggleMenu(songId) {
      if (this.openMenuId === songId) {
        this.openMenuId = null;
        this.openPlaylistMenu = false;
      } else {
        this.openMenuId = songId;
        this.openPlaylistMenu = false;
      }
    },

    selectPlaylist(songId, playlist) {
      this.playlistStore.addSongToPlaylist(playlist._id, songId);
      this.openMenuId = null;
      this.openPlaylistMenu = false;
    },

    async playSong(song) {
      await this.player.play(song)
    },
    goToPlaylist(playlist){
      this.$router.push(`/playlist/${playlist._id}`);
    }
  },
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Search results</h1>

    <div v-if="loading" class="text-gray-400">Searching...</div>

    <!-- Songs -->
    <div v-if="songs.length">
      <h2 class="text-lg font-semibold mb-3">Songs</h2>
      <div class="space-y-2">
        <div v-for="song in songs" :key="song._id"
          class="group p-3 rounded hover:bg-white/10 cursor-pointer flex justify-between">

          <div class="flex items-center gap-3 min-w-0" @click="playSong(song)">
            <div class="relative w-11 h-11 md:w-12 md:h-12 rounded overflow-hidden bg-gray-700 shrink-0">
              <img v-if="song.coverImage" :src="song.coverImage" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <i class="mdi mdi-music"></i>
              </div>

              <!-- play overlay -->
              <div class="absolute inset-0 bg-black/50 flex items-center justify-center
           opacity-0 group-hover:opacity-100 transition">
                <i class="mdi mdi-play text-white text-2xl"></i>
              </div>
            </div>

            <div class="min-w-0">
              <p class="font-medium truncate">{{ song.title }}</p>
              <p class="text-xs text-gray-400 truncate">{{ song.artist }}</p>
            </div>
          </div>

          <div class="relative flex justify-center items-center">
            <div class="hidden md:block text-sm text-gray-400 text-right mr-5">
              {{ Math.floor(song.duration / 60) }}:{{
                String(song.duration % 60).padStart(2, "0")
              }}
            </div>
            <button class="text-white hover:text-white opacity-0 group-hover:opacity-100 transition"
              @click.stop="toggleMenu(song._id)">
              <i class="mdi mdi-dots-horizontal"></i>
            </button>


            <!-- menu -->
            <div v-if="openMenuId === song._id"
              class="absolute right-0 top-6 z-20 w-80 bg-[#282828] rounded shadow-lg text-sm">
              <button class="w-full text-left px-4 py-2 hover:bg-white/10 flex justify-between items-center"
                @click.stop="openPlaylistMenu = !openPlaylistMenu">
                <span><i class="mdi mdi-plus"></i> Add to playlist</span>
                <i class="mdi mdi-menu-right text-lg"></i>
              </button>
            </div>


            <!-- Playlist submenu -->
            <div v-if="openMenuId === song._id && openPlaylistMenu"
              class="absolute right-80 top-6 z-50 w-64 bg-[#282828] rounded-xl shadow-xl text-sm">
              <div class="px-4 py-2 flex items-center gap-2 border-b border-white/10 sticky top-0 bg-[#282828]"
                @click.stop="$emit('create', song)">
                <i class="mdi mdi-plus"></i>
                <span>New playlist</span>
              </div>

              <div class="max-h-60 overflow-y-auto">
                <div v-for="pl in mePlaylists" :key="pl._id" class="px-4 py-2 hover:bg-white/10 cursor-pointer"
                  @click.stop="selectPlaylist(song._id, pl)">
                  {{ pl.name }}
                </div>

                <div v-if="!playlists.length" class="px-4 py-2 text-gray-400 text-xs">
                  No playlists
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Playlists -->
    <div v-if="playlists.length">
      <h2 class="text-lg font-semibold mb-3">Playlists</h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="playlist in playlists" :key="playlist._id"
          class="p-4 rounded-lg bg-[#181818] hover:bg-[#1f1f1f] cursor-pointer transition" @click="goToPlaylist(playlist)">
          <!-- cover -->
          <div class="h-36 rounded-lg overflow-hidden mb-4 bg-gray-700">
            <img v-if="playlist.coverImage" :src="playlist.coverImage" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <i class="mdi mdi-music text-3xl"></i>
            </div>
          </div>

          <!-- info -->
          <p class="font-semibold truncate">
            {{ playlist.name }}
          </p>
          <p class="text-sm text-gray-400">
            {{ playlist.songs?.length || 0 }} songs
          </p>
        </div>
      </div>
    </div>


    <div v-if="!loading && !songs.length && !playlists.length" class="text-gray-500">
      No results found
    </div>
  </div>
</template>
