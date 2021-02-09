<template>
  <ul v-bind:class="{ 'completed': task.completed }" class="task-item">
    <li class="check">
            <label :for="task.id" @click="$emit('complete-task', task.uuid)">
                <input type="checkbox" :name="task.id" v-model="task.completed"/>
            </label>
    </li>
    <li class="title">
         <input 
                type="text" 
                spellcheck="false" 
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                v-model="task.title"
                 @change="$emit('edit-task-title', task.uuid)"
                >
        
    </li>
    <li class="desc">
        <textarea  v-model="task.text" @change="$emit('edit-task-desc', task.uuid)"></textarea>
    </li>
  </ul>
</template>

           
<script>


export default {
  name: 'Task',
  props: [
    "task"
  ],
  data() {
        return {
            // uuid: null,
            // title: null,
            // desc: null,
        }
    },
  methods: {
 
  },
      mounted() {
       
      },
        async created() {
         
        },
}
</script>
<style>


ul.task-item.completed input, ul.task-item.completed textarea  {
    text-decoration: line-through;
  }

</style>