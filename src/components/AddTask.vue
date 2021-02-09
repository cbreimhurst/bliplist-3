<template>
<div class="add-task-wrap">
    <button @click="addTask" class="add-task">Add a task</button>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AddTask',
  props: {
  
  },
  data() {
    return {
        
    }
  },
  methods: {
    addTask() {     
      const newTask = {
        uuid: uuidv4(),
        title: '',
        text: '',
        completed: false,
      }      
      this.$emit('add-task', newTask);
    },
  },
  mounted() {
    
  }
}
</script>

<style scoped>

</style>