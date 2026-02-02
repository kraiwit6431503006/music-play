<script lang="js">
export default {
  props: {
    modelValue: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'success'
    },
    title: String,
    message: String
  },

  emits: ['update:modelValue'],

  computed: {
    icon() {
      return {
        success: 'mdi-check-circle',
        warning: 'mdi-alert',
        error: 'mdi-close-circle'
      }[this.type]
    },

    color() {
      return {
        success: 'text-green-500',
        warning: 'text-yellow-400',
        error: 'text-red-500'
      }[this.type]
    }
  },

  methods: {
    close() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
    >
      <div
        class="w-full max-w-sm bg-[#181818] rounded-xl p-6 shadow-2xl text-center animate-fade"
      >
        <i
          class="mdi text-5xl mb-3"
          :class="[icon, color]"
        ></i>

        <h3 class="text-lg font-semibold text-white">
          {{ title }}
        </h3>

        <p class="text-gray-400 mt-2">
          {{ message }}
        </p>

        <button
          @click="close"
          class="mt-5 px-6 py-2 rounded-full bg-green-500
                 text-black font-semibold hover:bg-green-400 transition"
        >
          OK
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style>
@keyframes fade {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade {
  animation: fade 0.2s ease-out;
}
</style>
