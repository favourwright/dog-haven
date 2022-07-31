<template>
<div>
  <input
    type="text"
    v-model.number="amount"
    class="inline-flex w-[40px] focus:outline-none
    font-semibold px-2 py-1.5 ring-2 ring-tertiary/10
    rounded-l-lg">
  <span
    class="uppercase p-2 bg-tertiary/10
    rounded-r-lg select-none font-semibold">
    fetched
  </span>
</div>
</template>

<script setup>
import { ref, watch } from 'vue'
const amount = ref(100)
watch(amount, (newValue) => {
  if(newValue > 0) {
    console.log(`${newValue} dogs fetched`)
  } else {
    amount.value = 100
  }
})
</script>