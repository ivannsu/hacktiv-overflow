<template>
  <div class="col-lg-9">
    <div class="lds-ring-container" v-if="!question">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div v-else>
      <h2>
        <span v-html="question.title"></span>
        <router-link v-if="token" :to="{ name: 'create-question' }" class="float-right btn btn-outline-success">Ask Question</router-link>
      </h2>
      <p>
        Asked: <strong>{{ question.user.name }}</strong>
        <button v-if="token && userId === question.user._id" type="button" class="float-right btn btn-link text-danger" @click="remove">Delete</button>
        <router-link v-if="token && userId === question.user._id" :to="{ name: 'edit-question' }" class="float-right btn btn-link text-info">Edit</router-link>
      </p>
      <p>
        <h5 style="display: inline-block"><span class="badge badge-warning">{{ questionVotes }} Votes</span></h5>
        &nbsp;
        <a class="btn btn-outline-primary" href="javascript:void(0)" @click="questionVote('up')"><span class="fa fa-thumbs-up"></span></a>
        &nbsp;
        <a class="btn btn-outline-primary" href="javascript:void(0)" @click="questionVote('down')"><span class="fa fa-thumbs-down"></span></a>
      <p/>
      <hr />
      <h4>{{ question.answers.length }} Answer</h4>
      <br>
      <div class="card border-dark" v-for="(answer, key) in question.answers" :key="key" style="border-color: #ccc !important">
        <div class="card-header">
          <div>
            By: <strong>{{ answer.user.name }}</strong>
            <span class="float-right btn">29 Sep 2018</span>
            <button v-if="token && userId === answer.user._id" class="float-right btn btn-outline-info" @click="openEditModal(answer)">Edit</button>
          </div>
          <div>
            <h5 style="display: inline-block"><span class="badge badge-warning">{{ JSON.stringify(answer.total)}} Votes</span></h5>
            &nbsp;
            <a class="btn btn-sm btn-outline-secondary" href="javascript:void(0)" @click="answerVote(answer._id, 'up')"><span class="fa fa-thumbs-up"></span></a>
            &nbsp;
            <a class="btn btn-sm btn-outline-secondary" href="javascript:void(0)" @click="answerVote(answer._id, 'down')"><span class="fa fa-thumbs-down"></span></a>
          </div>
        </div>
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

    <div class="modal fade" id="editAnswerModal" tabindex="-1" role="dialog" aria-labelledby="editAnswerModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Your Answer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <textarea rows="3" class="form-control" v-model="editAnswerText"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="editAnswer">Save</button>
          </div>
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
      questionVotes: 0,
      answer: '',
      editAnswerId: '',
      editAnswerText: ''
    }
  },
  methods: {
    fetchDetailQuestion () {
      let self = this

      axios({
        method: 'GET',
        url: `${self.$baseurl}/questions/detail/${self.id}`
      })
        .then(response => {
          let question = response.data.question
          for (let i = 0; i < question.answers.length; i++) {
            let answer = question.answers[i]

            self.countAnswerVotes(answer._id)
              .then(response => {
                question.answers[i].total = response.data.total
                self.question = {
                  ...question
                }
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

    countQuestionVotes () {
      let self = this

      axios({
        method: 'GET',
        url: `${self.$baseurl}/votes/question/${self.id}/count`
      })
        .then(response => {
          let total = response.data.total
          self.questionVotes = total
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

    countAnswerVotes (id) {
      let self = this

      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `${self.$baseurl}/votes/answer/${id}/count`
        })
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    questionVote (type) {
      let self = this

      if (!this.token && !this.userId) {
        this.$router.push({ name: 'signin' })
      } else {
        if (this.question.user._id === this.userId) {
          alert('Tidak dapat memvote pertanyaan sendiri')
        } else {
          axios({
            method: 'POST',
            url: `${self.$baseurl}/votes/question/${self.id}/${type}`,
            headers: {
              token: self.token
            }
          })
            .then(res5ba9ebd788c4db0365c4fda2ponse => {
              self.countQuestionVotes()
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
    },

    answerVote (id, type) {
      let self = this

      axios({
        method: 'POST',
        url: `${self.$baseurl}/votes/answer/${id}/${type}`,
        headers: {
          token: self.token
        }
      })
        .then(response => {
          self.fetchDetailQuestion()
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

    openEditModal (answer) {
      this.editAnswerId = answer._id
      this.editAnswerText = answer.answer

      // eslint-disable-next-line
      $('#editAnswerModal').modal('show')
    },

    editAnswer () {
      let self = this

      axios({
        method: 'PUT',
        url: `${self.$baseurl}/answers/update/${self.editAnswerId}`,
        headers: {
          token: self.$store.state.token
        },
        data: {
          answer: self.editAnswerText
        }
      })
        .then(response => {
          self.editAnswerId = ''
          self.editAnswerText = ''
          self.fetchDetailQuestion()

          // eslint-disable-next-line
          $('#editAnswerModal').modal('hide')
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
    }
  },
  created () {
    this.fetchDetailQuestion()
    this.countQuestionVotes()
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
