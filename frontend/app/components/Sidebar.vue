<script>
export default {
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },

  emits: ['create']
}
</script>
<template>
  <aside class="w-64 bg-background-main p-4 ml-4 mb-4 rounded-lg hidden md:flex flex-col shrink-0 ]">

    <div class="flex items-center justify-between shrink-0">
      <h3 class="text-lg font-bold text-text-primary">Your Library</h3>
      <button type="button" class="rounded-full text-md bg-background-hover px-3 py-1" @click="$emit('create')">
        <i class="mdi mdi-plus"></i>
        Create
      </button>
    </div>

    <div class="mt-4 flex-1 overflow-y-auto pr-2">
      <!-- Search + Filter -->
      <div class="flex justify-between items-start bg-background-main z-10">
        <i class="mdi mdi-magnify text-white text-lg"></i>

        <div class="flex items-center text-sm">
          Recent
          <i class="mdi mdi-filter-variant ml-2"></i>
        </div>
      </div>

      <span class="text-white">{{ playlist }}</span>
      <!-- List -->
      <div v-for="playlist in playlists" :key="playlist._id"
        class="rounded-lg flex gap-3 items-center mt-4 hover:bg-white/5  cursor-pointer"
        @click="$router.push(`/playlist/${playlist._id}`)">
        <div class="w-14 h-14 rounded overflow-hidden bg-gray-700 shrink-0">
          <div class="w-full h-full flex items-center justify-center text-gray-400">
            <img v-if="playlist?.coverImage" :src="playlist?.coverImage" class="w-full h-full object-cover" />
            <i v-else class="mdi mdi-music text-xl"></i>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <p class="truncate text-md">{{ playlist.name }}</p>
          <p class="text-xs text-gray-400 truncate">Playlist</p>
        </div>
      </div>
    </div>
  </aside>
</template>
