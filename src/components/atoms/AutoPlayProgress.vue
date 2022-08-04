<template>
  <div class="progress min-h-[1px] min-w-[30px] bg-white/20 relative">
    <div
      class="indicator"
      :class="[play?'running':'paused', {'animate':animate}]"></div>
  </div>
</template>

<script setup>
import { computed,ref,watch } from 'vue';

const props = defineProps({
  play: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number, // milliseconds
    required: true
  },
  current: {
    type: Number,
    default: 0
  }
})
const duration_in_ms = computed(() => props.duration+'ms')
const animate = ref(true)
const current_ = computed(() => props.current)

watch(current_, () => {
  // flash a value of false to animate the indicator
  animate.value = false
  setTimeout(() => animate.value = true, 0)
})
</script>

<style scoped>
.indicator{
  @apply left-0 bg-white absolute top-0 bottom-0;
}
.indicator.animate{
  animation: slide v-bind(duration_in_ms) linear infinite;
}
.indicator.paused{
  animation-play-state: paused;
}
.indicator.running{
  animation-play-state: running;
}
@keyframes slide{
  0%{ left:0; width:0%; }
  50%{ left:0; width:100%; }
  100%{ left:100%; width:0%; }
}
</style>