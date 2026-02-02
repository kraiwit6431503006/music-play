<script>
export default {
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  emits: ['play', 'edit', 'delete']
}
</script>

<template>
  <div class="bg-background-main rounded-lg">

    <!-- mobile -->
    <div class="md:hidden space-y-3 p-3">
      <div v-for="song in songs" :key="song._id" class="bg-white/5 rounded-lg p-3 flex gap-3 items-center">
        <!-- Cover -->
        <div class="w-14 h-14 rounded overflow-hidden bg-gray-700 shrink-0">
          <img v-if="song.coverImage" :src="song.coverImage" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <i class="mdi mdi-music text-xl"></i>
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="font-semibold truncate">{{ song.title }}</p>
          <p class="text-xs text-gray-400 truncate">{{ song.artist }}</p>
          <p class="text-xs text-gray-500 truncate">
            {{ song.album || '-' }} •
            {{ Math.floor(song.duration / 60) }}:{{
              String(song.duration % 60).padStart(2, '0')
            }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-2">
          <button class="text-green-400" @click="$emit('play', song)">
            <i class="mdi mdi-play-circle text-2xl"></i>
          </button>

          <div class="flex gap-3">
            <button class="text-blue-400" @click="$emit('edit', song)">
              <i class="mdi mdi-pencil"></i>
            </button>

            <button class="text-red-400" @click="$emit('delete', song)">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- desk -->
    <div class="hidden md:block p-4 overflow-x-auto">
      <table class="w-full text-sm text-white">
        <thead class="text-gray-400 border-b border-gray-700">
          <tr>
            <th class="text-left py-3 w-12">#</th>
            <th class="text-left">Song</th>
            <th class="text-center">Artist</th>
            <th class="text-center">Album</th>
            <th class="text-center">Duration</th>
            <th class="text-right w-32">Actions</th>
          </tr>
        </thead>

        <tbody v-if="songs != 0">
          <tr v-for="song in songs" :key="song._id" class="group hover:bg-white/5 transition">
            <!-- Play -->
            <td class="py-3">
              <button class="text-green-400 hover:scale-110 transition" @click="$emit('play', song)">
                <i class="mdi mdi-play-circle text-2xl"></i>
              </button>
            </td>

            <!-- Song -->
            <td class="flex items-center gap-3 py-3">
              <div class="w-12 h-12 rounded overflow-hidden bg-gray-700 shrink-0">
                <img v-if="song.coverImage" :src="song.coverImage" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <i class="mdi mdi-music"></i>
                </div>
              </div>

              <div>
                <p class="font-semibold">{{ song.title }}</p>
                <p class="text-xs text-gray-400">{{ song.artist }}</p>
              </div>
            </td>

            <td class="text-center text-gray-300">{{ song.artist }}</td>
            <td class="text-center text-gray-300">{{ song.album || '-' }}</td>
            <td class="text-center text-gray-300">
              {{ Math.floor(song.duration / 60) }}:{{
                String(song.duration % 60).padStart(2, '0')
              }}
            </td>

            <!-- Actions -->
            <td class="text-right">
              <div class="flex justify-end gap-3 transition">
                <button class="text-blue-400 hover:text-blue-300" @click="$emit('edit', song)">
                  <i class="mdi mdi-pencil text-lg"></i>
                </button>

                <button class="text-red-400 hover:text-red-300" @click="$emit('delete', song)">
                  <i class="mdi mdi-delete text-lg"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="songs == 0" class="text-text-secondary text-center text-sm mt-4">
        No data
      </div>
    </div>

  </div>
</template>
