<template>
  <div class="carousel">
    <section
      class="w-full md:w-[110%] overflow-hidden">
      <div class="slides flex justify-start items-end flex-row-reverse gap-3">          
        <div
          v-for="n in slides" :key="n"
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
import { onMounted, ref } from 'vue';
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

const slides = [1,2,3,4,5,6]
// width of first & second child are same but different from the rest
const large_card_width = ref(null)
onMounted(()=>large_card_width.value = document.querySelector('.card').getBoundingClientRect().width+'px')

const card_details = ref([])
// update array of cards widths
const updateCardDetails = detail => {
  card_details.value = [
    ...card_details.value,
    detail
  ]
}
// update -- data-number affter each unshift() & push()

const CreateIntersectionObserver = (root, target, callback)=>{
  let options = {
    root: document.querySelector(root),
    rootMargin: '0px',
    threshold: [0, 1.0]
  }
  let observer = new IntersectionObserver(callback, options)
  document.querySelectorAll(target).forEach(el => observer.observe(el))
}

onMounted(()=>{
  CreateIntersectionObserver('.carousel', '.card', (entries, observer)=>{
    card_details.value=[] // clear previous data
    entries.forEach((entry) => {
      const { right, width } = entry.boundingClientRect
      const ratio = entry.intersectionRatio
      const isIntersecting = entry.isIntersecting 
      updateCardDetails({ right, width, ratio, isIntersecting })
      //   entry.intersectionRect
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    })
    console.log(card_details.value);
  })
})
</script>

<style scoped>
/* move container over to hide the first(from the right) element*/
.slides{
  transform: translateX(v-bind(large_card_width))
}
.slides > .card:nth-of-type(1),
.slides > .card:nth-of-type(2){
  @apply h-56 w-40
}
</style>