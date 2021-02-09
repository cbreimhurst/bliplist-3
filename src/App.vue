<template>
    <div id="app" v-on:mode="toggle" :data-theme="mode">
        <Header :mode="mode" @toggle="toggle" />
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
import Header from './components/Header.vue'

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
  name: 'App',
  components: {
     Header,
  },
  data() {
    return {
      mode: 'light',
    }
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    userInfo : function(){ return this.$store.getters.userInfo}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => this.$router.push('/'))
    },
      toggle() {
      if (this.mode === "dark") {
        this.mode = "light"
      } else {
        this.mode = "dark"
      }
    }
  },
    watch: {
            mode: {
               async handler(value) {
                 let uuid = this.userInfo.id
                      await supabase
                        .from('user_profile')
                        .update({ display_mode: value })
                        .eq('uuid', uuid)
                }
            }
        },
    async created() {
      if(this.userInfo){
        let uuid = this.userInfo.id
          const { data: user_profile, error } = await supabase
          .from('user_profile')
          .select('display_mode')
          .eq('uuid', uuid)
          console.log(user_profile)
          console.log(error)
        this.mode = this.userInfo
      }
    }
}
</script>

<style>
:root {
    --primary-color: #302AE6;
    --secondary-color: #536390;
    --field-color: #eee;
    --font-color: #2c3e50;
    --bg-color: #fff;
    --heading-color: #2c3e50;
}


[data-theme="dark"] {
    --primary-color: #9A97F3;
    --secondary-color: #818cab;
    --field-color: #181818;
    --font-color: #f4f3f0;
    --bg-color: #121212;
    --heading-color: #f4f3f0;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--bg-color);
  color: var(--font-color);
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
