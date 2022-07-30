<template>
<header
  class="h-16 fixed top-0 left-0 right-0
  flex items-center px-[6%] bg-white/10 backdrop-blur-sm">
  <Logo />
  <!-- when user has scrolled beyond a threshold -->
  <!-- teleport the component with search here -->
</header>
</template>

<script setup>
import Logo from './atoms/Logo.vue'
</script>