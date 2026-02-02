<script>
export default {
  data() {
    return {
      player: null
    }
  },

  created() {
    this.player = usePlayer()
  }
}
</script>
<template>
  <div class="flex h-screen bg-black text-white">
    <aside class="w-60 bg-[#121212] hidden md:block">
      <!-- admin sidebar -->
      <div class="p-4 font-bold text-lg">Admin</div>
    </aside>

    <main class="flex-1 overflow-auto p-4">
      <slot />
    </main>
    <Player v-if="player.state.currentSong" />
  </div>
</template>
