<template>
  <div class="carousel">
    <section
      class="w-full md:w-[110%] overflow-hidden">
      <div class="slides flex justify-start items-end flex-row-reverse gap-3">          
        <div
          v-for="(slide,n) in slides" :key="slide.id"
          :class="[(n===0 || n===1)? 'bigger' : '']"
          class="flex-none card w-32 h-48"
          :data-original-index="n"
          :data-original-id="slide.id"
          ref="card">
          <img
            class="w-full h-full object-cover"
            :src='slide.src'
            alt=''>
        </div>
      </div>
    </section>

    <CarouselControls
      @seek="HandleSeek"
      :play="true"
      :duration="5000"
      :current="current"
      :slides_count="6"
      class="px-8 h-16"/>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import CarouselControls from './CarouselControls.vue';
// I could emmit the current slide number to the hero page later

const current = ref(1)
const HandleSeek = (direction) => {
  direction === -1 ? prev() : next()
  console.log(current.value)
}
// calculate current value noting that once we reach the end we start from the beginning
const next = () => {
  current.value = current.value === slides.length ? 1 : current.value + 1
}
const prev = () => {
  current.value = current.value === 1 ? slides.length : current.value - 1
}

const slides = [
  {
    id: '05700d52f4d9',
    src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80'
  },
  {
    id: '5d5d9e9c8b9c',
    src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80'
  },
  {
    id: '5d5d9edddvb9c',
    src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80'
  },
  {
    id: '5ddfbdsnh8b9c',
    src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80'
  },
  {
    id: '5dadfgebvc8bc',
    src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80'
  },
  {
    id: '5d5d8b9cskhdk',
    src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80'
  }
]
const original_card_details = ref([])
const card_details = ref([])
// this ref contains all the card elements
const card = ref(null)
// onMounted(()=>console.log(card.value))

// next(){
//   this.active_index = Math.abs((this.active_index + 1) % this.testimonials.length)
//   // clearing intervals so that autoplaying would reset
//   this.pauseAutoPlay()
//   this.autoPlay()
// },
// prev(){
//   this.active_index = Math.abs((this.active_index - 1) % this.testimonials.length)
//   this.pauseAutoPlay()
//   this.autoPlay()
// },
// seek(index){
//   this.active_index = index
//   this.pauseAutoPlay()
//   this.autoPlay()
// },
// autoPlay(){
//   this.auto_play_interval = setInterval(()=>{
//     this.next()
//   }, this.slide_duration)
// },
// pauseAutoPlay(){
//   clearInterval(this.auto_play_interval)
// },

// width of first & second child are same but different from the rest

const large_card_width = ref(null)
onMounted(()=>large_card_width.value = document.querySelector('.card').getBoundingClientRect().width+'px')
const card_gap = computed(()=>{
  // minus the position of the last card from the position of the first
  const container_size = Math.abs(card_details.value.slice(-1)[0].right - card_details.value[0].right)
  // minus each card width from the container size the divide by the number of cards
  return Math.abs(
    (container_size - card_details.value.reduce(
      (acc, curr)=>acc + curr.width, 0)
    ) / card_details.value.length
  ).toFixed(3)+'px'
})

const CreateIntersectionObserver = (root, target, callback)=>{
  let options = {
    root: document.querySelector(root),
    rootMargin: '0px',
    threshold: [0, 1.0] // only 1.0 is needed to trigger the callback
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
      // update array of cards widths
      card_details.value = [ ...card_details.value, { right, width, ratio, isIntersecting } ]
    })
    // make sure the value is updated only once
    if(original_card_details.value.length === 0){
      original_card_details.value = [ ...card_details.value ]
    }
  })
})
</script>

<style scoped>
/* move container over to hide the first(from the right) element*/
.slides{
  transform: translateX(v-bind(large_card_width))
}

.slides > .card:nth-of-type(1).bigger,
.slides > .card:nth-of-type(2).bigger{
  @apply h-56 w-40
}
</style>