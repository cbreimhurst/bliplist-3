import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      user : '',
      status: '',
      token: '',
    },
    mutations: {
          auth_request(state){
            state.status = 'loading'
          },
          auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
          },
          auth_error(state){
            state.status = 'error'
            state.token = ''
          },
          logout(state){
            state.status = ''
            state.token = ''
            state.user = ''
          },
    },
    actions: {
        async login({commit}, data){
            commit('auth_request')

            await supabase.auth
            .signIn(data)
            .then((response) => {
              if(response.data) {
                console.log(response.user)
                let token = response.data.refresh_token
                let user = response.user
                commit('auth_success', token, user)
              }
              if(response.error) {
                commit('auth_error')
              }
            })


       
        },
        async logout({commit}){
            console.log('asdf');
              // let { error } = await supabase.auth.signOut()
              // this.error = error
              // localStorage.removeItem('token')
              // this.$router.push('/')

              await supabase.auth
              .signOut()
              .then((response) => {
                console.log(response)

                let token = ''
                let user = ''
                commit('logout', token, user)
              })
          }
    },
    getters : {
  
    }
  })