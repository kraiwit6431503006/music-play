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
      <h2 class="text-2xl font-bold mb-4">Recommended for you</h2>
      <h2 class="text-text-secondary">Show all</h2>
    </div>
    

    <div class="flex gap-4 overflow-x-auto pb-2">
      <div
        v-for="song in songs"
        :key="song._id"
        class="group min-w-[180px] max-w-[180px] bg-[#181818] p-4 rounded-2xl hover:bg-[#1f1f1f] transition flex flex-col justify-between"
      >
        <!-- cover -->
        <div
          class="relative w-full h-[140px] rounded-xl overflow-hidden shadow-md"
        >
          <img
            v-if="song.coverImage"
            :src="song.coverImage"
            class="w-full h-full object-cover"
          />

          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-700"
          >
            <i class="mdi mdi-music text-2xl"></i>
          </div>
          <div
            class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <button
              class="bg-primary text-black w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition"
              @click="$emit('play', song)"
            >
              <i class="mdi mdi-play text-xl"></i>
            </button>
          </div>
        </div>

        <!-- text -->
        <div class="mt-3">
          <p class="font-semibold text-sm truncate">
            {{ song.title }}
          </p>
          <p class="text-xs text-gray-400 truncate">
            {{ song.artist || "Unknown artist" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
