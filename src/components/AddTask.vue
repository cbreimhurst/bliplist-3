<template>
<div class="add-task-wrap">
    <button @click="addTask" class="add-task">+ Add a task</button>
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
button {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    color: var(--font-color);
  background-color: var(--field-color);
    border-radius: 84px;
    padding: 10px 20px;
    box-sizing: border-box;
    border: none;
    width: 100%;
    text-align: left;
    font-size: 1rem;
    cursor: pointer;
}
</style>