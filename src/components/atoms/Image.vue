<template>
  <CardSkeleton v-if="isLoading" />
  <img :class="$attrs.class" v-else :src="source">
</template>

<script setup>
import { useImage } from '@vueuse/core'
import CardSkeleton from './CardSkeleton.vue';

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
})
const { isLoading } = useImage({ src: props.source })
</script>