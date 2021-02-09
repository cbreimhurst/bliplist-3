<template>
    <div class="lists">
        <h2>Lists</h2>
         <ul>
            <li v-bind:key="list.uuid" :data-id="list.uuid" v-for="list in listsArr">
                <a :href="'/list/'+ list.uuid">{{list.name}} <span v-if="list.list_length">({{list.list_length}})</span></a>
            </li>
        </ul>
        <!-- <pre>{{userInfo}}</pre> -->
        
        {{error}}
    </div>
</template>



<script>

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    name: 'Lists',
    props: [
        "lists"
    ],
        data() {
        return {
            listsArr: [],
        }
    },
    computed : {
    userInfo : function(){ return this.$store.getters.userInfo}
  },
  mounted() {
        // add stuff to watch for items in list
  },
    async created() {

        if (this.userInfo) {
            let { data: lists, error } = await supabase
            .from('lists')
            .select("*")
            .eq('user_uuid', this.userInfo.id)

            this.listsArr = lists
            this.error = error

            // add stuff to count items in list
        }



    },
}
</script>

<style scoped>


ul {
  display: flex;
  flex-flow: row wrap;
}

li {
  width: 49%;
  margin-right: 1%;
  margin-bottom: 10px;
}


a {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #eee;
  border-radius: 4px;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  display: block;
  text-decoration: none;
  font-weight: 900;
}


</style>