<template>
<div class="flex items-center">
  <input
    type="text"
    :value="limit"
    @input="HandleInput"
    @blur="HandleBlur"
    class="inline-flex w-[40px] focus:outline-none
    font-semibold p-1.5 ring-2 ring-primary/40
    rounded-l-sm">
  <span
    class="p-2 bg-primary/40
    rounded-r-sm select-none font-semibold">
    {{!fetchingDogs?'Per-page':'Fetching...'}}
  </span>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const limit = computed(() => store.state.fetchLimit)
const fetchingDogs = computed(() => store.state.fetchingDogs)
const HandleInput = (e) => store.commit('setFetchLimit', +e.target.value)

const HandleBlur = () => {
  if(+limit.value > 0) {
    store.commit('setFetchLimit', +limit.value)
  } else {
    store.commit('setFetchLimit', 100)
  }
}
</script>