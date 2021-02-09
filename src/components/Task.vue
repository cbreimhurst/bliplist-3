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
            v-on:keyup="autoHeight"
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

        var forEach = function (arr, callback) {
            Array.prototype.forEach.call(arr, callback);
        };


        let textareas = document.querySelectorAll('textarea')
        
        forEach(textareas, function (textarea) {

              textarea.style.height = 'inherit';

            // Get the computed styles for the element
            var computed = window.getComputedStyle(textarea);

            // Calculate the height
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + textarea.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            textarea.style.height = height + 'px';
        });


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
/* min-height: 1.5rem; */
    max-height: 50vh;
}

ul.task-item.completed textarea  {
    text-decoration: line-through;
  }



</style>