<template>
  <div class="col-lg-8">
    <h3>Ask Question</h3>
    <hr>
    <div>
      <div class="form-group">
        <label for="">Your Question: </label>
        <textarea cols="30" rows="10" class="form-control" placeholder="Write something..." v-model="question"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="askQuestion">Ask</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateQuestion',
  data () {
    return {
      question: ''
    }
  },
  methods: {
    askQuestion () {
      let self = this

      axios({
        method: 'POST',
        url: `${self.$baseurl}/questions/create`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: self.question
        }
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
    }
  }
}
</script>

<style>

</style>
