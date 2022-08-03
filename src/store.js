import { createStore } from 'vuex'
import axios from 'axios'

const state = {
  dogs: [],
  allBreeds: [],
  fetchLimit: 100,
  searchBreed: null,
  fetchingDogs: false,
  fetchingError: false,
  fetchChunks: [],
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
  },
  setFetchChunks(state, chunks) {
    state.fetchChunks = chunks
  }
}

const actions = {
  // fetch dogs from API https://dog.ceo/api/breeds/image/random/50
  fetchRandomDogs({ state, commit, dispatch }, limit) {
    commit('setFetchingDogs', true)
    // maximum returned by api = 50, if limit > 50, use promise.all to fetch more
    // get minimum number of requests to make
    dispatch('chunckFetch', {num:limit, max:50})
    const promises = []
    state.fetchChunks.forEach(chunck => {
      promises.push(axios.get(`https://dog.ceo/api/breeds/image/random/${chunck}`))
    })
    Promise.all(promises)
      .then(responses => {
        const dogs = []
        responses.forEach(response => {
          dogs.push(...response.data.message)
        })
        commit('setDogs', dogs)
        commit('setFetchingDogs', false)
      })
      .catch(error => {
        commit('setFetchingError', true)
        commit('setFetchingDogs', false)
      })
  },
  // fetch related breeds from a given breed
  // https://dog.ceo/api/breed/hound/images/random/100
  fetchByBreed({ commit }, { breed, limit }) {
    commit('setFetchingDogs', true)
    dispatch('chunckFetch', {num:limit, max:50})
    const promises = []
    state.fetchChunks.forEach(chunck => {
      promises.push(axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${chunck}`))
    })
    Promise.all(promises)
      .then(responses => {
        const dogs = []
        responses.forEach(response => {
          dogs.push(...response.data.message)
        })
        commit('setDogs', dogs)
        commit('setFetchingDogs', false)
      })
      .catch(error => {
        commit('setFetchingError', true)
        commit('setFetchingDogs', false)
      })
  },
  // https://dog.ceo/api/breeds/list/all
  fetchAllBreedNames({ commit }) {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        commit('setAllBreeds', response.data.message)
      })
      .catch((error)=>console.log(error))
  },
  // 50 is the maximum images returned by the API
  // so if user requests more than 50, use promise.all to fetch more
  // but get array of how limits are requested to aviod multiple requests
  chunckFetch({ commit }, { num, max }){
    const arr = []
    let i = 0
    while ((i < num) && (num-i >= max)) {
      arr.push(max)
      i += max
    }
    if(num-i <= max && num-i > 0){
      arr.push(num-i)
    }
    commit('setFetchChunks', arr)
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