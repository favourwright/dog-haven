import { createStore } from 'vuex'
import axios from 'axios'

const state = {
  dogs: [],
  allBreeds: [],
  fetchLimit: 100,
  searchBreed: null,
  fetchingDogs: false,
  fetchingError: false,
}

const mutations = {
  setDogs(state, dogs) {
    state.dogs = dogs
  },
  setAllBreeds(state, breeds) {
    state.allBreeds = breeds
  },
  setFetchLimit(state, limit) {
    state.fetchLimit = limit
  },
  setSearchBreed(state, breed) {
    state.searchBreed = breed
  },
  setFetchingDogs(state, fetching) {
    state.fetchingDogs = fetching
  },
  setFetchingError(state, error) {
    state.fetchingError = error
  }
}

const actions = {
  // fetch dogs from API https://dog.ceo/api/breeds/image/random/50
  fetchRandomDogs({ commit }, limit) {
    commit('setFetchingDogs', true)
    // maximum returned by api = 50, if limit > 50, use promise.all to fetch more
    if (limit > 50) {
      const promises = []
      for (let i = 0; i < limit; i++) {
        promises.push(axios.get('https://dog.ceo/api/breeds/image/random'))
      }
      Promise.all(promises)
        .then(responses => {
          const dogs = []
          responses.forEach(response => {
            dogs.push(response.data.message)
          })
          commit('setDogs', dogs)
          commit('setFetchingDogs', false)
        })
        .catch(error => {
          commit('setFetchingError', true)
          commit('setFetchingDogs', false)
        })
    } else {
      axios.get(`https://dog.ceo/api/breeds/image/random/${limit}`)
        .then(response => {
          commit('setDogs', response.data.message)
          commit('setFetchingDogs', false)
        })
        .catch((error)=>{
          commit('setFetchingDogs', false)
          commit('setFetchingError', true)
        })
    }
  },
  // fetch related breeds from a given breed
  // https://dog.ceo/api/breed/hound/images/random/100
  fetchByBreed({ commit }, { breed, limit }) {
    commit('setFetchingDogs', true)
    axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${limit}`)
      .then(response => {
        commit('setDogs', response.data.message)
        commit('setFetchingDogs', false)
      })
      .catch((error)=>{
        commit('setFetchingDogs', false)
        commit('setFetchingError', true)
      })
  },
  // https://dog.ceo/api/breeds/list/all
  fetchAllBreedNames({ commit }) {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        commit('setAllBreeds', response.data.message)
      })
      .catch((error)=>console.log(error))
  }
}

const getters = {
  getAllBreeds(state) {
    return state.allBreeds
  },
  // given a breed, return its subbreeds
  // const breeds = computed(()=>Object.entries(store.state.allBreeds).map(([key, value]) => key))
  getSubBreeds(state) {
    return breed => {
      return !!state.allBreeds[breed] ? state.allBreeds[breed] : []
    }
  }
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})