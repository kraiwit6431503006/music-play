<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
<template>
  <div class="relative overflow-hidden p-6 md:p-10 text-white">
    
    <div
      class="absolute inset-0 md:rounded-t-lg"
      style="background: linear-gradient(135deg, #1db95488, #121212)"
    ></div>

    <div
      class="absolute -top-20 -right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl"
    ></div>

    <div class="relative z-10">
      <p class="text-sm uppercase tracking-widest text-gray-300 mb-2">
        Welcome back
      </p>

      <h1 class="text-3xl md:text-5xl font-extrabold mb-3">
        Hi,
        <span class="text-primary">{{ name || "Guest" }}</span> 👋
      </h1>

      <p class="text-gray-300 mb-6 max-w-xl">
        Discover new music, enjoy your playlists, and keep the rhythm going.
      </p>

      <div class="flex gap-3 flex-wrap">
        <button
          class="bg-primary text-white px-6 py-2 rounded-full font-semibold transition"
        >
          <i class="mdi mdi-play"></i> Play something
        </button>
      </div>
    </div>
  </div>
</template>
