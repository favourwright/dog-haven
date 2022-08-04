<template>
  <CardSkeleton style="width:100%" v-if="!source_available && isLoading" />
  <img :class="$attrs.class" v-else :src="source">
</template>

<script setup>
import { useImage } from '@vueuse/core'
import { computed, ref, watch } from 'vue';
import CardSkeleton from './CardSkeleton.vue';

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
})

const src = computed(() => props.source)
const source_available = ref(false)
const isLoading = ref(true)
const unwatch = watch(src, (new_source) => {
  if(new_source!==''){
    source_available.value = true
    isLoading.value = useImage({src: new_source}).isLoading
    unwatch() // cleanup
  }
}, { immediate: true })
</script>