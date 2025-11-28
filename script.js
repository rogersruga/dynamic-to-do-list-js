document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to keep tasks in memory
    let tasks = [];

    // Save tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task element and append to DOM (internal helper)
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.dataset.task = taskText;

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove the task when the remove button is clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Function to add a task to the list and optionally save it
    function addTask(taskTextParam, save = true) {
        const taskText = (typeof taskTextParam === 'string') ? taskTextParam : taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        createTaskElement(taskText);

        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        taskInput.value = '';
        taskInput.focus();
    }

    // Load tasks from Local Storage and populate the list
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = stored;
        tasks.forEach(function(t) {
            createTaskElement(t);
        });
    }

    // Event listeners to add tasks via button click or Enter key
    addButton.addEventListener('click', function() { addTask(); });
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') addTask();
    });

    // Load saved tasks on startup
    loadTasks();
});