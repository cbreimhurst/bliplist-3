import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/Home.vue'
import Lists from './../components/Lists.vue'
import List from './../components/List.vue'
// import SignUp from './../pages/SignUp.vue'
import LogIn from './../components/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      { 
        path: '/', 
        component: Home 
    },
      { 
        path: '/lists', 
        component: Lists 
    },
      { 
        path: '/list/:uuid', 
        component: List 
      },
      { 
        path: '/signup', 
      //  component: SignUp 
      },
      { 
        path: '/login', 
        component: LogIn 
      }
    ],
})
