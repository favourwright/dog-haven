<template>
<header
  class="h-16 fixed top-0 left-0 w-full
  flex items-center justify-between px-[6%] z-20
  bg-white/80 backdrop-blur">
  <Logo />
  <GitBadge text="favourwright" link="http://github.com/favourwright" />
</header>
</template>

<script setup>
import Logo from './atoms/Logo.vue'
import GitBadge from './atoms/GitBadge.vue'
</script>