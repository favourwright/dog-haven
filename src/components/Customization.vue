<template>
<section class="flex flex-col items-start w-full px-[6%]">
  <div
    class="bg-white w-full relative
    before:absolute before:right-[99%] before:top-0 before:-z-10
    before:h-full before:w-[4%] before:md:w-[3%] before:bg-white
    after:absolute after:left-[99%] after:top-0 after:-z-10
    after:h-full after:w-[4%] after:md:w-[3%] after:bg-white">
    <div
      class="h-full w-full rounded-2xl
      flex justify-between items-center py-4">
      <AmountFetched />
      <Search />
    </div>
    <div class="mb-2 flex justify-between items-center">
      <button class="px-2 py-1 rounded-sm bg-tertiary text-white">
        Random fetch
      </button>
      <span>Showing: <strong>{{ !!searchBreed ? searchBreed : 'all'  }}</strong></span>
    </div>
  </div>
</section>
</template>

<script setup>
import Search from './Search.vue'
import AmountFetched from './atoms/FetchLimit.vue'
import { watch, computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const breedSearched = ref('all')
const searchBreed = computed(() => store.state.searchBreed)
</script>