<script>
export default {
  props: {
    myPlaylists: {
      type: Array,
      required: true,
    },
  },
  emits: ["play"],
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">My Playlists</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div
        v-for="playlist in myPlaylists"
        :key="playlist._id"
        class="group flex items-center justify-between bg-[#181818] hover:bg-[#1f1f1f] px-3 py-2 rounded-xl transition cursor-pointer"
        @click="$emit('play', playlist)"
      >
        <!-- left -->
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-14 h-14 rounded-lg overflow-hidden bg-gray-700 shrink-0"
          >
            <img
              v-if="playlist.coverImage"
              :src="playlist.coverImage"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-gray-400"
            >
              <i class="mdi mdi-music"></i>
            </div>
          </div>

          <p class="text-sm font-medium truncate">
            {{ playlist.name }}
          </p>
        </div>

        <!-- play icon -->
        <button
          class="opacity-0 group-hover:opacity-100 bg-primary text-black w-6 h-6 rounded-full flex items-center justify-center transition transform group-hover:scale-110"
          @click.stop="$emit('play', playlist)"
        >
          <i class="mdi mdi-play text-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>
