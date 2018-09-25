<template>
  <div class="col-lg-8">
    <div class="lds-ring-container" v-if="questions.data.length === 0 && !questions.empty">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="row" v-else>
      <div class="col-lg-6" v-for="(question, key) in questions.data" :key="key">
        <div class="card">
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

</style>
