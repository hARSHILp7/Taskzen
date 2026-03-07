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

loadDateTime();

setInterval(loadDateTime, 30000);