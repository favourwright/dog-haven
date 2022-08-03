<template>
  <div
    @click="paused=!paused"
    class="w-full bg-pink-800 h-10 flex gap-6
    justify-center items-center select-none">
    <div
      class="w-full flex gap-4 justify-center items-center
      px-6">
      <template v-if="slides_count>1">
        <div class="">0{{current}}</div>
        <div class="order-last">0{{slides_count}}</div>
      </template>
      <AutoPlayProgress
        class="w-full"
        :play="paused"
        :duration="3000" />
    </div>
    <div
      class="seek pr-6 flex gap-[1px] justify-center items- h-full">
      <button class="bg-pink-500 px-3 flex items-center">[</button>
      <button class="bg-pink-500 px-3 flex items-center">]</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AutoPlayProgress from './atoms/AutoPlayProgress.vue';

const props = defineProps({
  slides_count:{
    type: Number,
    required: true
  },
  current: {
    type: Number,
    default: 1
  }
})

const paused = ref(false)
</script>

<style scoped>

</style>