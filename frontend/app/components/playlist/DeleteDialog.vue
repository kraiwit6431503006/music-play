<script>
export default {
  props: {
    playlist: {
      type: Object,
      default: null,
    },
  },

  emits: ["close", "confirm"],
};
</script>

<template>
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center">
    <div class="bg-white p-6 w-full max-w-md rounded-lg space-y-4">
      <p class="text-black font-bold text-lg">Delete from Your Library?</p>
      <p class="text-black ">This will delete <span class="font-bold"> {{ playlist?.name  }} </span> from Your Library.</p>
      <div class="flex justify-end gap-4">
        <button @click="$emit('close')" class="text-black">Cancel</button>
        <button class="bg-red-500 px-10 py-3 rounded-full" @click="$emit('confirm')">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
