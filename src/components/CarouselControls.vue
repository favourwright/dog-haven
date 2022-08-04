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
        class="w-full"
        :play="play"
        :duration="duration" />
    </div>
    <div
      class="seek pr-6 flex justify-center items- h-full">
      <!-- emit seek event -->
      <button
        @click="emit('seek', -1)"
        class="px-4 flex items-center">[</button>
      <button
        @click="emit('seek', 1)"
        class="px-4 flex items-center">]</button>
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

<style scoped>

</style>