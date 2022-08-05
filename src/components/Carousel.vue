<template>
  <div>
    <section
      class="w-full md:w-[110%] overflow-hidden">
      <div
        class="slides flex justify-start items-end flex-row-reverse gap-3">          
        <div
          v-for="n in 6"
          :key="n"
          class="flex-none card w-32 h-48">
          <img
            class="w-full h-full object-cover"
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
      class="px-8 h-16"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CarouselControls from './CarouselControls.vue';
// I could emmit the current slide number to the hero page later

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

// width of first & second child are different
const card_width = ref('160px')
</script>

<style scoped>
.slides{
  transform: translateX(v-bind(card_width))
}
.slides > .card:nth-of-type(1),
.slides > .card:nth-of-type(2){
  @apply h-56 w-40
}
</style>