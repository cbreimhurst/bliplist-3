import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from './../pages/Home.vue'
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
      //  component: HomePage 
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
