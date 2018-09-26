<template>
  <div class="col-lg-9">
    <h3>Edit Question</h3>
    <hr>
    <div>
      <div class="form-group">
        <label for="">Your Question: </label>
        <textarea cols="30" rows="10" class="form-control" placeholder="Write something..." v-model="question.title"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="editQuestion">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditQuestion',
  props: ['id'],
  data () {
    return {
      question: null
    }
  },
  methods: {
    editQuestion () {
      let self = this

      axios({
        method: 'PUT',
        url: `${self.$baseurl}/questions/update/${self.id}`,
        headers: {
          token: self.$store.state.token
        },
        data: {
          title: self.question.title
        }
      })
        .then(response => {
          self.$router.push({ name: 'detail-question', params: { id: `${self.id}` } })
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
