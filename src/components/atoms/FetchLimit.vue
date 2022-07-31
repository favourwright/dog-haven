<template>
<div class="flex items-center">
  <input
    type="text"
    :value="limit"
    @input="HandleInput"
    class="inline-flex w-[40px] focus:outline-none
    font-semibold p-1.5 ring-2 ring-tertiary/10
    rounded-l-sm">
  <span
    class="p-2 bg-tertiary/10
    rounded-r-sm select-none font-semibold">
    {{fetchingDogs?'fetched':status}}
  </span>
</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const limit = computed(() => store.state.fetchLimit)
const fetchingDogs = computed(() => store.state.fetchingDogs)
const HandleInput = (e) => store.commit('setFetchLimit', +e.target.value)
const status = ref('fetched')

watch(limit, (newValue) => {
  if(+newValue > 0) {
    status.value = 'to be fetched'
    store.commit('setFetchLimit', +newValue)
  } else {
    store.commit('setFetchLimit', 100)
  }
})
</script>