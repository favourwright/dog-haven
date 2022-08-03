<template>
<section
  class="landing bg-tertiary text-white relative overflow-hidden">
  <div class="h-screen flex justify-center items-center">
    <div class="w-96 h-40 bg-white">
      <CarouselControls
        :current="1"
        :slides_count="5" />
    </div>
  </div>
</section>
</template>

<script setup>
import CarouselControls from './CarouselControls.vue';

</script>

<style scoped>
.landing {
  height:calc(100vh - 100px);
  /* display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  padding-bottom: 4vmin;
  width: 100%; */
}
</style>