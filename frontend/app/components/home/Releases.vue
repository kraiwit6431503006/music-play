<script>
export default {
  props: {
    songs: {
      type: Array,
      required: true,
    },
  },
  emits: ["play"],
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-4">New Releases</h2>
      <h2 class="text-text-secondary">Show all</h2>
    </div>
    
    <div class="flex gap-4 overflow-x-auto pb-2">
      <div
        v-for="song in songs"
        :key="song._id"
        class="group min-w-[180px] max-w-[180px] bg-[#181818] p-4 rounded-2xl hover:bg-[#1f1f1f] transition flex flex-col justify-between"
         @click="$emit('play', song)"
      >
        <div class="h-36 rounded-lg overflow-hidden mb-4 bg-gray-700">
          <img
            v-if="song.coverImage"
            :src="song.coverImage"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-400"
          >
            <i class="mdi mdi-music text-3xl"></i>
          </div>
        </div>
        <p class="font-semibold truncate">Album {{ song.album }}</p>
        <p class="text-sm text-gray-400">{{ song.artist }}</p>
      </div>
    </div>
  </div>
</template>
