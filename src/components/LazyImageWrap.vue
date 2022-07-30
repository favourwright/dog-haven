<template>
  <figure ref="target">
    <Image :source="rendered_source" />
    {{targetIsVisible}}
  </figure>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import Image from './atoms/Image.vue'

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
  // { rootMargin: '300px' }
)

// rendered source url is set when component is intersecting
let rendered_source = ref('')
watch(targetIsVisible, (isVisible) => {
  if (isVisible) {
    rendered_source.value = props.source
    // stop observing if its been visible once
    // this means the source image is loaded
    // and we don't need to observe it anymore
    // stop()
  }
})
</script>