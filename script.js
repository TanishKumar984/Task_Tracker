document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTask(task));

    // Create a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTask(taskText);
            saveTask(taskText);
            taskInput.value = '';
        }
    });

    // Function to create a task element
    function createTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit-task">Edit</button>
                <button class="delete-task">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);

        // Handle task deletion
        taskItem.querySelector('.delete-task').addEventListener('click', () => {
            taskList.removeChild(taskItem);
            deleteTask(taskText);
        });

        // Handle task editing
        taskItem.querySelector('.edit-task').addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', taskText);
            if (newTaskText) {
                taskItem.querySelector('span').textContent = newTaskText;
                updateTask(taskText, newTaskText);
            }
        });
    }

    // Save task to local storage
    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Update task in local storage
    function updateTask(oldTask, newTask) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.indexOf(oldTask);
        if (taskIndex > -1) {
            tasks[taskIndex] = newTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Delete task from local storage
    function deleteTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
