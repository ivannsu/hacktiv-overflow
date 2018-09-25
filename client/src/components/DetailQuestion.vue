<template>
  <div class="col-lg-8">
    <div class="lds-ring-container" v-if="!question">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-else>
      <h2>
        {{ question.title }}
        <router-link v-if="token" :to="{ name: 'create-question' }" class="float-right btn btn-success">Ask Question</router-link>
      </h2>
      <p>
        Asked: <strong>{{ question.user.name }}</strong>
        <button v-if="token && userId === question.user._id" type="button" class="float-right btn btn-link text-danger" @click="remove">Delete</button>
        <router-link v-if="token && userId === question.user._id" :to="{ name: 'edit-question' }" class="float-right btn btn-link text-info">Edit</router-link>
      </p>
      <hr>
      <h4>{{ question.answers.length }} Answer</h4>
      <br>
      <div class="card border-dark" v-for="(answer, key) in question.answers" :key="key">
        <div class="card-header">By: <strong>{{ answer.user.name }}</strong> <span class="float-right">29 Sep 2018</span> </div>
        <div class="card-body">
          <p class="card-text">{{ answer.answer }}</p>
        </div>
      </div>

      <hr>
      <div v-if="token && userId">
        <div class="input-group">
          <textarea rows="4" class="form-control" placeholder="Type your answer..." v-model="answer"></textarea>
        </div>
        <br>
        <div class="input-group">
          <button type="button" class="btn btn-secondary" @click="answerQuestion">Answer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DetailQuestion',
  props: ['id'],
  data () {
    return {
      question: null,
      answer: ''
    }
  },
  methods: {
    answerQuestion () {
      let self = this

      axios({
        method: 'POST',
        url: `${self.$baseurl}/answers/create/${self.id}`,
        headers: {
          token: self.$store.state.token
        },
        data: {
          answer: self.answer
        }
      })
        .then(response => {
          self.fetchDetailQuestion()
          self.answer = ''
        })
        .catch(err => {
          let message = err.response.data.message
          if (!message) {
            console.error(err)
          } else {
            console.error(message)
          }
        })
    },
    remove () {
      let self = this

      // eslint-disable-next-line
      swal({
        title: 'Are you sure?',
        text: 'All answers in this question will also deleted',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios({
              method: 'DELETE',
              headers: {
                token: self.$store.state.token
              },
              url: `${self.$baseurl}/questions/delete/${self.id}`
            })
              .then(response => {
                self.$router.push({ name: 'all-question' })
              })
              .catch(err => {
                let message = err.response.data.message
                if (!message) {
                  console.error(err)
                } else {
                  console.error(message)
                }
              })
          } else {
            return false
          }
        })
    },
    fetchDetailQuestion () {
      let self = this

      axios({
        method: 'GET',
        url: `${self.$baseurl}/questions/detail/${self.id}`
      })
        .then(response => {
          let question = response.data.question
          self.question = question
        })
        .catch(err => {
          let message = err.response.data.message
          if (!message) {
            console.error(err)
          } else {
            console.error(message)
          }
        })
    }
  },
  created () {
    this.fetchDetailQuestion()
  },
  computed: {
    token () {
      return this.$store.state.token
    },

    userId () {
      return this.$store.state.userId
    }
  }
}
</script>

<style>

</style>
