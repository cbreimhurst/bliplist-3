<template>
    <div class="lists">
        <h2>Lists</h2>
         <ul>
            <li v-bind:key="list.uuid" :data-id="list.uuid" v-for="list in listsArr">
                <a :href="'/list/'+ list.uuid">
                <Progress 
                    radius="30"
                progress="40"
                stroke="3" />
                <!-- <div class="demo">
                    <svg class="progress" width="30" height="30" viewBox="0 0 120 120">
                        <circle class="progress__field" cx="60" cy="60" r="51" fill="none" stroke-width="16" />
                        <circle class="progress__value" cx="60" cy="60" r="51" fill="none" stroke-width="16" />
                    </svg>
                </div> -->
                {{list.name}} <span v-if="list.list_length">({{list.list_length}})</span></a>
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

import Progress from './../components/Progress.vue';

export default {
    name: 'Lists',
    props: [
        "lists"
    ],
    components: {
        Progress,
    },
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
  flex-flow: column;
}

li {
  margin-bottom: 10px;
}



a {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-color);
  background-color: var(--field-color);
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  font-weight: 900;
  display: flex;
  align-items: center;
}

.progress {
    margin-right: 10px;
    display: flex;
}

/* 
.progress {
    transform: rotate(-90deg);
}

.progress__field {
    stroke: var(--field-color);
}
.progress__value {
    stroke: var(--primary-color);
    stroke-dasharray: 70.292;
    stroke-dashoffset: 70.292;
    animation-name: progress;
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    stroke-linecap: round;
    animation-direction: reverse;
}

@keyframes progress {
    from {
        stroke-dashoffset: 0;
    }
    to {
        stroke-dashoffset: 70.292;
    }
} */
</style>