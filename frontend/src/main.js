// import './style.css';

const TIME_DELAY_GLOBAL = 3000;
const TIME_DELAY_FOR_DATE_AND_TIME = 1000;

const addTaskInput = document.getElementById('add-task-input');
const addTaskBtn = document.getElementById('add-task-btn');

const todoListElement = document.getElementById('task-list-ordered');

const markAllCompleteBtn = document.getElementById('mark-all-complete');
const deleteAllBtn = document.getElementById('delete-all');

const sortSelect = document.getElementById('sort-tasks');

// Focus on the add task input after 3 seconds of page load
setTimeout(() => {
  addTaskInput.focus();
}, TIME_DELAY_GLOBAL);

loadDateTime();
setInterval(loadDateTime, TIME_DELAY_FOR_DATE_AND_TIME);

const savedSortBy = localStorage.getItem('sortBy') || 'newest';
updateSortOptions(savedSortBy);
loadListData(savedSortBy);

async function addTask() {
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
}

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
      title.className = `task-list-item-title ${todo.completed ? 'line-through opacity-50 cursor-default' : 'cursor-pointer'}`;
      listItem.appendChild(title);

      // Click on title to edit
      title.addEventListener('click', () => {
        if (todo.completed) return;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.title;
        input.maxLength = 40;
        input.className = 'task-list-item-title-input';

        listItem.replaceChild(input, title);
        input.focus();
        input.select();

        let isSaving = false;

        // Save on enter
        input.addEventListener('keydown', async (e) => {
          if (e.key === 'Enter') {
            isSaving = true;
            await saveTitle(input, title, todo);
          }

          // Cancel on escape
          if (e.key === 'Escape') {
            isSaving = true;
            listItem.replaceChild(title, input);
          }
        });

        // Save on blur (clicking outside)
        input.addEventListener('blur', async () => {
          if(isSaving) return;
          await saveTitle(input, title, todo);
        });
      });

      async function saveTitle(input, title, todo) {
        const newTitle = input.value.trim();

        // If empty or unchanged, revert
        if ( !newTitle || newTitle === todo.title ) {
          input.parentElement.replaceChild(title, input);
          return;
        }

        const response = await fetch(`/api/todos/${todo.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle })
        });

        if (response.ok) {
          todo.title = newTitle;
          title.textContent = newTitle;
        }

        input.parentElement.replaceChild(title, input);
      }

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

async function markAllComplete() {
  const response = await fetch('/api/todos/complete-all', { method: 'PATCH' });
  if (response.ok) {
    loadListData();
  }
}

async function deleteAll() {
  const response = await fetch('/api/todos/delete-all', { method: 'DELETE' });
  if (response.ok) {
    loadListData();
  }
}

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

function updateSortOptions(currentSort) {
  sortSelect.innerHTML = '';
  const allOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'pending', label: 'Pending' }
  ];

  // Static 'Sort by' placeholder
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Sort by';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.hidden = true;
  sortSelect.appendChild(placeholder);

  // All 3 options
  allOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    sortSelect.appendChild(optionElement);
  });
}

sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value;
  localStorage.setItem('sortBy', sortBy);
  updateSortOptions(sortBy);
  loadListData(sortBy);
});