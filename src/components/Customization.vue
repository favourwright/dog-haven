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
    <button class="mb-2 px-2 py-1 rounded-sm bg-tertiary text-white">Random fetch</button>
  </div>
</section>
</template>

<script setup>
import Search from './Search.vue';
import AmountFetched from './atoms/FetchLimit.vue';
</script>