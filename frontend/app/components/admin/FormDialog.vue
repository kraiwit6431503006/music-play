<script>
export default {

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    song: {
      type: Object,
      default: null
    }
  },

  emits: ['close', 'submit'],

  data() {
    return {
      form: this.getEmptyForm()
    }
  },

  watch: {
    song: {
      immediate: true,
      handler(newVal) {
        this.form = newVal
          ? { ...newVal }
          : this.getEmptyForm()
      }
    }
  },

  methods: {
    getEmptyForm() {
      return {
        title: '',
        artist: '',
        album: '',
        duration: '',
        audioUrl: '',
        coverImage: ''
      }
    },

    save() {
      this.$emit('submit', { ...this.form })
    }
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50  bg-black/70 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div class="bg-[#181818] w-full max-w-md rounded-lg p-6 space-y-5 shadow-xl">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-white">
          {{ isEdit ? 'Edit Song' : 'Add Song' }}
        </h2>
        <button
          class="text-gray-400 hover:text-white text-xl"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <div class="space-y-3">
        <input v-model="form.title" placeholder="Title" class="input" />
        <input v-model="form.artist" placeholder="Artist" class="input" />
        <input v-model="form.album" placeholder="Album" class="input" />
        <input v-model="form.duration" placeholder="Duration (sec)" class="input" />
        <input v-model="form.audioUrl" placeholder="Audio URL" class="input" />
        <input v-model="form.coverImage" placeholder="Cover Image URL" class="input" />
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-2">
        <button
          class="px-4 py-1 text-gray-300 hover:text-white"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-green-500 hover:bg-green-600 text-black px-4 py-1 rounded font-medium"
          @click="save"
        >
          Save
        </button>
      </div>
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
