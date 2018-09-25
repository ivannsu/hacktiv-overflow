<template>
  <div class="col-lg-3">
    <ul class="list-group">
      <router-link v-if="token" :to="{ name: 'create-question' }" class="list-group-item list-group-item-success text-ligth"><span class="fa fa-plus"></span> Ask Question</router-link>
      <router-link to="/" class="list-group-item list-group-item-light"><span class="fa fa-users"></span> Users</router-link>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  computed: {
    token () {
      return this.$store.state.token
    }
  }
}

</script>

<style>

</style>
