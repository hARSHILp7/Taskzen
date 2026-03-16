import './style.css';

const TIME_DELAY_GLOBAL = 3000;
const TIME_DELAY_FOR_DATE_AND_TIME = 1000;

const addTaskInput = document.getElementById('add-task-input');
const addTaskBtn = document.getElementById('add-task-btn');

const todoListElement = document.getElementById('task-list-ordered');

const markAllCompleteBtn = document.getElementById('mark-all-complete');
const deleteAllBtn = document.getElementById('delete-all');

// const sortTasksBtn = document.getElementById('sort-tasks');
// const sortDropdown = document.getElementById('sort-dropdown');

const sortSelect = document.getElementById('sort-tasks');

// Focus on the add task input after 3 seconds of page load
setTimeout(() => {
  addTaskInput.focus();
}, TIME_DELAY_GLOBAL);

loadDateTime();
setInterval(loadDateTime, TIME_DELAY_FOR_DATE_AND_TIME);

const savedSortBy = localStorage.getItem('sortBy') || 'newest';
sortSelect.value = savedSortBy;
// updateActiveSortOption(savedSortBy);
loadListData(savedSortBy);

addTaskBtn.addEventListener('click', async () => {
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

// async function addTask() {
//   const title = addTaskInput.value.trim();
//   if (!title) return;

//   const response = await fetch('/api/todos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ title, completed: false })
//   });

//   if (response.ok) {
//     addTaskInput.value = '';
//     loadListData();
//   }
// }

addTaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
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

async function loadListData(sortBy = localStorage.getItem('sortBy') || 'newest') {
  try {
    const response = await fetch(`/api/todos?sort=${sortBy}`);
    const data = await response.json();

    updateFeatureBtns(data);

    todoListElement.innerHTML = '';

    data.forEach((todo, index) => {
      const listItem = document.createElement('li');
      todoListElement.appendChild(listItem);
      listItem.classList.add('task-list-item');

      // Title
      const title = document.createElement('span');
      title.textContent = todo.title;
      listItem.appendChild(title);
      title.className = `${todo.completed ? 'line-through opacity-50' : ''}`;
      title.classList.add('task-list-item-title');

      // Checkbox
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
        checkbox.innerHTML = todo.completed ? '<i class="fas fa-check-square"></i>' : '<i class="fa-regular fa-square"></i>';

        title.classList.toggle('line-through');
        title.classList.toggle('opacity-50');
      });

      // Delete
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      listItem.appendChild(deleteBtn);
      deleteBtn.classList.add('task-list-item-delete'); 
      deleteBtn.addEventListener('click', async () => {
        const response = await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
        if (response.ok) {
          loadListData();
        }
      });
    });
  }
  catch (error) {
    console.error('Failed to load todo list data:', error);
  }
}

markAllCompleteBtn.addEventListener('click', async () => {
  const response = await fetch('/api/todos/complete-all', { method: 'PATCH' });
  if (response.ok) {
    loadListData();
  }
});

// async function markAllComplete() {
//   const response = await fetch('/api/todos/complete-all', { method: 'PATCH' });
//   if (response.ok) {
//     loadListData();
//   }
// }

deleteAllBtn.addEventListener('click', async () => {
  const response = await fetch('/api/todos/delete-all', { method: 'DELETE' });
  if (response.ok) {
    loadListData();
  }
});

// async function deleteAll() {
//   const response = await fetch('/api/todos/delete-all', { method: 'DELETE' });
//   if (response.ok) {
//     loadListData();
//   }
// }

function updateFeatureBtns(data) {
  const allCompleted = (data.length > 0 && data.every(todo => todo.completed)) || data.length === 0;
  if (allCompleted) {
    markAllCompleteBtn.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
  } else {
    markAllCompleteBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
  }

  if (data.length === 0) {
    deleteAllBtn.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
  } else {
    deleteAllBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
  }
}

// sortTasksBtn.addEventListener('click', (e) => {
//   e.stopPropagation();
//   sortDropdown.classList.toggle('hidden');
// });

// document.addEventListener('click', () => {
//   sortDropdown.classList.add('hidden');
// });

// document.querySelectorAll('.sort-option').forEach(option => {
//   option.addEventListener('click', (e) => {
//     const sortBy = e.target.dataset.sort;
//     localStorage.setItem('sortBy', sortBy);
//     sortDropdown.classList.add('hidden');
//     updateActiveSortOption(sortBy);
//     loadListData(sortBy);
//   });
// });

// function updateActiveSortOption(sortBy) {
//   document.querySelectorAll('.sort-option').forEach(option => {
//     if (option.dataset.sort === sortBy) {
//       option.classList.add('sort-option-active');
//     } else {
//       option.classList.remove('sort-option-active');
//     }
//   });
// }

sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value;
  localStorage.setItem('sortBy', sortBy);
  loadListData(sortBy);
});