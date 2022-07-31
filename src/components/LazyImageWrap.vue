<template>
  <figure ref="target">
    <Image :class="$attrs.class" :source="rendered_source" />
    <slot></slot>
  </figure>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import Image from './atoms/Image.vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
})
const showCaption = inject('showCaption')
const target = ref(null)
const targetIsVisible = ref(false)
const ratio = ref(0)
const { stop } = useIntersectionObserver(
  target,
  ([{intersectionRatio, isIntersecting}], observerElement) => {
    targetIsVisible.value = isIntersecting
    ratio.value = intersectionRatio
  },
  {
    // trigger for each threshold ratio hit
    threshold: [0.1, 0.5, 0.6, 1],
    // make root margin to be more so images would be loaded
    // before they are visible
    rootMargin: '100px'
  }
)

// rendered source url is set when component is intersecting
let rendered_source = ref('')
watch(targetIsVisible, (isVisible) => {
  if (isVisible && rendered_source.value === '') {
    rendered_source.value = props.source
  }
})
watch(ratio, (fullyVisible) =>{
  showCaption.value=fullyVisible>0.9?true:false
})
</script>