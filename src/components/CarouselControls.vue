<template>
  <div
    class="w-full bg-pink-800 h-10 flex gap-6
    justify-center items-center select-none">
    <div class="w-full flex gap-4 justify-center items-center px-4">
      <template v-if="slides_count>1">
        <div class="">0{{current}}</div>
        <div class="order-last">0{{slides_count}}</div>
      </template>
      <AutoPlayProgress
        class="w-full h-[2px]"
        :play="play"
        :duration="duration" />
    </div>
    <div class="seek pr-6 flex justify-center items- h-full">
      <button
        @click="emit('seek', -1)"
        class="px-1 flex items-center">
        <svg
          class="w-4 h-4 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/>
        </svg>
      </button>
      <button
        @click="emit('seek', 1)"
        class="px-4 flex items-center">
        <svg
          class="w-4 h-4 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import AutoPlayProgress from './atoms/AutoPlayProgress.vue';

const emit = defineEmits({
  seek: {
    type: Number,
    default: 0
  }
})
const props = defineProps({
  slides_count:{
    type: Number,
    required: true
  },
  current: {
    type: Number,
    default: 1
  },
  play: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number, // milliseconds
    required: true
  }
})
</script>