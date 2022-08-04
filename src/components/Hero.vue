<template>
<section
  class="landing bg-tertiary text-white relative overflow-hidden">
  <div class="min-h-screen flex justify-center items-center">
    <div class="w-[300px]">

      <section
        class="bg-pink-800/50 p-2 w-[110%] overflow-hidden">
        <div class="images flex justify-end gap-3">          
          <div
            v-for="n in 5"
            :key="n"
            class="flex-none image w-32 h-48">
            <img
              src='https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80'
              alt=''>
          </div>
        </div>
      </section>

      <CarouselControls
        @seek="HandleSeek"
        :play="true"
        :duration="3000"
        :current="current"
        :slides_count="5"
        class="px-8 h-16 border-2 border-white/5"/>
      <!-- <button
        class="bg-blue-700 mt-10 p-2 px-4"
        @click="paused=!paused">toggle play</button> -->
    </div>
  </div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import CarouselControls from './CarouselControls.vue';

// const paused = ref(false)
const current = ref(1)
const HandleSeek = (direction) => {
  if (direction === -1) {
    console.log('previous')
    current.value++
  } else {
    console.log('next')
    current.value++
  }
}
</script>

<style scoped>
.landing {
  height:calc(100vh - 100px);
}
</style>