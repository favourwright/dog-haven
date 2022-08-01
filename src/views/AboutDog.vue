<template>
<main class="min-h-screen">
  <section class="landing w-full">
    <img
      class="w-full h-full object-cover object-top"
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
import { ref, computed, onActivated } from 'vue'
const router = useRouter()
const route = useRoute()

const getExt = computed(() => !!route.query.ext? route.query.ext : 'jpg')
const imgName = ref(route.params.id)
const imgExt = ref(getExt.value)
const breed = ref(route.query.breed.split(' ').join('-'))
const breedName = ref(route.query.breed)

// because of keep-alive, we need to manually update the image name
onActivated(() => {
  imgName.value = route.params.id
  imgExt.value = getExt.value
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