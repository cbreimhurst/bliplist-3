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
    methods: {
      async newlist () {
        let uuid = uuidv4()
        const { data, error } = 
        await supabase.from("lists").insert({'uuid': uuid})
        .then(() => this.$router.push('/list/'+uuid));
        console.log(data)
        console.log(error)
      }
    }
  }




</script>

<style scoped>


</style>