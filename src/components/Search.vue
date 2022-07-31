<template>
<div class="flex justify-center relative select-none">
  <div
    v-show="searchable && rendered_breed_hint.length"
    class="hint absolute bottom-full mb-4 overflow-y-auto
    w-full max-h-80 backdrop-blur border-2
    border-primary/50 rounded-xl">
    <ul>
      <li
        v-for="(breed,i) in rendered_breed_hint"
        :key="`breed-${i}`"
        @click="HandleHintClicks(breed)"
        class="last-of-type:rounded-b-xl first-of-type:rounded-t-xl
        bg-primary/10 py-1.5 px-4 even:bg-primary/20">
        {{breed}}
      </li>
    </ul>
  </div>
  <div class="xl:w-96">
    <div
      class="input-group relative flex items-stretch w-full rounded-xl">
      <input
        v-model="searchQuery"
        @keyup.enter="HandleSearch(true)"
        type="search"
        class="relative flex-auto min-w-0 block w-full
        placeholder-tertiary focus:placeholder-slate-300
        px-3 py-1.5 text-base font-normal text-tertiary bg-tertiary/50
        bg-clip-padding border-none rounded-l-xl transition ease-in-out
        m-0 focus:text-white focus:bg-tertiary focus:outline-none"
        placeholder="Search breeds" aria-label="Search breeds" aria-describedby="button-addon2">
      <span
        @click="HandleSearch(true)"
        :class="[searchable?'bg-tertiary/80 text-white':'bg-tertiary/10 text-tertiary/20']"
        class="input-group-text flex items-center px-3 py-1.5 text-base rounded-r-xl
        font-normal text-center whitespace-nowrap transition-all duration-300"
        id="basic-addon2">
        <svg
          aria-hidden="true" focusable="false" data-prefix="fas"
          data-icon="search" class="w-4" role="img"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </span>
    </div>
  </div>
</div>
</template>

<script setup>
import { useDebounceFn } from '@vueuse/core'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

let searchQuery = ref('')
let searchable = ref(false)
const store = useStore()
const breeds = computed(()=>Object.entries(store.state.allBreeds).map(([key, value]) => key))

watch(searchQuery, (val) => {
  if (val.length > 0) {
    searchable.value = true
    // when user is typing, debounce and call HandleSearch
    debouncedFn()
  } else {
    searchable.value = false
  }
})
const rendered_breed_hint = ref([])
const HandleSearch = (manual=false) =>{
  // filter/search through local dogs list using searchQuery
  const filtered_breeds = breeds.value.filter(breed => breed.toLowerCase().includes(searchQuery.value.toLowerCase()))
  if (filtered_breeds.length > 0) {
    rendered_breed_hint.value = filtered_breeds
    if(manual){
      searchQuery.value = ''
    }
    // if any matches, make the api reqeust
  } else {
    // not found
    rendered_breed_hint.value = breeds.value
  }
}
const HandleHintClicks = (breed) => {
  // when user clicks on a hint, set searchQuery to the breed and call HandleSearch
  searchQuery.value = breed
  HandleSearch()
  rendered_breed_hint.value = []
  searchQuery.value = ''
}
const debouncedFn = useDebounceFn(HandleSearch, 1000)    
</script>