<template>
    <div>
        <h2>{{title}}</h2>
        <p>{{desc}}</p>
        <ul class="list">
            <li v-bind:key="task.uuid" :data-id="task.uuid" v-for="task in tasksArr">
            {{task.title}}
            </li>
        </ul>
        <a href="/lists" class="all-lists"><button>← All Lists</button></a>
    </div>
</template>

<script>



import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    name: 'List',
    components: {
 
    },
    props: [
        "tasks",
    ],
    data() {
        return {
            list_id: null,
            listUUID: null,
            listUpdated: null,
            listCreated: null,
            lists: null,
            tasksArr: [],
            error: null,
            title: null,
            desc: null,
        }
    },
       methods: {
        async loadTasks() {

            let { data: lists, error } = await supabase
            .from('lists')
            .select("*")
            .eq('uuid', this.listUUID)

            let listID = lists[0].id
            this.list_id = lists[0].id
            this.listUpdated = lists[0].updated_at
            this.listCreated = lists[0].inserted_at
            this.title = lists[0].name
            this.desc = lists[0].description
            this.lists = lists

            this.error = error

            let { data: tasks, taskError } = await supabase
            .from("tasks")
            .select("*")
            .eq('list_id', listID)
            .neq('in_trash', true)
            .order('inserted_at', {ascending: false})

            this.error = taskError
            
            this.tasksArr = tasks;
        },
       },
      mounted() {
        supabase
        .from('lists')
        .on('UPDATE', payload => {
            this.title =  payload.new.name;
            this.desc =  payload.new.description;
        })
        .subscribe();
      },
        async created() {
            this.listUUID = this.$route.params.uuid;
            this.loadTasks();
        },
}

    </script>