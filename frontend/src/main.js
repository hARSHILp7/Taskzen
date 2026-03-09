import { todoListData } from './mock_data';
import './style.css'

const addTaskInput = document.getElementById('add-task-input');
const addTaskBtn = document.getElementById('add-task-btn');

// Focus on the add task input after 3 seconds of page load
setTimeout(() => {
  addTaskInput.focus();
}, 3000);

addTaskBtn.addEventListener('click', async () => {
  // const title = addTaskInput.value.trim();
  // if(!title) return;
  // todoListData.push({
  //   title: title,
  //   completed: false,
  // });
  // addTaskInput.value = '';
  // loadListData();

  const title = addTaskInput.value.trim();
  if (!title) return;

  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false })
  });

  if (response.ok) {
    addTaskInput.value = '';
    loadListData();
  }
});

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
    const response = await fetch('/api/todos');
    const data = await response.json();

    // const data = todoListData;
    const todoListElement = document.getElementById('task-list-ordered');
    todoListElement.innerHTML = '';

    data.forEach((todo, index) => {
      const listItem = document.createElement('li');
      todoListElement.appendChild(listItem);
      listItem.classList.add('task-list-item');

      //Title
      const title = document.createElement('span');
      title.textContent = todo.title;
      listItem.appendChild(title);
      title.className = `${todo.completed ? 'line-through opacity-50' : ''}`;
      title.classList.add('task-list-item-title');

      //Checkbox
      const checkbox = document.createElement('button');
      checkbox.innerHTML = todo.completed
      ? '<i class="fas fa-check-square"></i>' 
      : '<i class="fa-regular fa-square"></i>';
      listItem.appendChild(checkbox);
      checkbox.classList.add('task-list-item-checkbox');
      
      checkbox.addEventListener('click', async () => {
        const response = await fetch(`/api/todos/${todo.id}/toggle`, { method: 'PATCH' });
        if (response.ok) {
          loadListData();
        }
        // todo.completed = !todo.completed;
        
        checkbox.innerHTML = todo.completed 
        ? '<i class="fas fa-check-square"></i>' 
        : '<i class="fa-regular fa-square"></i>';

        title.classList.toggle('line-through');
        title.classList.toggle('opacity-50');
      });

      //Delete
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      listItem.appendChild(deleteBtn);
      deleteBtn.classList.add('task-list-item-delete'); 
      deleteBtn.addEventListener('click', async () => {
        const response = await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
        if (response.ok) {
          loadListData();
        }
        // todoListData.splice(index, 1);
        // loadListData();
      });
    });
  }
  catch (error) {
    console.error('Failed to load todo list data:', error);
  }
}

loadDateTime();
setInterval(loadDateTime, 1000);

loadListData();