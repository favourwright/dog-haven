<template>
  <Header />
  <main class="pt-16">
    <RouterView />
  </main>
  <Footer />
</template>

<script setup>
// <RouterLink to="/about">About</RouterLink>
// import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
</script>