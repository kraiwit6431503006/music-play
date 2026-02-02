<script lang="js">
definePageMeta({
  layout: 'auth'
})

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  },

  methods: {
    async handleLogin() {
      const { login } = useAuth()
      await login({
        email: this.email,
        password: this.password
      })
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<template>
  <div class="w-full max-w-md bg-background-main p-8 rounded-lg shadow-lg">

    <!-- Logo / Title -->
    <div class="text-center mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-white">
        Welcome back
      </h1>
      <p class="text-sm text-gray-400 mt-1">
        Login to Music Play
      </p>
    </div>

    <!-- Form -->
    <div class="space-y-4">
      <div>
        <label class="block text-sm text-gray-400 mb-1">
          Email
        </label>
        <input v-model="email" type="email" placeholder="you@email.com" class="w-full px-4 py-3 rounded-md bg-[#121212] text-white
                   border border-[#2a2a2a]
                   focus:outline-none focus:border-green-500" />
      </div>

      <div>
        <label class="block text-sm text-gray-400 mb-1">
          Password
        </label>

        <div class="relative">
          <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="w-full px-4 py-3 pr-12 rounded-md bg-[#121212] text-white
             border border-[#2a2a2a]
             focus:outline-none focus:border-green-500" />

          <!-- eye icon -->
          <button type="button" @click="togglePassword" class="absolute right-3 top-1/2 -translate-y-1/2
             text-gray-400 hover:text-white transition">
            <i :class="showPassword ? 'mdi mdi-eye-off-outline' : 'mdi mdi-eye-outline'" class="text-xl"></i>
          </button>
        </div>
      </div>


      <button @click="handleLogin" class="w-full mt-2 py-3 rounded-full
                 bg-primary hover:bg-primaryHover
                 text-black font-semibold
                 transition active:scale-95">
        Log In
      </button>
    </div>

    <!-- Footer -->
    <div class="text-center mt-6 text-sm text-gray-400">
      Don’t have an account?
      <NuxtLink to="/register" class="text-primary hover:underline">
        Sign up
      </NuxtLink>
    </div>
  </div>
</template>
