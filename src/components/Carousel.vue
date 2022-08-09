<template>
  <div class="carousel">
    <div class="flex flex-col-reverse">
      <div
        v-for="(card,i) in card_details"
        :key="i"
        :style="card.right<0 ? 'width:0; color: white;' : `width:${card.right}px;`"
        class="h-4 odd:bg-rose-500 even:bg-yellow-500 even:text-black text-xs text-right
        transition-all duration-500 relative
        after:w-[1px] after:bg-white after:absolute after:right-0 after:top-0
        after:h-40 after:z-10">
        {{ card.right }}px;
      </div>      
    </div>
    <section
      class="w-full md:w-[110%] bg-green-500/20 ">
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

const GetElemCurrentDetails = elem => {
  const node_list = typeof(elem)==='string'?document.querySelectorAll(elem):elem
  let details = []
  return ()=>{
    details = [] // clear previous data
    node_list.forEach(node=>{
      details = [...details, {
        left: node.offsetLeft,
        right: node.offsetLeft + node.offsetWidth,
        width: node.offsetWidth,
      }]
    })
    return details
  }
}

// width of first & second child are same but different from the rest
const large_card_width = ref(null)
const slides_container_offset = ref(null)
const card_gap = ref(null)
onMounted(()=>{
  getCurrentCardDetails.value = GetElemCurrentDetails('.card')
  card_details.value = getCurrentCardDetails.value()
  // this value is not updated. used for reference
  original_card_details.value = card_details.value

  card_gap.value = Math.abs(
    card_details.value[1].left - card_details.value[0].left
  ) - card_details.value[0].width

  large_card_width.value = card_details.value[0].width
  slides_container_offset.value = (large_card_width.value+card_gap.value)
  // I shifted the container to the right by slides_container_offset amount
  card_details.value = card_details.value.map((card)=>{
    return {
      left: card.left + slides_container_offset.value,
      right: card.right + slides_container_offset.value,
      width: card.width
    }
  })
})

const HandleSeek = (direction) => direction === -1 ? prev() : next()
// calculate current value noting that once we reach the end we start from the beginning
const next = () => {
  current.value = current.value === slides.length ? 1 : current.value + 1
  move('+', 3000)
}
const prev = () => {
  current.value = current.value === 1 ? slides.length : current.value - 1
  move('-', 3000)
}

const timeoutID = ref(null)
const move = (direction, slide_duration) => {
  if(!!timeoutID.value){ clearTimeout(timeoutID.value) }
  // translate all cards by their width
  cards.value.forEach((card,i) => {
    card.style.transition = `all ${slide_duration}ms ease-in-out`
    // add data-translate value to each
    card.setAttribute("data-left", card_details.value[i].left)
    card.setAttribute("data-right", card_details.value[i].right)

    // card.style.transform = `translateX(${
    //   card_details.value[i-1] ?
    //     card_details.value[i-1].right+'px' : card_details.value[0].right+'px'
    // })`
    // card.style.transform = `translateX(${card_details.value[i].left+card_details.value[i].width}px)`
  })
  timeoutID.value = setTimeout(() => {
    // clear the transition after the transition is over
    cards.value.forEach((card,i) => card.style.transition = '')
    card_details.value = getCurrentCardDetails.value()
    console.log('done');
  }, slide_duration)
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
</script>

<style scoped>
/* move container over to hide the first(from the right) element*/
.slides{
  transform: translateX(v-bind(slides_container_offset+'px'));
  /* transform: translateX(v-bind(large_card_width)) */
}

.slides > .card:nth-of-type(1).bigger,
.slides > .card:nth-of-type(2).bigger{
  @apply h-56 w-40
}
</style>