<template>
  <div class="col-lg-9">
    <div class="form-group text-center">
      <h2>Sign In</h2>
      <div class="alert alert-danger" v-if="message !== ''">
        {{ message }}
      </div>
      <div class="alert alert-warning" v-if="notif">
        Activation email has sended, Check your inbox or spam
      </div>
      <hr>
      <fb-signin-button
        :params="fbSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        Facebook
      </fb-signin-button>
    </div>
    <p class="text-center"><small>OR</small></p>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" placeholder="Enter your email..." v-model="email">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" placeholder="Enter your password..." v-model="password">
    </div>
    <button type="button" class="btn btn-primary" @click="signin">Sign In</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signin',
  data () {
    return {
      fbSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      },
      name: '',
      email: '',
      password: '',
      message: '',
      authentication: false,
      notif: false
    }
  },
  methods: {
    onSignInSuccess (response) {
      let self = this
      let fbtoken = response.authResponse.accessToken

      if (response.status === 'connected') {
        axios({
          method: 'POST',
          url: `${this.$baseurl}/users/fbSignin`,
          headers: {
            fbtoken: fbtoken
          }
        })
          .then(response => {
            let data = response.data

            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)

            self.$store.dispatch('commitToken', data.token)
            self.$store.dispatch('commitUserId', data.userId)

            self.$router.push({ name: 'create-question' })
          })
          .catch(err => {
            self.message = err.response.data.message
          })
      }
    },
    onSignInError (error) {
      console.log(error)
    },
    signin () {
      let self = this

      axios({
        method: 'POST',
        url: `${this.$baseurl}/users/signin`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          let data = response.data

          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.userId)

          self.$store.dispatch('commitToken', data.token)
          self.$store.dispatch('commitUserId', data.userId)

          self.name = ''
          self.email = ''
          self.password = ''

          self.$router.push({ name: 'create-question' })
        })
        .catch(err => {
          self.message = err.response.data.message
        })
    },
    getQuery () {
      let urlParams = new URLSearchParams(window.location.search);
      let myParam = urlParams.get('from');

      if (myParam === 'signup') {
        this.notif = true
      }
    }
  },
  created () {
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    this.getQuery()

    if (!token && !userId) {
      this.authentication = false
    } else {
      this.$store.dispatch('commitToken', token)
      this.$store.dispatch('commitUserId', userId)
      this.authentication = true
    }
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
