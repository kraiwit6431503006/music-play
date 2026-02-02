<script lang="js">
definePageMeta({ layout: "admin" });

export default {
  data() {
    return {
      songStore: null,
      showFormDialog: false,
      showDeleteDialog: false,
      player: null,
      isEdit: false,
      currentSong: null,

      showPlayer: false,
      currentPlayingSong: null,
    };
  },

  computed: {
    songs() {
      return this.songStore.state.songs;
    },
  },

  created() {
    this.songStore = useSong();
    this.player = usePlayer()
  },

  mounted() {
    this.songStore.fetchSongs();
  },

  methods: {
    openAdd() {
      this.isEdit = false;
      this.currentSong = null;
      this.showFormDialog = true;
    },

    openEdit(song) {
      this.isEdit = true;
      this.currentSong = song;
      this.showFormDialog = true;
    },

    async submit(songData) {
      if (this.isEdit) {
        await this.songStore.updateSong(this.currentSong._id, songData);
      } else {
        await this.songStore.addSong(songData);
      }
      this.showFormDialog = false;
    },

    openDelete(song) {
      this.currentSong = song;
      this.showDeleteDialog = true;
    },

    async confirmDelete() {
      await this.songStore.deleteSong(this.currentSong._id);
      this.showDeleteDialog = false;
    },

    async playSong(song) {
      await this.player.play(song)
    }

  },
};
</script>

<template>
  <div class="text-white space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Music Management</h1>
      <button class="bg-green-500 px-4 py-2 rounded" @click="openAdd">
        + Add Song
      </button>
    </div>

    <!-- TABLE -->
    <AdminTable :songs="songs" @play="playSong" @edit="openEdit" @delete="openDelete" />

    <!-- ADD / EDIT -->
    <AdminFormDialog v-if="showFormDialog" :isEdit="isEdit" :song="currentSong" @close="showFormDialog = false"
      @submit="submit" />

    <!-- DELETE -->
    <AdminDeleteDialog v-if="showDeleteDialog" @close="showDeleteDialog = false" @confirm="confirmDelete" />
  </div>
</template>
