import { todoListData } from './mock_data';
import './style.css'

const add_task_input = document.getElementById('add-task-input')

// Focus on the add task input after 3 seconds of page load
setTimeout(() => {
  add_task_input.focus();
}, 3000);

async function loadDateTime() {
  try {
    const response = await fetch('/api/datetime');
    const data = await response.json();

    document.getElementById('day').textContent = data.day;
    document.getElementById('date-time').textContent = data.dateTime;
  } catch (error) {
    console.error('Failed to load date and time:', error);
  }
}

async function loadListData() {
  try {
    // const response = await fetch('/api/todos');
    // const data = await response.json();

    const data = todoListData

    const todoListElement = document.getElementById('task-list-demo');
    todoListElement.innerHTML = '';

    data.forEach(todo => {
      const listItem = document.createElement('li');
      listItem.textContent = `${todo.title} - ${todo.completed ? 'Completed' : 'Pending'}`;
      todoListElement.appendChild(listItem);
    });
  }
  catch (error) {
    console.error('Failed to load todo list data:', error);
  }
}

loadDateTime();
loadListData();

setInterval(loadDateTime, 1000);