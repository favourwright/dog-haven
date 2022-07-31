<template>
<header
  class="h-16 fixed top-0 left-0 right-0
  flex items-center justify-between px-[6%] z-20
  bg-white/80 backdrop-blur">
  <Logo />
  <GitBadge text="favourwright" link="http://github.com/favourwright" />
  <!-- when user has scrolled beyond a threshold -->
  <!-- teleport the component with search here -->
</header>
</template>

<script setup>
import Logo from './atoms/Logo.vue'
import GitBadge from './atoms/GitBadge.vue'
</script>