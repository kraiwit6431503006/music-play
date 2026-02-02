<script>
export default {
  props: {
    songs: {
      type: Array,
      required: true,
    },
    playlists: {
      type: Array,
      required: true,
    },
  },
  emits: ["play", "remove", "create", "add"],
  data() {
    return {
      openMenuId: null,
      openPlaylistMenu: false,
    };
  },
  methods: {
    toggleMenu(songId) {
      if (this.openMenuId === songId) {
        this.closeMenu();
      } else {
        this.openMenuId = songId;
        this.openPlaylistMenu = false;
      }
    },

    closeMenu() {
      this.openMenuId = null;
      this.openPlaylistMenu = false;
    },

    selectPlaylist(songId, playlist) {
      this.$emit("add", {
        songId,
        playlist,
      });
      this.closeMenu();
    },
  },
};
</script>

<template>
  <div>
    <!-- header -->
    <div
      class="hidden md:grid grid-cols-[40px_1fr_200px_60px_40px] text-xs text-gray-400 border-b border-white/10 pb-2 mb-3"
    >
      <div class="text-center">#</div>
      <div>Title</div>
      <div>Album</div>
      <div class="text-center">
        <i class="mdi mdi-clock-outline text-sm"></i>
      </div>
      <div></div>
    </div>

    <!-- rows -->
    <div
      v-for="(song, index) in songs"
      :key="song._id"
      class="group grid grid-cols-[1fr_auto] md:grid-cols-[40px_1fr_200px_60px_40px] items-center gap-3 px-2 py-2 rounded hover:bg-white/10 transition cursor-pointer relative"
    >
      <!-- index / play -->
      <div class="hidden md:flex justify-center text-sm text-gray-400">
        <span class="group-hover:hidden">
          {{ index + 1 }}
        </span>
        <button
          class="hidden group-hover:block text-green-500"
          @click.stop="$emit('play', song)"
        >
          <i class="mdi mdi-play"></i>
        </button>
      </div>

      <!-- title -->
      <div class="flex items-center gap-3 min-w-0" @click="$emit('play', song)">
        <div
          class="relative w-11 h-11 md:w-12 md:h-12 rounded overflow-hidden bg-gray-700 shrink-0"
        >
          <img
            v-if="song.coverImage"
            :src="song.coverImage"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-400"
          >
            <i class="mdi mdi-music"></i>
          </div>

          <!-- play overlay -->
          <div
            class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition md:hidden"
          >
            <i class="mdi mdi-play text-white text-xl"></i>
          </div>
        </div>

        <div class="min-w-0">
          <p class="font-medium truncate">{{ song.title }}</p>
          <p class="text-xs text-gray-400 truncate">{{ song.artist }}</p>
        </div>
      </div>

      <!-- album -->
      <div class="hidden md:block text-sm text-gray-400 truncate">
        {{ song.album || "-" }}
      </div>

      <!-- duration -->
      <div class="hidden md:block text-sm text-gray-400 text-right">
        {{ Math.floor(song.duration / 60) }}:{{
          String(song.duration % 60).padStart(2, "0")
        }}
      </div>

      <!-- dots / menu -->
      <div class="relative flex justify-center">
        <button
          class="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition"
          @click.stop="toggleMenu(song._id)"
        >
          <i class="mdi mdi-dots-horizontal"></i>
        </button>

        <!-- menu -->
        <div
          v-if="openMenuId === song._id"
          class="absolute right-0 top-6 z-20 w-80 bg-[#282828] rounded shadow-lg text-sm"
        >
          <button
            class="w-full text-left px-4 py-2 hover:bg-white/10 flex justify-between items-center"
            @click.stop="openPlaylistMenu = !openPlaylistMenu"
          >
            <span> <i class="mdi mdi-plus"></i> Add to playlist </span>
            <i class="mdi mdi-menu-right text-lg"></i>
          </button>

          <button
            class="w-full text-left px-4 py-2 hover:bg-white/10"
            @click.stop="
              $emit('remove', song._id);
              closeMenu();
            "
          >
            <i class="mdi mdi-delete"></i> Remove from this playlist
          </button>
        </div>

        <!-- Playlist submenu -->
        <div
  v-if="openMenuId === song._id && openPlaylistMenu"
  class="absolute right-80 top-6 z-50 w-64 bg-[#282828] rounded-xl shadow-xl text-sm"
>
  <!-- header -->
  <div
    class="px-4 py-2 flex items-center gap-2 border-b border-white/10 sticky top-0 bg-[#282828] z-10"
    @click.stop="$emit('create', song)"
  >
    <i class="mdi mdi-plus"></i>
    <span>New playlist</span>
  </div>

  <!-- scroll area -->
  <div class="max-h-60 overflow-y-auto overscroll-contain">
    <div
      v-for="pl in playlists"
      :key="pl._id"
      class="px-4 py-2 hover:bg-white/10 cursor-pointer"
      @click.stop="selectPlaylist(song._id, pl)"
    >
      {{ pl.name }}
    </div>

    <div
      v-if="!playlists.length"
      class="px-4 py-2 text-gray-400 text-xs"
    >
      No playlists
    </div>
  </div>
</div>

      </div>
    </div>
  </div>
</template>
