const submitBtn = document.getElementById('submit');
const userInput = document.getElementById('message');
const display = document.getElementById('display');

submitBtn.addEventListener('click', () => {
    display.textContent = userInput.value;
    userInput.style.display = 'none';
    submitBtn.style.display = 'none';
});