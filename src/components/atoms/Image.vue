<template>
  <div class="relative" :class="$attrs.class">
    <CardSkeleton style="width:100%" v-if="!source_available && isLoading" />
    <img v-if="source_available && !isLoading" :class="$attrs.class" :src="source">
    <img
      v-if="source_available"
      :src="source"
      :class="img_name"
      class="h-0 w-0">
  </div>
</template>

<script setup>
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

// using regexp replace all symbols and keep only text
const img_name = computed(() => src.value.replace(/[^a-zA-Z0-9]/g, ''))

const unwatch = watch(src, (new_source) => {
  if(new_source!==''){
    source_available.value = true
    isLoadingHandler()
  }
}, { immediate: true })

const isLoadingHandler = () => {
  // run in nextTick because of errors in console
  Promise.resolve().then(() => {
    const fake = document.querySelector(`.${img_name.value}`)
    fake.addEventListener('load', () => {
      console.log('loaded: '+img_name.value);
      isLoading.value = false
      unwatch() // cleanup
    })
  })
}
</script>