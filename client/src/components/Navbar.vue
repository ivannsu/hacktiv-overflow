<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img src="public/hacktiv8.png" width="30" height="30" class="d-inline-block align-top" alt="">
      Hacktiv Overflow
      </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Questions</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <button type="button" class="btn btn-link" data-toggle="modal" data-target="#signinModal">Sign In</button>
        &nbsp;
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#signupModal">Sign Up</button>
      </form>
    </div>

    <!-- SIGN IN MODAL -->
    <div class="modal fade" id="signinModal" tabindex="-1" role="dialog" aria-labelledby="signinModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Sign In</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group text-center">
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="signin">Sign In</button>
            <button type="button" class="btn btn-link text-muted" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- SIGN UP MODAL -->
    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="signupModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Sign Up</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" placeholder="Enter your name..." v-model="name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" placeholder="Enter your email..." v-model="email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" placeholder="Enter your password..." v-model="password">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="signup">Sign Up</button>
            <button type="button" class="btn btn-link text-muted" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      fbSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      },
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onSignInSuccess (response) {
      console.log(response)
    },
    onSignInError (error) {
      console.log(error)
    },
    signin () {
      console.log(this.name, this.email, this.password)
    },
    signup () {
      console.log(this.name, this.email, this.password)
    }
  }
}
</script>

<style>

.fb-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  cursor: pointer;
}

</style>
