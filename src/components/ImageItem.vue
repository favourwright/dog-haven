<template>
  <figure class="image__wrapper">
    <img
      class="image__item"
      alt="random image"
      :data-url="source">
  </figure>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})
</script>