<template>
<section
  class="landing w-full bg-tertiary text-white relative overflow-hidden">
  <div class="h-full flex justify-start items-end">
    <div class="w-full md:w-[500px] bg-pink-800/20">
      <Carousel />
    </div>
  </div>
</section>
</template>
<script setup>
import Carousel from './Carousel.vue';
</script>

<style scoped>
.landing {
  height:calc(100vh - 100px);
}
</style>