<template>
  <div>
    <Navbar/>
    <div class="container-fluid" style="padding-top: 20px">
      <div class="row">
        <Sidebar/>
        <router-view/>
      </div>
    </div>
    <div class="footer">
      <p>Copyright &copy; 2018 - Hacktiv Overflow</p>
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

.list-group {
  background-color: #f2f2f2;
  height: 100%;
}

.list-group-item:first-child,
.list-group-item:last-child {
  border-radius: 0;
}

.list-group-item {
  border: none;
  border-left: 5px solid #17a2b8;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.list-group-item:hover {
  box-shadow: 0 2px 3px 0 hsla(0, 0%, 0%, 0.2);
  border-left-color: #007bff;
}

.footer {
  margin-top: 40px;
  background-color: #333333;
  display: block;
  padding: 15px 25px;
  height: 70px;
  line-height: 35px;
  color: #cccccc;
  text-align: center;
}

.card {
  margin-bottom: 25px;
}

.lds-ring-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px 0;
}

.lds-ring {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  left: 50%;
  margin-left: 32px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #cccccc;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #00BCD4 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
