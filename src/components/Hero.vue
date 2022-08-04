<template>
<section
  class="landing bg-tertiary text-white relative overflow-hidden">
  <div class="h-screen flex justify-center items-center">
    <div class="w-96 h-40 bg-white">
      <CarouselControls
        @seek="HandleSeek"
        :play="paused"
        :duration="3000"
        :current="1"
        :slides_count="5" />
      <button
        class="bg-blue-700 mt-10 p-2 px-4"
        @click="paused=!paused">toggle play</button>
    </div>
  </div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import CarouselControls from './CarouselControls.vue';

const paused = ref(false)
const HandleSeek = (direction) => {
  if (direction === -1) {
    console.log('previous')
  } else {
    console.log('next')
  }
}
</script>

<style scoped>
.landing {
  height:calc(100vh - 100px);
  /* display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  padding-bottom: 4vmin;
  width: 100%; */
}
</style>