<script>
export default {
  props: {
    playlist: {
      type: Object,
      default: null,
    },
  },

  emits: ["close", "submit"],

  data() {
    return {
      form: this.getEmptyForm(),
    };
  },

  watch: {
    playlist: {
      immediate: true,
      handler(newVal) {
        this.form = newVal ? { ...newVal } : this.getEmptyForm();
      },
    },
  },

  methods: {
    getEmptyForm() {
      return {
        name: "",
        coverImage: "",
      };
    },

    save() {
      this.$emit("submit", {
        name: this.form.name,
        coverImage: this.form.coverImage,
      });
    },
  },
};
</script>
<template>
  <div
    class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[#181818] w-full max-w-md rounded-lg p-6 space-y-3 shadow-xl"
    >
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-white">Edit details</h2>
        <button
          class="text-gray-400 hover:text-white text-xl"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <div class="space-y-3">
        <input v-model="form.name" placeholder="Name" class="input" />
        <input
          v-model="form.coverImage"
          placeholder="Cover Image URL"
          class="input"
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-2">
        <button
          class="bg-white text-black px-10 py-3 rounded-full font-medium"
          @click="save"
        >
          Save
        </button>
      </div>
      <p class="text-xs">By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  background: #222;
  border: 1px solid #333;
  padding: 8px 10px;
  border-radius: 6px;
  color: white;
  outline: none;
}

.input:focus {
  border-color: #22c55e;
}
</style>
