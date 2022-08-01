<template>
  <div
    class="card flex flex-wrap w-1/2 md:w-1/3">
    <div class="w-full p-1 md:p-2 relative">
      <LazyImage
        alt="gallery"
        class="block object-cover object-center w-full h-52 md:h-96
        rounded-xl md:rounded-lg relative overflow-hidden transition duration-300"
        :source='source'>
        <figcaption
          :class="{'show':showCaption}"
          class="flex justify-between absolute bottom-0 left-0 right-0
          transform translate-y-full transition-all duration-300
          bg-primary/10 text-white backdrop-blur-sm min-h-[50px]
          p-2 px-4 font-bold text-lg capitalize">
          <h2 class="name block">{{breedName}}</h2>
          <ViewMore>
            woof<span class="text-white/50">x2</span>
          </ViewMore>
        </figcaption>
      </LazyImage>
      <RouterLink
        :to="`view/${imageName}`"
        :query="{extension: imageExt, breed: breedName}"
        class="absolute top-0 left-0 right-0 bottom-0" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import { RouterLink } from 'vue-router'
import LazyImage from './LazyImageWrap.vue'
import ViewMore from './atoms/ViewMore.vue';

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
})
let showCaption = ref(false)
provide('showCaption', showCaption)
// https://images.dog.ceo/breeds/brabancon/n02112706_1418.jpg
const breedName = computed(() => props.source.split('/')[4].split('_')[0].replace(/-/gi, ' '))
const image = computed(() => props.source.split('/').slice(-1)[0])
const imageName = computed(() => image.value.split('.')[0])
const imageExt = computed(() => image.value.split('.')[1])
</script>

<style scoped>
:global(.card:hover img) {
  @apply scale-110
}
.card:hover button{
  @apply block;
  animation: pulse 800ms;
}
/* keyframe pulse animation x2 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.name{
  text-shadow:
    -0.5px -0.5px 0 rgb(0, 0, 0),
    0.5px -0.5px 0 rgb(0, 0, 0),
    -0.5px 0.5px 0 rgb(0, 0, 0),
    0.5px 0.5px 0 rgb(0, 0, 0);
}
.card:hover .name{
  @apply hidden md:block;
}
.show{
  @apply translate-y-0;
}
</style>