<template>
<main class="min-h-screen">
  <section class="landing w-full">
    <img
      class="w-full h-full object-cover object-top md:object-center"
      :src="`https://images.dog.ceo/breeds/${breed}/${imgName}.${imgExt}`"
      :alt="`dog breed ${breed}`">
  </section>
  <section class="px-[6%] pt-4">
    <h1 class="text-4xl capitalize">Breed: {{breedName}}</h1>
    <div class="pt-4 text-white">
      <h3 class="text-tertiary text-2xl" v-if="!!subBreed">Sub-breeds</h3>
      <ul v-if="!!subBreed" class="space-y-2">
        <li
          v-for="breed in subBreed"
          :key="`subBreed${breed}`"
          class="bg-tertiary px-3 py-1">
          {{breed}}
        </li>
      </ul>
      <p class="px-3 py-1 bg-tertiary" v-else>No sub-breeds for {{breedName}}</p>
    </div>
  </section>
  <section class="px-[6%]">
    <!-- Probably whow similary dogs -->
  </section>
</main>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onActivated } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const getExt = computed(() => !!route.query.ext? route.query.ext : 'jpg')
const imgName = ref(route.params.id)
const imgExt = ref(getExt.value)
const breed = ref(route.query.breed.split(' ').join('-'))
const breedName = ref(route.query.breed)
let subBreed = store.getters.getSubBreeds(breed.value.split('-')[0])
let breeds = store.getters.getAllBreeds

// because of keep-alive, we need to manually update the image name
onActivated(() => {
  imgName.value = route.params.id
  imgExt.value = getExt.value
  breed.value = route.query.breed.split(' ').join('-')
  breedName.value = route.query.breed

  // if allBreeds is empty, get all breeds
  breeds = store.getters.getAllBreeds
  if (!breeds.length) {
    store.dispatch('fetchAllBreedNames')
  }
  subBreed = store.getters.getSubBreeds(breed.value.split('-')[0])
  // console.log(subBreed);
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