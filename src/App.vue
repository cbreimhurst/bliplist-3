<template>
  <div id="app">
        <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/lists" v-if="isLoggedIn">Lists</router-link>
      <div class="end">
      <router-link to="/login"  v-if="!isLoggedIn">Login</router-link>
      <button @click="logout"  v-if="isLoggedIn">Logout</button>
      </div> 
    </div>
    <router-view/>
  
    <!-- <pre v-if="this.$store.state">{{$store.state}}</pre> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    userInfo : function(){ return this.$store.getters.userInfo}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => this.$router.push('/'))
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
  max-width: 500px;
  margin: 0 auto;
}

body, input[type="text"], textarea {
    font-size: 16px;
}


#nav {
  display: flex;
  justify-content: flex-start;
}
#nav .end {
  margin-left: auto;
}
</style>
