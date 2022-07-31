import { createStore } from 'vuex'
import axios from 'axios'

const state = {
  dogs: [],
  allBreeds: [],
}

const mutations = {
  setDogs(state, dogs) {
    state.dogs = dogs
  },
  setAllBreeds(state, breeds) {
    state.allBreeds = breeds
  }
}

const actions = {
  // fetch dogs from API https://dog.ceo/api/breeds/image/random/100
  fetchRandomDogs({ commit }) {
    axios.get('https://dog.ceo/api/breeds/image/random/10')
      .then(response => {
        commit('setDogs', response.data.message)
      })
      .catch((error)=>console.log(error))
  },
  // fetch related breeds from a given breed
  // https://dog.ceo/api/breed/hound/images
  fetchByBreed({ commit }, breed) {
    axios.get(`https://dog.ceo/api/breed/${breed}/images`)
      .then(response => {
        commit('setDogs', response.data.message)
      })
      .catch((error)=>console.log(error))
  },
  // https://dog.ceo/api/breeds/list/all
  fetchAllBreeds({ commit }) {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        commit('setAllBreeds', response.data.message)
      })
      .catch((error)=>console.log(error))
  }
}

const getters = {}

export default createStore({
  state,
  getters,
  actions,
  mutations
})