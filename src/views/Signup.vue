<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="handleSignup">
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
        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
      <p class="mt-4 text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleSignup = async () => {
  try {
    await authService.signup({ email: email.value, password: password.value })
    router.push('/login')
  } catch (error) {
    alert('Signup failed: ' + (error.response?.data?.message || error.message))
  }
}
</script>
