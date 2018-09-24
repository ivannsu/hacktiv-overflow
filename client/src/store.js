import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userId: ''
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setUserId (state, payload) {
      state.userId = payload
    },
    removeToken (state) {
      state.token = ''
    },
    removeUserId (state) {
      state.userId = ''
    }
  },
  actions: {
    commitToken ({ commit }, payload) {
      commit('setToken', payload)
    },
    commitUserId ({ commit }, payload) {
      commit('setUserId', payload)
    },
    removeToken ({ commit }) {
      commit('removeToken')
    },
    removeUserId ({ commit }) {
      commit('removeUserId')
    }
  }
})
