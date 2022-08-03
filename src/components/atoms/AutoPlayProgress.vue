<template>
  <div class="progress min-h-[1px] min-w-[30px] bg-white/20 relative">
    <div class="indicator" :class="[play?'running':'paused']"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  play: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number, // milliseconds
    required: true
  }
})
const duration_in_ms = computed(() => props.duration+'ms')
</script>

<style scoped>
.indicator{
  @apply left-0 bg-white absolute top-0 bottom-0;
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