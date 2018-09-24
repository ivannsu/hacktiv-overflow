<template>
  <div>
    <Navbar/>
    <div class="container-fluid" style="padding-top: 20px">
      <div class="row">
        <Sidebar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>

</style>
