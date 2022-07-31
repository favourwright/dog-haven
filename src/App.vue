<template>
  <Header />
  <main class="pt-16">
    <RouterView />
  </main>
</template>

<script setup>
// <RouterLink to="/about">About</RouterLink>
// import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>