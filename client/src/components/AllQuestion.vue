<template>
  <div class="col-lg-9">
    <div class="jumbotron">
      <div class="text-center">
        <img src="https://storage.cloud.google.com/hacktiv-overflow.ivansu.website/img/hacktiv.png?_ga=2.204157977.-867503942.1536652938&_gac=1.40559126.1537867283.EAIaIQobChMIgaT0herV3QIVg4-PCh2G3gEUEAAYASAAEgI7yvD_BwE" alt="" class="custom-brand-img">
      </div>
      <h1 class="display-4 text-center">Welcome to Hacktiv-Overflow </h1>
      <p class="lead text-center custom-tagline">" How smart people get things done "</p>
      <hr class="my-4">
      <p class="lead text-center">
        <router-link :to="{ name: 'create-question' }" class="btn btn-primary btn-lg text-white" role="button">Ask Question</router-link>
      </p>
      <div class="text-center" style="text-shadow: 0 4px 6px black;">
        OR
      </div>
      <p class="text-center">
        <span class="fa fa-chevron-down" style="font-size: 2em; text-shadow: 0 4px 6px #333; color: #007bff"></span>
      </p>
    </div>
    <div class="lds-ring-container" v-if="questions.data.length === 0 && !questions.empty">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="row" v-else>
      <div class="col-lg-6" v-for="(question, key) in questions.data" :key="key">
        <div class="card custom-card">
          <div class="card-body">
            <h4><router-link :to="{ name: 'detail-question', params: { id: question._id } }" class="text-dark"><strong>{{ question.title }}</strong></router-link></h4>
            <blockquote class="blockquote mb-0">
              <footer class="blockquote-footer">Asked by: <em>{{ question.user.name }}</em></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllQuestion',
  created () {
    this.$store.dispatch('getQuestions')
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>

<style>

.jumbotron {
  padding: 55px;
  background-image: url('https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6f3cb0473315ed1eca1b47d280bb2ab1&auto=format&fit=crop&w=750&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
}

.jumbotron h1 {
  font-size: 2.4em;
  color: #ffffff;
  text-shadow: 0 4px 6px #333;
}

.custom-tagline {
  font-family: 'Caveat Brush', cursive;
  font-size: 2em;
  color: hsla(0, 0%, 100%, 0.90);
  text-shadow: 0 4px 6px #333333;
}

.custom-brand-img {
  max-width: 150px;
  margin: 20px;
}

.custom-card {
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2) !important;
}

</style>
