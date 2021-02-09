<template>
    <div class="lists">
        <h2>Lists</h2>
         <ul>
            <li v-bind:key="list.uuid" :data-id="list.uuid" v-for="list in listsArr">
                <a :href="'/list/'+ list.uuid">{{list.name}}</a>
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

  },
    async created() {

        if (this.userInfo) {
            let { data: lists, error } = await supabase
            .from('lists')
            .select("*")
            .eq('user_uuid', this.userInfo.id)

            this.listsArr = lists
            this.error = error
        }

    },
}
</script>