<template>
  <main>    
    <ImageItem
      class="min-h-screen"
      v-for='(dog,i) in dogs'
      :key='i'
      :source='dog' />
  </main>
</template>
<script setup>
import { computed } from 'vue'
import ImageItem from '../components/LazyImageWrap.vue'
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('fetchRandomDogs') // fetch on created
const dogs = computed(() => store.state.dogs)
</script>