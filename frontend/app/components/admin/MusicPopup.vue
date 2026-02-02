<script>
export default {
    props: {
        song: {
            type: Object,
            required: true
        }
    },
    emits: ['close'],

    data() {
        return {
            audio: null,
            isPlaying: false,
            currentTime: 0,
            duration: 0
        }
    },

    mounted() {
        this.duration = this.song.duration
        this.audio = new Audio(this.song.audioUrl)

        this.audio.ontimeupdate = () => {
            this.currentTime = this.audio.currentTime
        }

        this.audio.onended = () => {
            this.isPlaying = false
            this.currentTime = 0
        }
    },

    beforeUnmount() {
        if (this.audio) {
            this.audio.pause()
            this.audio = null
        }
    },

    methods: {
        togglePlay() {
            if (!this.audio) return

            if (this.isPlaying) {
                this.audio.pause()
            } else {
                this.audio.play().catch(err => {
                    console.error('Play blocked:', err)
                })
            }

            this.isPlaying = !this.isPlaying
        },


        seek(e) {
            const time = Number(e.target.value)
            this.audio.currentTime = time
            this.currentTime = time
        },

        formatTime(sec) {
            const m = Math.floor(sec / 60)
            const s = Math.floor(sec % 60)
            return `${m}:${String(s).padStart(2, '0')}`
        },

        close() {
            if (this.audio) this.audio.pause()
            this.$emit('close')
        }
    }
}
</script>

<template>
    <div class="fixed inset-0 bg-black/70 flex items-end justify-center z-50">
        <div class="bg-[#181818] w-full max-w-xl p-4 rounded-t-xl">

            <div class="mb-3">
                <p class="font-semibold">{{ song.title }}</p>
                <p class="text-sm text-gray-400">{{ song.artist }}</p>
            </div>

            <div class="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <span>{{ formatTime(currentTime) }}</span>

                <input type="range" min="0" :max="duration" :value="currentTime" @input="seek"
                    class="flex-1 accent-green-400" />

                <span>{{ formatTime(duration) }}</span>
            </div>

            <div class="flex items-center justify-between">
                <button @click="togglePlay">
                    <i :class="[
                        'mdi text-4xl text-green-400',
                        isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle'
                    ]"></i>
                </button>

                <button @click="close">
                    <i class="mdi mdi-close text-2xl text-gray-400"></i>
                </button>
            </div>
        </div>
    </div>
</template>
