<template>
<div class="flex items-center">
  <input
    type="text"
    :value="amount"
    @input="HandleInput"
    class="inline-flex w-[40px] focus:outline-none
    font-semibold p-1.5 ring-2 ring-tertiary/10
    rounded-l-sm">
  <span
    class="p-2 bg-tertiary/10
    rounded-r-sm select-none font-semibold">
    fetched
  </span>
</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const amount = computed(() => store.state.amountToFetch)
const HandleInput = (e) => store.commit('setAmountToFetch', +e.target.value)

watch(amount, (newValue) => {
  if(+newValue > 0) {
    // commit setAmountToFetch mutation
    store.commit('setAmountToFetch', +newValue)
  } else {
    store.commit('setAmountToFetch', 100)
  }
})
</script>