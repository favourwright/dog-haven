<template>
<main class="min-h-screen">
  <section class="landing w-full">
    <img
      class="w-full h-full object-cover object-top md:object-center"
      :src="`https://images.dog.ceo/breeds/${breed}/${imgName}.${imgExt}`"
      :alt="`dog breed ${breed}`">
  </section>
  <section>
    Probably whow similary dogs
  </section>
</main>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onActivated } from 'vue'
const router = useRouter()
const route = useRoute()

const imgName = ref(route.params.id)
const imgExt = ref(route.query.ext)
const breed = ref(route.query.breed.split(' ').join('-'))
const breedName = ref(route.query.breed)

onActivated(() => {
  imgName.value = route.params.id
  imgExt.value = route.query.ext
  breed.value = route.query.breed.split(' ').join('-')
  breedName.value = route.query.breed
})
</script>

<style scoped>
.landing{
  height:calc(100vh - 200px);
}
/* change height on tablet upwards */
@media (min-width: 768px) {
  .landing{
    height:calc(100vh - 100px);
  }
}
</style>