<template>
  <main>
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  </main>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()

console.log(store.state.count)
</script>