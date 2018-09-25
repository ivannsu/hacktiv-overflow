<template>
  <div class="col-lg-8">
    <div class="row">
      <div class="col-lg-2" v-for="(user, key) in users.data" :key="key">
        <img class="card-img-top img-thumbnail rounded-circle text-center" :src="avatarImage(user.name)" alt="Card image cap" width="100%">
        <div class="card-body">
          <h5 class="card-title text-center">{{ user.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AllUser',
  data () {
    return {
      users: {
        data: [],
        empty: false
      }
    }
  },
  methods: {
    avatarImage (name) {
      return `https://robohash.org/${name}?set=set3`
    }
  },
  created () {
    let self = this

    axios({
      method: 'GET',
      url: `${self.$baseurl}/users/`
    })
      .then(response => {
        let users = response.data.users

        if (users.length === 0) {
          self.users.data = []
          self.users.empty = true
        } else {
          self.users.data = users
          self.users.empty = false
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
}
</script>

<style>

</style>
