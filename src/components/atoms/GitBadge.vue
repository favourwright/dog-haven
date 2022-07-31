<template>
  <div class="flex items-center">
      <img class="w-6 h-6 mx-1" src="/GitHub-Mark-64px.png" alt="github">
      <a class="font-mono text-sm" :href="link">{{username}}</a>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  link: {
    type: String,
    required: true,
  }
})
const username = computed(() => props.link.split('/')[3])
</script>