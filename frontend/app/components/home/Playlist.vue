<script>
export default {
  props: {
    playlists: {
      type: Array,
      required: true,
    },
  },
  emits: ["select"],
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-4">Public Playlists</h2>
      <h2 class="text-text-secondary">Show all</h2>
    </div>

    <div v-if="playlists.length > 0" class="flex gap-4 overflow-x-auto pb-2">
      <div
        v-for="playlist in playlists"
        :key="playlist._id"
        class="bg-[#181818] hover:bg-[#1f1f1f] p-4 rounded-xl cursor-pointer transition min-w-[200px] md:min-w-[200px] max-w-[200px] flex-shrink-0"
        @click="$emit('select', playlist)"
      >
        <div class="h-36 rounded-lg overflow-hidden mb-4 bg-gray-700">
          <img
            v-if="playlist.coverImage"
            :src="playlist.coverImage"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-400"
          >
            <i class="mdi mdi-music text-3xl"></i>
          </div>
        </div>

        <p class="font-semibold truncate">{{ playlist.name }}</p>
        <p class="text-sm text-gray-400">
          {{ playlist.songs?.length || 0 }} songs
        </p>
      </div>
    </div>

    <div v-else class="text-center">No have playlists</div>
  </div>
</template>
