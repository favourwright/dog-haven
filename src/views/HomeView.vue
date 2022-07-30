<template>
  <main>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>

    <div class="h-screen">
      shakelle
    </div>
    <div class="h-screen">
      shakelle
    </div>
  
    <ImageItem source="https://place.dog/300/200"/>
  </main>
</template>
    <!-- v-if="article.urlToImage"
    :source="article.urlToImage" -->
<script setup>
import ImageItem from '../components/LazyImageWrap.vue'
import { useStore } from 'vuex'
const store = useStore()
</script>