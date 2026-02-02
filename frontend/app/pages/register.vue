<script lang="js">
definePageMeta({
  layout: 'auth'
})

export default {
  layout: 'auth',

  data() {
    return {
      showDialog: false,
      dialogType: 'success',
      dialogTitle: '',
      dialogMessage: '',
      name: '',
      email: '',
      password: '',
      showPassword: false
    }
  },

  methods: {
    async handleRegister() {
      try {
        const { register } = useAuth()
        await register({
          name: this.name,
          email: this.email,
          password: this.password
        })

        this.dialogType = 'success'
        this.dialogTitle = 'Success'
        this.dialogMessage = 'Account created successfully'
        this.showDialog = true
      } catch (err) {
        this.dialogType = 'error'
        this.dialogTitle = 'Error'
        this.dialogMessage = 'Registration failed'
        this.showDialog = true
      }
    }
  }
}
</script>


<template>
  <div class="w-full max-w-md bg-background-main p-8 rounded-lg shadow-lg">

    <!-- Title -->
    <div class="text-center mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-white">
        Create account
      </h1>
      <p class="text-sm text-gray-400 mt-1">
        Join and start listening
      </p>
    </div>

    <!-- Form -->
    <div class="space-y-4">
      <div>
        <label class="block text-sm text-gray-400 mb-1">
          Name
        </label>
        <input v-model="name" placeholder="Your name" class="w-full px-4 py-3 rounded-md bg-[#121212] text-white
                   border border-[#2a2a2a]
                   focus:outline-none focus:border-green-500" />
      </div>

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

          <!-- eye button -->
          <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2
             text-gray-400 hover:text-white transition">
            <i :class="showPassword ? 'mdi mdi-eye-off-outline' : 'mdi mdi-eye-outline'" class="text-xl"></i>
          </button>
        </div>
      </div>


      <button @click="handleRegister" class="w-full mt-2 py-3 rounded-full
                 bg-green-500 hover:bg-green-400
                 text-black font-semibold
                 transition active:scale-95">
        Sign Up
      </button>
    </div>

    <!-- Footer -->
    <div class="text-center mt-6 text-sm text-gray-400">
      Already have an account?
      <NuxtLink to="/login" class="text-green-500 hover:underline">
        Log in
      </NuxtLink>
    </div>

    <PopupDialog v-model="showDialog" :type="dialogType" :title="dialogTitle" :message="dialogMessage" />

  </div>
</template>
