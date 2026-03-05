import './style.css'

const add_task_input = document.getElementById('add-task-input')

// Focus on the add task input after 3 seconds of page load
setTimeout(() => {
  add_task_input.focus();
}, 3000);