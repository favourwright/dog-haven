<template>
  <main class="w-full h-screen flex px-[6%] justify-center items-center">
    <div>
      <h1 class="text-6xl font-semibold text-gray-300">404: Error</h1>
      <h1 class="text-6xl font-semibold">Did you say <span class="text-primary">fetch</span>?</h1>
      <p class="mt-4 translate-x-1 text-xl text-gray-500">Too bad we couldn't find the it</p>
      <!-- router link that goes back router.go(-1) -->
      <button
        @click="router.go(-1)"
        class="mt-8 bg-tertiary text-white px-4 py-2 translate-x-1 rounded-sm inline-block">
        Go back
      </button>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>