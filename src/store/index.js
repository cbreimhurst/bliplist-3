import Vue from 'vue'
import Vuex from 'vuex'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      status: '',
      token: localStorage.getItem('token'),
      user : {},
      error: null
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
          },
          logout(state){
            state.status = ''
            state.token = ''
          },
    },
    actions: {
        async login({commit}, data){
            commit('auth_request')
            let { user, error } = await supabase.auth.signIn(data)
            this.error = error
            this.user = user

            if(error) {
                commit('auth_error')
                localStorage.removeItem('token')
            }

            if(user) {
                commit('auth_success', token, user)
                const session = supabase.auth.session()
                const token = session.refresh_token
                localStorage.setItem('token', token)
            }


            // return new Promise((resolve, reject) => {
            //   commit('auth_request')
            //   axios({url: 'http://localhost:3000/login', data: user, method: 'POST' })
            //   .then(resp => {
            //     const token = resp.data.token
            //     const user = resp.data.user
            //     localStorage.setItem('token', token)
            //     axios.defaults.headers.common['Authorization'] = token
            //     commit('auth_success', token, user)
            //     resolve(resp)
            //   })
            //   .catch(err => {
            //     commit('auth_error')
            //     localStorage.removeItem('token')
            //     reject(err)
            //   })
            // })
        },
        async logout(){
            console.log('asdf');
              let { error } = await supabase.auth.signOut()
              this.error = error
              localStorage.removeItem('token')
              this.$router.push('/')
          }
    },
    getters : {
  
    }
  })