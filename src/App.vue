<template>
  <div id="app">
        <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <button @click="logout">Logout</button>
    </div>
    <router-view/>
    <pre v-if="this.$store.state.user">{{$store.user}}</pre>
    <pre v-if="this.$store.state.error">{{$store.error}}</pre>
    <pre v-if="this.$store.state.token">{{$store.token}}</pre>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
