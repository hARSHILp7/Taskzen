import './style.css'

const submitBtn = document.getElementById('submit');
const userInput = document.getElementById('message');
const display   = document.getElementById('display');
const form      = document.getElementById('form');

// Focus input after 3 seconds on load
setTimeout(() => {
  userInput.focus();
}, 3000);

// On submit — slide form down, then slide message in from top
submitBtn.addEventListener('click', () => {
  const text = userInput.value.trim();
  if (!text) return;

  // Slide form down and fade out
  form.classList.add('hide');

  // After 2s animation finishes, hide form and show message
  setTimeout(() => {
    form.style.display = 'none';
    display.textContent = text;
    display.classList.add('show');
  }, 1000);
});