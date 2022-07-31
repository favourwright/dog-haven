<template>
<section class="flex flex-col items-start w-full px-[6%]">
  <div
    class="h-full w-full rounded-2xl
    flex justify-between items-center pb-4 px-2">
    <AmountFetched />
    <Search />
  </div>
  <button class="ml-2 mb-2 px-2 py-1 rounded-md bg-blue-300">Random fetch</button>
</section>
</template>

<script setup>
import Search from './Search.vue';
import AmountFetched from './atoms/AmountFetched.vue';
</script>