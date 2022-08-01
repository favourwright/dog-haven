<template>
<div class="relative min-h-[300px]">
  <Customization class="absolute bottom-[99.9%] z-10" />
  <section class="overflow-hidden text-gray-700">
    <div class="pt-2 px-[6%]">
      <div class="flex flex-wrap md:gap-0 bg-tertiary/10 rounded-2xl">
        <template v-if="fetchingDogs">
          <CardSkeleton v-for="n in 3" :key="n" />
        </template>
        <template v-else>
          <DogCard
            v-for="dog in dogs"
            :key="dog"
            :source="dog" />
        </template>
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
import CardSkeleton from './atoms/CardSkeleton.vue';

const store = useStore()
store.dispatch('fetchRandomDogs', store.state.fetchLimit) // fetch on created
store.dispatch('fetchAllBreedNames') // fetch on created
const dogs = computed(() => store.state.dogs)
const fetchingDogs = computed(() => store.state.fetchingDogs)
</script>