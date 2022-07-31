<template>
<div class="relative min-h-[300px]">
  <Customization class="absolute bottom-full z-10" />
  <section class="overflow-hidden text-gray-700">
    <div class="pt-2 px-[6%]">
      <div class="flex flex-wrap md:gap-0 bg-tertiary/10 rounded-2xl">
        <h1 class="text-xl text-red-500" v-if="fetchingDogs">fetching</h1>
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
store.dispatch('fetchRandomDogs', store.state.amountToFetch) // fetch on created
store.dispatch('fetchAllBreedNames') // fetch on created
const dogs = computed(() => store.state.dogs)
const fetchingDogs = computed(() => store.state.fetchingDogs)
</script>