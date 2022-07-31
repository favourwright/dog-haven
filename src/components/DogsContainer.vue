<template>
<div class="relative min-h-[300px]">
  <Customization class="absolute bottom-full z-10" />
  <section class="overflow-hidden text-gray-700">
    <div class="pt-2 px-[6%]">
      <div class="flex flex-wrap md:gap-0 bg-tertiary/10 rounded-2xl">
        <DogCard
          v-for="(dog,i) in dogs"
          :key="`dog-${i}`"
          :source="dog" />
      </div>
    </div>
  </section>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import DogCard from './DogCard.vue'
import Customization from './Customization.vue';

const store = useStore()
store.dispatch('fetchRandomDogs') // fetch on created
store.dispatch('fetchAllBreeds') // fetch on created
const dogs = computed(() => store.state.dogs)
</script>