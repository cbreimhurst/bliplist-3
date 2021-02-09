<template>
  <ul v-bind:class="{ 'completed': task.completed }" class="task-item">
    <li class="check">
            <label :for="task.id" @click="$emit('complete-task', task.uuid)">
                <input type="checkbox" :name="task.id" v-model="task.completed"/>
                <div></div>
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
            :id="'title-' + task.uuid"
            rows="1"
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
            :id="'desc-' + task.uuid"
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

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
        + parseInt(computed.getPropertyValue('padding-top'), 10)
        + field.scrollHeight
        + parseInt(computed.getPropertyValue('padding-bottom'), 10)
        + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
        - 20 ;

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
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
            - 20 ;

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
color: var(--font-color);
  background-color: var(--field-color);
border-radius: 4px;
padding: 10px;
box-sizing: border-box;
border: none;
resize: none;
width: 100%;
max-width: 500px;
min-height: 1.5rem;
    max-height: 50vh;
    overflow: hidden;
}

ul.task-item.completed textarea  {
    text-decoration: line-through;
  }


.task-item {
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  margin: 1rem 0 0;
}


.check { grid-area: 1 / 1 / 3 / 2; }
.title { grid-area: 1 / 2 / 2 / 3; }
.desc { grid-area: 2 / 2 / 3 / 3; } 


.title textarea {
  font-weight: 600;
}




input[type=checkbox]{
  position: absolute;
  visibility: hidden;
}




.task-item li label {
  position: relative;
  height: 30px;
  width: 30px;
  display: block;
}


.task-item li label div {
  display: block;
  position: absolute;
  border: 5px solid var(--secondary-color);
  border-radius: 100%;
  height: 15px;
  width: 15px;
  top: 10px;
  left: 0px;
  z-index: 5;
  transition: border .25s linear;
  -webkit-transition: border .25s linear;
}


.task-item li:hover div {
  border: 5px solid var(--primary-color);
}

.task-item li label div::before {
  display: block;
  position: absolute;
  content: '';
  border-radius: 100%;
height: 9px;
width: 9px;
top: 3px;
left: 3px;
  margin: auto;
  transition: background 0.25s linear;
  -webkit-transition: background 0.25s linear;
}


.task-item li label input[type=checkbox]:checked ~ div {
  border: 5px solid var(--secondary-color);
}

.task-item li label input[type=checkbox]:checked ~ div::before{
  background: var(--secondary-color);
}

.task-item li:hover label input[type=checkbox]:checked ~ div {
  border: 5px solid var(--primary-color);
}

.task-item li:hover label input[type=checkbox]:checked ~ div::before{
  background: var(--primary-color);
}


.task-item.completed .title textarea {
  background: #fff;
}

.task-item.completed .desc {
  display: none;
}


</style>