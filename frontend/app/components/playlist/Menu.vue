<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isPublic:{
      type: Boolean,
      default: true
    }
  },
  emits: ["edit", "delete", "close","toggle"],
  methods: {
    onEdit() {
      this.$emit("edit");
      this.$emit("close");
    },
    onDelete() {
      this.$emit("delete");
      this.$emit("close");
    },
    onToggle(){
      this.$emit("toggle");
      this.$emit("close");
    }
  },
};
</script>

<template>
  <div
    v-if="visible"
    class="absolute left-0 top-full mt-2 w-44 bg-[#282828] rounded-md shadow-lg overflow-hidden z-50"
  >
    <button
      class="w-full text-left text-text-disabled px-4 py-2 text-sm"
      type="button"
    >
      Go to Playlist Radio
    </button>

    <div class="border-b border-white/10 mt-2 mb-2"></div>

    <button
      class="w-full text-left text-text-disabled px-4 py-2 text-sm"
      type="button"
    >
      Collaborative Playlist
    </button>

    <button
      class="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition flex items-center gap-2"
      type="button"
      @click="onToggle"
    >
      {{ isPublic ? "Make Secret" : "Make Public"}}
    </button>

    <div class="border-b border-white/10 mt-2 mb-2"></div>

    <button
      class="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition flex items-center gap-2"
      type="button"
      @click="onEdit"
    >
      Edit Detail
    </button>

    <button
      class="w-full text-left text-text-disabled px-4 py-2 text-sm"
      type="button"
    >
      Report
    </button>

    <button
      class="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition flex items-center gap-2"
      type="button"
      @click="onDelete"
    >
      Delete
    </button>

   <div class="border-b border-white/10 mt-2 mb-2"></div>

    <button
      class="w-full text-left text-text-disabled px-4 py-2 text-sm"
      type="button"
    >
      Create Similar Playlist
    </button>

    <button
      class="w-full text-left text-text-disabled px-4 py-2 text-sm"
      type="button"
    >
      Download
    </button>

    <button
      class="w-full text-left text-text-disabled px-4 py-2 text-sm"
      type="button"
    >
      Share
    </button>
  </div>
</template>
