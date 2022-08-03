<template>
<section
  @click="paused=!paused"
  class="landing bg-tertiary text-white relative overflow-hidden">
  <div class="h-screen flex justify-center items-center">
    <AutoPlayProgress :play="paused" :duration="1000" />
  </div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import AutoPlayProgress from './atoms/AutoPlayProgress.vue';

const paused = ref(false)
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