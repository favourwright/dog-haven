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
          ref="cards">
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
const original_card_details = ref([])
const card_details = ref([])
const getCurrentCardDetails = ref(null)
// this ref contains all the card elements
const cards = ref(null)
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

const card_gap = computed(()=>{
  // minus the position of the last card from the position of the first
  const container_size = Math.abs(card_details.value.slice(-1)[0].left - card_details.value[0].left)
  // minus each card width from the container size the divide by the number of cards
  return Math.ceil(Math.abs(
    (container_size - card_details.value.reduce(
      (acc, curr)=>acc + curr.width, 0)
    ) / card_details.value.length
  )).toFixed(3)
})

const HandleSeek = (direction) => {
  direction === -1 ? prev() : next()
}
// calculate current value noting that once we reach the end we start from the beginning
const next = () => {
  current.value = current.value === slides.length ? 1 : current.value + 1
  move('+', 3000)
}
const prev = () => {
  current.value = current.value === 1 ? slides.length : current.value - 1
  move('-', 3000)
}
const time_out = ref(false)
const move = (direction, slide_duration) => {
  if(!!time_out.value){ time_out.value = clearTimeout(time_out.value);console.log('clearing'); }
  // translate all cards by their width
  cards.value.forEach((card,i) => {
    card.style.transition = `all ${slide_duration}ms ease-in-out`
    // card.style.transform = `translateX(calc((100% + ${card_gap.value}px) * ${direction}1))`
    card.style.transform = `translateX(${+(direction+1) * (card_details.value[i].width + +card_gap.value)}px)`
    time_out.value = setTimeout(() => {
      // clear the transition after the transition is over
      console.log('done');
    }, slide_duration)
  })
  card_details.value = getCurrentCardDetails.value()
  console.log('card_details', card_details.value);
}

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

const GetElemCurrentDetails = elem => {
  const node_list = typeof(elem)==='string'?document.querySelectorAll(elem):elem
  let details = []
  return ()=>{
    details = [] // clear previous data
    node_list.forEach(node=>{
      const rect = node.getBoundingClientRect()
      details = [...details, {
        left:rect.left,
        width:rect.width,
      }]
    })
    return details
  }
}

const large_card_width = ref(null)
onMounted(()=>{
  getCurrentCardDetails.value = GetElemCurrentDetails('.card')
  large_card_width.value = getCurrentCardDetails.value()[0].width+'px'
  card_details.value = getCurrentCardDetails.value()
  // this value is not updated. used for reference
  original_card_details.value = getCurrentCardDetails.value()
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