  <script>
  export default {
    props: {
      user: Object,
      searchState: Object,
      onSearchSubmit: Function,
    },

    data() {
      return {
        showMenu: false,
        keyword: "",
      };
    },

    watch: {
    keyword(newVal) {
      if (!newVal.trim()) return;

      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.onSearchSubmit(newVal);
      }, 400); 
    },
  },

    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },

      logout() {
        this.showMenu = false;
        this.$emit("logout");
      },

      goHome() {
        navigateTo("/");
      },

      goAdmin() {
        navigateTo("/music-management");
      },
    },
  };
</script>

  <template>
    <header class="h-16 bg-black px-6 flex justify-between items-center shrink-0 relative">
      <!-- Logo -->
      <div class="w-9 h-9 rounded-full bg-primary flex items-center justify-center"  @click="goHome">
        <i class="mdi mdi-music text-black text-xl"></i>
      </div>

      <div class="hidden md:flex items-center gap-3">
        <button @click="goHome"
          class="w-10 h-10 rounded-full bg-background-hover flex items-center justify-center hover:bg-white/20 transition"
          title="Home">
          <i class="mdi mdi-home text-white text-2xl"></i>
        </button>
        <div
          class="flex items-center gap-2 bg-background-hover px-4 py-2 rounded-full w-[320px] focus-within:ring-2 focus-within:ring-primary">
          <i class="mdi mdi-magnify text-gray-400 text-xl"></i>

          <input v-model="keyword" type="text" placeholder="What do you want to play?"
            class="bg-transparent outline-none text-sm flex-1 placeholder-gray-400" @keyup.enter="submitSearch" />
        </div>
      </div>

      <div class="relative">
        <button @click="toggleMenu"
          class="flex items-center gap-2 bg-black px-2 py-1 rounded-full hover:bg-white/10 transition">
          <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
            {{ user?.name?.charAt(0) || "U" }}
          </div>
          <i class="mdi mdi-chevron-down"></i>
        </button>

        <!-- Dropdown -->
        <div v-if="showMenu" class="absolute right-0 mt-2 w-48 bg-[#282828] rounded-md shadow-lg overflow-hidden z-50">
          <div class="px-4 py-3 border-b border-white/10">
            <p class="text-sm font-semibold truncate">
              {{ user?.name || "User" }}
            </p>
            <p class="text-xs text-gray-400 truncate">
              {{ user?.email || "-" }}
            </p>
          </div>

          <button class="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition flex items-center gap-2"
            @click="goAdmin">
            <i class="mdi mdi-cog"></i>
            Admin
          </button>
          <div class="border-b border-white/10"></div>
          <button class="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition flex items-center gap-2"
            @click="logout">
            <i class="mdi mdi-logout"></i>
            Logout
          </button>
        </div>
      </div>
    </header>
  </template>
