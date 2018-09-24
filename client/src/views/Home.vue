<template>
  <div class="col-lg-8">
    <div class="row">

      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4><router-link to="/" class="text-dark"><strong>Some title</strong></router-link></h4>
            <blockquote class="blockquote mb-0">
              <footer class="blockquote-footer">Author: <em>Ivan</em></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  created () {
    axios({
      method: 'GET',
      
    })
  }
}
</script>
