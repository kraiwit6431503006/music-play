<script>
export default {
    props: {
        songs: {
            type: Array,
            required: true
        }
    },
    emits: ["play", "add"]
};
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold">Recommended</h1>
        <p class="text-text-secondary">Based on your listening</p>

        <div v-for="song in songs" :key="song._id" class=" flex justify-between  items-center mt-4">

            <div class="flex gap-3 items-center">
                <div class="w-14 h-14 rounded overflow-hidden bg-gray-700 shrink-0 relative group cursor-pointer"
                    @click="$emit('play', song)">
                    <!-- cover image -->
                    <img v-if="song.coverImage" :src="song.coverImage" class="w-full h-full object-cover" />

                    <!-- fallback icon -->
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                        <i class="mdi mdi-music text-xl"></i>
                    </div>

                    <!-- hover overlay -->
                    <div class="absolute inset-0 bg-black/50 flex items-center justify-center
           opacity-0 group-hover:opacity-100 transition">
                        <i class="mdi mdi-play text-white text-2xl"></i>
                    </div>
                </div>


                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <p class="font-semibold truncate">{{ song.title }}</p>
                    <p class="text-xs text-gray-400 truncate">{{ song.artist }}</p>
                </div>
            </div>


            <button class="rounded-full px-4 py-1 border border-white" type="button"
                @click="$emit('add', song._id)">Add</button>
        </div>
    </div>
</template>