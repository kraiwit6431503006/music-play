<script>
export default {
  emits: ['close', 'confirm']
}
</script>

<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center">
    <div class="bg-[#181818] p-6 w-80 rounded space-y-4 text-center">
      <p>Are you sure you want to delete this song?</p>
      <div class="flex justify-center gap-4">
        <button @click="$emit('close')">Cancel</button>
        <button class="bg-red-500 px-4 py-1 rounded" @click="$emit('confirm')">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
