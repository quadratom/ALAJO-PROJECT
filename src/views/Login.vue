<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1" for="email">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block mb-1" for="password">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
      <p class="mt-4 text-center">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'
import { useUserStore } from './../stores'

const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  try {
    const { data } = await authService.login({ email: email.value, password: password.value })
    userStore.setToken(data.token)
    router.push('/')
  } catch (error) {
    alert('Login failed: ' + (error.response?.data?.message || error.message))
  }
}
</script>
