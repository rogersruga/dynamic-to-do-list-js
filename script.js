document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the list
    // silent: when true, do not show alert for empty input (used on initial load)
    function addTask(silent = false) {
        // Get trimmed task text
        const taskText = taskInput.value.trim();

        // If input is empty, optionally alert and exit
        if (taskText === '') {
            if (!silent) alert('Please enter a task.');
            return;
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove the task when the remove button is clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append remove button and the list item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
        taskInput.focus();
    }

    // Event listeners to add tasks via button click or Enter key
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Invoke addTask on DOMContentLoaded in silent mode (no alert on empty)
    addTask(true);
});