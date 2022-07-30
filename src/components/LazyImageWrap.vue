<template>
  <figure ref="target">
    <Image :source="render_source" />
  </figure>
  {{targetIsVisible}}
</template>

<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import Image from './Image.vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
})

const target = ref(null)
const targetIsVisible = ref(false)
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
    console.log(isIntersecting);
  },
  // make root margin to be more so images would be loaded
  // before they are visible
  { rootMargin: '300px' }
)

// rendered source url is set when component is intersecting
let render_source = ref('')
watch(targetIsVisible, (isVisible) => {
  if (isVisible) {
    render_source.value = props.source
  }
})
</script>