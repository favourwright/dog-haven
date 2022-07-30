<template>
  <span v-if="isLoading">Loading</span>
  <img  v-else :src="source">
</template>

<script setup>
import { useImage } from '@vueuse/core'

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
})
const { isLoading } = useImage({ src: props.source })
</script>