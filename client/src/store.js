import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userId: '',
    questions: {
      data: [],
      empty: true
    },
    baseurl: 'http://localhost:3000'
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
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    addQuestion (state, payload) {
      state.questions.data.push(payload)
    }
  },
  actions: {
    getQuestions ({ commit }) {
      let self = this

      axios({
        method: 'GET',
        url: `${self.state.baseurl}/questions/title`
      })
        .then(response => {
          let questions = response.data.questions
          let payload = {}

          if (questions.length === 0) {
            payload.data = []
            payload.empty = true
          } else {
            payload.data = questions
            payload.empty = false
          }
          commit('setQuestions', payload)
        })
        .catch(err => {
          console.error(err.response.data.message)
        })
    },
    addQuestion ({ commit }, payload) {
      commit('addQuestion', payload)
    },
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
