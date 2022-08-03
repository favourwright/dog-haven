<template>
<div class="relative min-h-[300px]">
  <Customization class="absolute bottom-[99.9%] z-10" />
  <section class="overflow-hidden text-gray-700">
    <div class="pt-2 px-[6%]">
      <div class="flex flex-wrap md:gap-0 bg-tertiary/10">
        <template v-if="fetchingDogs">
          <CardSkeleton v-for="n in skeletonAmount" :key="n" />
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useRoute } from 'vue-router'

import DogCard from './DogCard.vue'
import Customization from './Customization.vue';
import CardSkeleton from './atoms/CardSkeleton.vue';

const store = useStore()
const route = useRoute()
if (!!route.query.breed) {
  // means a breed was searched before
  // note: we're not making sure the breed exists
  store.commit('setSearchBreed', route.query.breed)
  store.commit('setFetchLimit', route.query.limit)
  store.dispatch('fetchByBreed', { breed: route.query.breed, limit: route.query.limit })
} else {
  store.dispatch('fetchRandomDogs', store.state.fetchLimit) // fetch on created
}
store.dispatch('fetchAllBreedNames') // fetch on created
const dogs = computed(() => store.state.dogs)
const fetchingDogs = computed(() => store.state.fetchingDogs)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isLargeScreen = breakpoints.greater('md')
const skeletonAmount = computed(()=>isLargeScreen.value?3:4)
</script>