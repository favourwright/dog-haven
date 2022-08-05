<template>
  <div
    class="w-full min-h-[40px] flex gap-6
    justify-center select-none">
    <div class="w-full flex gap-4 justify-center items-center pr-4">
      <template v-if="slides_count>1">
        <div class="">0{{current}}</div>
        <div class="order-last">0{{slides_count}}</div>
      </template>
      <AutoPlayProgress
        class="w-full"
        :current="current"
        :play="play"
        :duration="duration" />
    </div>
    <div class="seek flex justify-center items-center">
      <button
        @click="emit('seek', -1)"
        class="px-2 flex items-center h-full hover:bg-white/5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        @click="emit('seek', 1)"
        class="px-2 flex items-center h-full hover:bg-white/5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
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