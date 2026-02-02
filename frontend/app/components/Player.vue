<script>
import { usePlayer } from "@/composables/usePlayer";

export default {
  data() {
    return {
      player: null,
      isMuted: false,
      lastVolume: 1,
    };
  },

  created() {
    this.player = usePlayer();
  },

  computed: {
    isPlaylist() {
      return this.player.state.playlist.length > 0;
    },

    isFirstSong() {
      return this.player.state.currentIndex <= 0;
    },

    isLastSong() {
      const { playlist, currentIndex } = this.player.state;
      return playlist.length === 0 || currentIndex === playlist.length - 1;
    },
  },

  methods: {
    formatTime(sec) {
      if (!sec || isNaN(sec)) return "0:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${String(s).padStart(2, "0")}`;
    },

    seek(e) {
      this.player.seek(Number(e.target.value));
    },

    changeVolume(e) {
      const v = Number(e.target.value);
      this.player.setVolume(v);
      this.isMuted = v === 0;
      if (v > 0) this.lastVolume = v;
    },

    toggleMute() {
      if (this.isMuted) {
        // unmute
        const v = this.lastVolume || 1;
        this.player.setVolume(v);
        this.isMuted = false;
      } else {
        // mute
        this.lastVolume = this.player.state.volume;
        this.player.setVolume(0);
        this.isMuted = true;
      }
    },

    closePlayer() {
      this.player.stop();
    },
  },
};
</script>

<template>
  <footer v-if="player?.state.currentSong"
    class="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-gray-700 px-4 py-3 z-50">
    <!-- ===== Desktop ===== -->
    <div class="hidden md:flex items-center gap-4">
      <!-- Song info -->
      <div class="w-1/4">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-sm overflow-hidden bg-gray-700 shrink-0">
            <div class="w-full h-full flex items-center justify-center text-gray-400">
              <img v-if="player.state.currentSong.coverImage" :src="player.state.currentSong.coverImage"
                class="w-full h-full object-cover" />
              <i v-else class="mdi mdi-music text-xl"></i>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold">
              {{ player.state.currentSong.title }}
            </p>
            <p class="text-xs text-gray-400">
              {{ player.state.currentSong.artist }}
            </p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex flex-col w-2/4 gap-1">
        <div class="flex justify-center gap-4 items-center">

          <!-- Prev -->
          <i v-if="isPlaylist" :class="[
            'mdi mdi-skip-previous text-3xl',
            isFirstSong
              ? 'text-gray-600 cursor-not-allowed'
              : 'cursor-pointer hover:text-white'
          ]" @click="!isFirstSong && player.prev()" />

          <!-- Play / Pause -->
          <i :class="[
            'mdi text-4xl cursor-pointer',
            player.state.isPlaying
              ? 'mdi-pause-circle'
              : 'mdi-play-circle'
          ]" @click="player.toggle" />

          <!-- Next -->
          <i v-if="isPlaylist" :class="[
            'mdi mdi-skip-next text-3xl',
            isLastSong
              ? 'text-gray-600 cursor-not-allowed'
              : 'cursor-pointer hover:text-white'
          ]" @click="!isLastSong && player.next()" />

        </div>


        <!-- Progress -->
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <span>{{ formatTime(player.state.currentTime) }}</span>

          <input type="range" min="0" :max="player.state.duration" :value="player.state.currentTime" @input="seek"
            class="flex-1 accent-green-400" />

          <span>{{ formatTime(player.state.duration) }}</span>
        </div>
      </div>

      <div class="w-1/4 flex items-center justify-end gap-3">
        <i :class="[
          'mdi text-xl cursor-pointer',
          isMuted || player.state.volume === 0
            ? 'mdi-volume-mute text-gray-400'
            : 'mdi-volume-high',
        ]" @click="toggleMute" />

        <input type="range" min="0" max="1" step="0.01" :value="player.state.volume" @input="changeVolume"
          class="w-24 accent-green-400" />

        <i class="mdi mdi-close text-xl cursor-pointer" @click="closePlayer" />
      </div>
    </div>

    <!-- ===== Mobile ===== -->
    <div class="flex md:hidden items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 rounded-sm overflow-hidden bg-gray-700 shrink-0">
        <div class="w-full h-full flex items-center justify-center text-gray-400">
          <img v-if="player.state.currentSong.coverImage" :src="player.state.currentSong.coverImage"
            class="w-full h-full object-cover" />
          <i v-else class="mdi mdi-music text-xl"></i>
        </div>
      </div>
      <div>
        <p class="text-sm font-semibold truncate">
          {{ player.state.currentSong.title }}
        </p>
        <p class="text-xs text-gray-400 truncate">
          {{ player.state.currentSong.artist }}
        </p>
      </div>
      </div>
      

      <div class="flex items-center gap-4">
        <i :class="[
          'mdi text-3xl cursor-pointer',
          player.state.isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle',
        ]" @click="player.toggle" />

        <i class="mdi mdi-close text-2xl cursor-pointer" @click="closePlayer" />
      </div>
    </div>
  </footer>
</template>
