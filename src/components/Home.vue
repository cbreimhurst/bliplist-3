<template>
 <div>

      <button @click="newlist">New List</button>

 </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

  export default {
    data(){
        return {
            
        }
    },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    userInfo : function(){ return this.$store.getters.userInfo}
  },
    methods: {
      async newlist () {
        let uuid = uuidv4()
        let userUUID = ''
        if(this.isLoggedIn){
            userUUID = this.userInfo.id
        }
        const { data, error } = 
        await supabase.from("lists").insert({'uuid': uuid, 'user_uuid': userUUID})
        .then(() => this.$router.push('/list/'+uuid));
        console.log(data)
        console.log(error)
      }
    }
  }




</script>

<style scoped>
button {
    display: flex;
    font-size: 22px;
    font-weight: bold;
    background-color: var(--field-color);
    border: none;
    padding: 20px 30px;
    border-radius: 4px;
    margin: 10vh auto;
color: var(--font-color);
    cursor: pointer;
}

</style>