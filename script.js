document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the list
    function addTask() {
        // Get trimmed task text
        const taskText = taskInput.value.trim();

        // If input is empty, alert and exit
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove the task when the remove button is clicked
        removeBtn.onclick = function() {
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
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') addTask();
    });

    // Invoke addTask on DOMContentLoaded
    addTask();
});