<template>
    <div>
        <h2>
            <input 
      type="text" 
      spellcheck="false" 
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      v-model="title" 
      v-on:blur="updateTitle"
      >
        </h2>
        <p>{{desc}}</p>
     
        <ul class="list">
            <li v-bind:key="task.uuid" :id="task.uuid" v-for="task in tasksArr">
            <Task v-bind:task="task" v-on:complete-task="markComplete" v-on:edit-task-title="editTaskTitle" v-on:edit-task-desc="editTaskDesc" />
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

import Task from './../components/Task.vue';

export default {
    name: 'List',
    components: {
        Task,
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
        async updateTitle() {
            let { data, error } = await supabase
            .from('lists')
            .update({ name: this.title })
            .eq('uuid', this.listUUID)
            console.log(data+error)
            },
        async markComplete(taskID) {
            let taskObj = this.tasksArr;
            var taskItem = taskObj.find(function(task) {
                if(task.uuid == taskID)
                return true;
            });
            taskItem.completed = !taskItem.completed
            let complete = taskItem.completed
            await supabase
                .from('tasks')
                .update({ completed: complete })
                .eq('uuid', taskID)
        },
        async editTaskTitle(taskID) {
            let taskObj = this.tasksArr;
            var taskItem = taskObj.find(function(task) {
                if(task.uuid == taskID)
                return true;
            });
            let title = taskItem.title
            await supabase
                .from('tasks')
                .update({ title: title })
                .eq('uuid', taskID)
        },
        async editTaskDesc(taskID) {
            let taskObj = this.tasksArr;
            var taskItem = taskObj.find(function(task) {
                if(task.uuid == taskID)
                return true;
            });
            let desc = taskItem.text
            await supabase
                .from('tasks')
                .update({ text: desc })
                .eq('uuid', taskID)
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

         supabase
        .from('tasks')
        .on('UPDATE', payload => {
            let updatedUUID = payload.new.uuid
            let taskArrItem = this.tasksArr.findIndex(x => x.uuid === updatedUUID)
            Object.assign(this.tasksArr[taskArrItem], payload.new);
        })
        .on('INSERT', payload => {
             this.tasksArr.unshift(payload.new);
        })
        .on("DELETE", payload => {
            const id = payload.old.id;
            const index = this.tasksArr.map(x => x.id).indexOf(id);
            this.tasksArr.splice(index, 1)
        })
        .subscribe();
      },
        async created() {
            this.listUUID = this.$route.params.uuid;
            this.loadTasks();
        },
}

    </script>


    <style>
    h2 input[type="text"] {
font-family: Avenir, Helvetica, Arial, sans-serif;
-moz-osx-font-smoothing: grayscale;
color: #2c3e50;
background: #eee;
border-radius: 4px;
padding: 10px;
border: none;
box-sizing: border-box;
        font-size: 24px;
        font-weight: 900;
width: 100%;
max-width: 500px;
    }
   :checked + input {
    text-decoration: line-through;
    opacity: .5;
}
    </style>