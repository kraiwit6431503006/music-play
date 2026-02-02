<script>
export default {
    data() {
        return {
            playlistStore: null,
            songStore: null,
            player: null,
            showMenu: false,
            showFormDialog: false,
            showDeleteDialog: false,

            toast: {
                visible: false,
                message: "",
                type: "success",
            },
        };
    },

    async created() {
        this.playlistStore = usePlaylist();
        this.player = usePlayer();
        const playlistId = this.$route.params.id;
        await this.playlistStore.getPlaylistById(playlistId);
        await this.playlistStore.getRecommendSongs(playlistId, 10);
    },

    computed: {
        playlist() {
            return this.playlistStore.state.playlist;
        },

        playlists() {
            return this.playlistStore.state.playlists;
        },

        loading() {
            return this.playlistStore.state.loading;
        },

        recommendSongs() {
            return this.playlistStore.state.recommendSongs;
        },
    },

    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },

        openEdit() {
            this.showFormDialog = true;
        },

        openDelete() {
            this.showDeleteDialog = true;
        },

        async submit(playlistData) {
            const userId = this.playlist.user._id;
            await this.playlistStore.updatePlaylist(this.playlist._id, playlistData);
            await this.playlistStore.getMyPlaylists(userId);
            this.showFormDialog = false;
            this.showMenu = false;
        },

        async confirmDelete() {
            const userId = this.playlist.user._id;
            await this.playlistStore.deletePlaylist(this.playlist._id);
            await this.playlistStore.getMyPlaylists(userId);
            this.showDeleteDialog = false;
            this.$router.push(`/`);
        },

        async togglePublic() {
            const newValue = !this.playlist.isPublic;
            await this.playlistStore.updatePlaylistPublic(
                this.playlist._id,
                newValue,
            );
        },

        async playSong(song) {
            const songs = this.playlist.songs;
            const index = songs.findIndex((s) => s._id === song._id);

            if (index !== -1) {
                await this.player.playPlaylist(songs, index);
            } else {
                await this.player.play(song);
            }
        },

        async playPlaylist() {
            this.player.playPlaylist(this.playlist.songs, 0);
        },

        async addSongToPlaylist(songId) {
            const playlistId = this.playlist._id;
            const userId = this.playlist.user._id;
            await this.playlistStore.addSongToPlaylist(playlistId, songId);
            await this.playlistStore.getPlaylistById(playlistId);
            await this.playlistStore.getRecommendSongs(playlistId, 10);
            await this.playlistStore.getMyPlaylists(userId);
        },

        async removeSongOutPlaylist(songId) {
            const playlistId = this.playlist._id;
            const userId = this.playlist.user._id;
            await this.playlistStore.removeSongOutPlaylist(playlistId, songId);
            await this.playlistStore.getPlaylistById(playlistId);
            await this.playlistStore.getMyPlaylists(userId);
            await this.playlistStore.getRecommendSongs(playlistId, 10);
        },

        async createPlaylist(song) {
            const userId = this.playlist.user._id;
            const playlist = await this.playlistStore.createPlaylistWithSong({
                name: song.title,
                userId,
                coverImage: song.coverImage,
                songId: song._id,
            });
            this.$router.push(`/playlist/${playlist._id}`);
            await this.playlistStore.getMyPlaylists(userId);
        },

        async addSongToOtherPlaylist({ songId, playlist }) {
            await this.playlistStore.addSongToPlaylist(playlist._id, songId);
            const currentId = this.$route.params.id;
            await this.playlistStore.getPlaylistById(currentId);

            this.showToast(`Added to ${playlist.name}`);
        },

        showToast(message, type = "success") {
            this.toast.message = message;
            this.toast.type = type;
            this.toast.visible = true;

            setTimeout(() => {
                this.toast.visible = false;
            }, 2500);
        },
    },
};
</script>

<template>
    <div class="bg-[#121212] rounded-lg overflow-hidden h-full">
        <!-- HEADER -->
        <div class="flex flex-col md:flex-row md:items-end gap-6 p-6 md:p-8"
            style="background: linear-gradient(180deg, #1db95433, #121212)">
            <!-- cover -->
            <div
                class="w-40 h-40 md:w-48 md:h-48 bg-[#282828] rounded shadow-lg flex items-center justify-center mx-auto md:mx-0">
                <img v-if="playlist?.coverImage" :src="playlist?.coverImage" class="w-full h-full object-cover" />
                <i v-else class="mdi mdi-music text-5xl md:text-6xl text-gray-400"></i>
            </div>

            <!-- info -->
            <div class="flex-1 text-center md:text-left">
                <p class="text-xs uppercase text-gray-300 mb-2">Playlist</p>

                <h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 break-words">
                    {{ playlist?.name }}
                </h1>

                <p class="text-sm text-gray-300 flex flex-wrap justify-center md:justify-start items-center gap-1">
                    <span>
                        Created by
                        <span class="font-semibold">
                            {{ playlist?.user?.name || "Unknown" }}
                        </span>
                    </span>
                    <i class="mdi mdi-circle-small text-xl"></i>
                    <span>{{ playlist?.songs?.length || 0 }} songs</span>
                </p>

                <!-- actions -->
                <div class="flex items-center justify-center md:justify-start mt-4 gap-4 flex-wrap">
                    <button v-if="playlist?.songs?.length > 0"
                        class="bg-primary bg-primary rounded-full px-6 md:px-8 py-2 font-semibold transition"
                        type="button" @click="playPlaylist">
                        Play
                    </button>

                    <div class="relative">
                        <button @click="toggleMenu"
                            class="text-2xl md:text-3xl h-9 w-9 flex items-center justify-center rounded-full border border-white transition">
                            <i class="mdi mdi-dots-horizontal"></i>
                        </button>

                        <PlaylistMenu :visible="showMenu" :is-public="playlist?.isPublic" @edit="openEdit"
                            @delete="openDelete" @close="showMenu = false" @toggle="togglePublic" />
                    </div>
                </div>
            </div>
        </div>

        <div class="md:p-6 p-2">
            <div v-if="loading" class="text-gray-400">Loading playlist...</div>

            <div v-else-if="playlist?.songs?.length > 0">
                <PlaylistMusicList :songs="playlist?.songs" @play="playSong" @remove="removeSongOutPlaylist"
                    @create="createPlaylist" @add="addSongToOtherPlaylist" :playlists="playlists">
                </PlaylistMusicList>
            </div>

            <div v-if="recommendSongs.length > 0">
                <PlaylistRecommendSong :songs="recommendSongs" @play="playSong" @add="addSongToPlaylist">
                </PlaylistRecommendSong>
            </div>
        </div>

        <PlaylistFormDialog v-if="showFormDialog" :playlist="playlist" @close="showFormDialog = false"
            @submit="submit" />

        <PlaylistDeleteDialog v-if="showDeleteDialog" :playlist="playlist" @close="showDeleteDialog = false"
            @confirm="confirmDelete" />

        <!-- Toast -->
        <transition name="fade">
            <div v-if="toast.visible"
                class="fixed  bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2"
                :class="toast.type === 'success'
                    ? 'bg-white text-black'
                    : 'bg-red-600 text-white'
                    ">
                <i class="mdi" :class="toast.type === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'
                    "></i>
                {{ toast.message }}
            </div>
        </transition>
    </div>
</template>
