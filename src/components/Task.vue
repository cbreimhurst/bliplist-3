<template>
  <ul v-bind:class="{ 'completed': task.completed }" class="task-item">
    <li class="check">
            <label :for="task.id" @click="$emit('complete-task', task.uuid)">
                <input type="checkbox" :name="task.id" v-model="task.completed"/>
            </label>
    </li>
    <li class="title">
         <textarea 
            spellcheck="false" 
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            v-model="task.title"
            @change="$emit('edit-task-title', task.uuid)"
        >
            </textarea>
        
    </li>
    <li class="desc">
        <textarea  
         spellcheck="false" 
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            v-model="task.text" 
            @change="$emit('edit-task-desc', task.uuid)"
            v-on:keyup="autoHeight"
            oninput="this.parentNode.dataset.value = this.value" 
            rows="1" 
        >
                </textarea>
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
    autoHeight(e) {
        let field = e.target
            // Reset field height
        field.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);
        console.log(field.scrollHeight)

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
        + parseInt(computed.getPropertyValue('padding-top'), 10)
        + field.scrollHeight
        + parseInt(computed.getPropertyValue('padding-bottom'), 10)
        + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';
    }
  },
      mounted() {
       
      },
        async created() {
         
        },
}
</script>
<style>

ul, li {
    list-style: none;
    margin: 0;
    padding:0;
}
ul.task-item textarea  {
font-family: Avenir, Helvetica, Arial, sans-serif;
-moz-osx-font-smoothing: grayscale;
color: #2c3e50;
background: #eee;
border-radius: 4px;
padding: 10px;
box-sizing: border-box;
border: none;
resize: none;
width: 100%;
max-width: 500px;
min-height: 1.5rem;
    max-height: 50vh;
}

ul.task-item.completed textarea  {
    text-decoration: line-through;
  }

 /* ul.task-item li {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
}

ul.task-item li::after {
  grid-area: 2/1;
}
ul.task-item li::after {
  width: auto;
  min-width: 1em;
  grid-area: 1/2;
  font: inherit;
  padding: 0.25em;
  margin: 0;
  resize: none;
  background: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border: none;
}

ul.task-item li::after {
  content: attr(data-value) " ";
  visibility: hidden;
  white-space: pre-wrap;
} */

</style>