<template>
<footer class="px-[6%] py-10 flex justify-center items-center">
  <span class="pr-2 flex items-center gap-1">with <span class="text-red-500 text-xl">&#9829;</span> by:</span>
  <GitBadge text="favourwright/dog-haven" link="https://github.com/favourwright/dog-haven" />
</footer>
</template>

<script setup>
import GitBadge from './atoms/GitBadge.vue';
</script>