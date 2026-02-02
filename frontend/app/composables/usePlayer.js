import { reactive } from "vue";

const state = reactive({
  currentSong: null,
  audio: null,
  currentIndex: -1,
  playlist: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
});

export const usePlayer = () => {
  const destroyAudio = async () => {
    if (!state.audio) return;

    try {
      state.audio.pause();
    } catch (_) {}

    state.audio.src = "";
    state.audio.load();

    await new Promise((resolve) => setTimeout(resolve, 0));

    state.audio = null;
  };

  const initAudio = async (song) => {
    await destroyAudio();

    state.isPlaying = false;
    state.currentTime = 0;
    state.duration = 0;

    const audio = new Audio();
    audio.src = song.audioUrl;
    audio.preload = "metadata";
    audio.volume = state.volume;

    audio.addEventListener("loadedmetadata", () => {
      state.duration = audio.duration;
    });

    audio.addEventListener("timeupdate", () => {
      state.currentTime = audio.currentTime;
    });

    audio.addEventListener("ended", () => {
      if (state.playlist.length > 0 && state.currentIndex !== -1) {
        next();
      } else {
        stop();
      }
    });

    audio.load();

    state.audio = audio;
    state.currentSong = song;
  };

  const play = async (song) => {
    if (state.currentSong?.audioUrl !== song.audioUrl) {
      await initAudio(song);
    }

    try {
      await state.audio.play();
      state.isPlaying = true;
    } catch (err) {
      console.warn("play blocked:", err);
    }
  };

  const toggle = async () => {
    if (!state.audio) return;

    if (state.isPlaying) {
      state.audio.pause();
      state.isPlaying = false;
    } else {
      try {
        await state.audio.play();
        state.isPlaying = true;
      } catch (err) {
        console.warn("Toggle play blocked:", err);
      }
    }
  };

  const seek = (time) => {
    if (!state.audio) return;
    state.audio.currentTime = time;
    state.currentTime = time;
  };

  const setVolume = (v) => {
    state.volume = v;
    if (state.audio) state.audio.volume = v;
  };

  const stop = () => {
    destroyAudio();
    state.currentSong = null;
    state.isPlaying = false;
    state.currentTime = 0;
    state.duration = 0;

    state.playlist = [];
    state.currentIndex = -1;
  };

  const playPlaylist = async (songs, startIndex = 0) => {
    if (!songs || songs.length === 0) return;

    state.playlist = songs;
    state.currentIndex = startIndex;

    await play(songs[startIndex]);
  };

  const next = async () => {
    if (state.currentIndex + 1 >= state.playlist.length) {
      stop();
      return;
    }

    state.currentIndex++;
    await play(state.playlist[state.currentIndex]);
  };

  const prev = async () => {
  if (state.playlist.length === 0 || state.currentIndex === -1) return
  if (state.currentIndex === 0) return

  state.currentIndex--
  await play(state.playlist[state.currentIndex])
}


  return {
    state,
    play,
    toggle,
    seek,
    setVolume,
    stop,
    playPlaylist,
    next,
    prev
  };
};
