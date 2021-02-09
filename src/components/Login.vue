<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <div class="input-wrap">
     <label>Email</label>
     <input required v-model="logIn.email" type="email" placeholder="Name"/>
     </div>
     <div class="input-wrap">
     <label>Password</label>
     <input required v-model="logIn.password"  type="password" placeholder="Password"/>
     </div>
     <div class="input-wrap">
     <button type="submit">Login</button>
     </div>
   </form>
 </div>
</template>

<script>
  export default {
    data(){
        return {
            logIn: {
                email: null,
                password: null
            }
        }
    },
    methods: {
      login: function () {
        let email = this.logIn.email
        let password = this.logIn.password
        this.$store.dispatch('login', { email, password })
       // .then(() => this.$router.push('/lists'))
      }
    }
  }
</script>

<style scoped>

     .input-wrap {
         display: block;
         padding: 20px;
     }

    .input-wrap label {
         display: block;
     }
</style>