import { createStore } from 'vuex'
import axios from 'axios'

const state = {
  dogs: [],
  allBreeds: [],
  amountToFetch: 100,
  // searchBreed: null,
  fetchingDogs: false,
}

const mutations = {
  setDogs(state, dogs) {
    state.dogs = dogs
  },
  setAllBreeds(state, breeds) {
    state.allBreeds = breeds
  },
  setAmountToFetch(state, amount) {
    state.amountToFetch = amount
  },
  // setSearchBreed(state, breed) {
  //   state.searchBreed = breed
  // },
  setFetchingDogs(state, fetching) {
    state.fetchingDogs = fetching
  }
}

const actions = {
  // fetch dogs from API https://dog.ceo/api/breeds/image/random/100
  fetchRandomDogs({ commit }, amount) {
    commit('setFetchingDogs', true)
    axios.get(`https://dog.ceo/api/breeds/image/random/${amount}`)
      .then(response => {
        commit('setDogs', response.data.message)
        commit('setFetchingDogs', false)
      })
      .catch((error)=>{
        console.log(error)
        commit('setFetchingDogs', true)
      })
  },
  // fetch related breeds from a given breed
  // https://dog.ceo/api/breed/hound/images
  fetchByBreed({ commit }, { breed, amount }) {
    commit('setFetchingDogs', true)
    axios.get(`https://dog.ceo/api/breed/${breed}/images`)
      .then(response => {
        commit('setDogs', response.data.message)
        commit('setFetchingDogs', false)
      })
      .catch((error)=>{
        console.log(error)
        commit('setFetchingDogs', true)
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

const getters = {}

export default createStore({
  state,
  getters,
  actions,
  mutations
})