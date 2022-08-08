<template>
<main class="min-h-screen">
  <section class="landing w-full relative">
    <img
      class="w-full h-full object-cover object-top md:object-center"
      :src="`https://images.dog.ceo/breeds/${breed}/${imgName}.${imgExt}`"
      :alt="`dog breed ${breed}`">
    <a
      class="absolute bottom-4 right-[6%]
      inline-block p-2 bg-white/80 rounded-sm
      hover:scale-105 transition-all duration-200 ease-in-out"
      :href="`https://images.dog.ceo/breeds/${breed}/${imgName}.${imgExt}`"
      target="_blank" download>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
    </a>
  </section>
  <section class="px-[6%] pt-4">
    <h1 class="text-4xl capitalize">Breed: {{breedName}}</h1>
    <div class="pt-4 text-white">
      <h3 class="text-tertiary text-2xl" v-if="subBreeds.length">Sub-breeds</h3>
      <ul v-if="subBreeds.length" class="flex flex-wrap gap-2">
        <li
          v-for="sub in subBreeds"
          :key="`subBreed-${sub}`"
          :class="[sub === subBreedName?'bg-primary text-tertiary font-semibold':'bg-tertiary']"
          class="px-3 py-1 border-2 border-tertiary">
          {{sub}}
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
const subBreedName = ref(breedName.value.split(' ').slice(-1)[0])
const subBreeds = ref(store.getters.getSubBreeds(breed.value.split('-')[0]))
const breeds = ref(store.getters.getAllBreeds)

// because of keep-alive, we need to manually update the image name
onActivated(() => {
  imgName.value = route.params.id
  imgExt.value = getExt.value
  breed.value = route.query.breed.split(' ').join('-')
  breedName.value = route.query.breed
  subBreedName.value = route.query.breed.split(' ').slice(-1)[0]

  // if allBreeds is empty, get all breeds
  breeds.value = store.getters.getAllBreeds
  if (!breeds.length) {
    store.dispatch('fetchAllBreedNames')
  }
  subBreeds.value = store.getters.getSubBreeds(breed.value.split('-')[0])
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