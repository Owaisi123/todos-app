const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const messageDiv = document.getElementById('message');
const taskInput = document.getElementById('taskInput');
const toggleBackgroundBtn = document.getElementById('toggleBackgroundBtn');
const container = document.querySelector('.container');

let currentEditingTask = null;
let backgroundIndex = 0;
let containerBackgroundIndex = 0;

const backgrounds = [
    'linear-gradient(135deg, #ff7e5f, #feb47b)',  
    'linear-gradient(135deg, #86a8e7, #91eae4)',  
    'linear-gradient(135deg, #ff6a6a, #ffb88c)', 
    'linear-gradient(135deg, #4facfe, #00f2fe)',  
    'linear-gradient(135deg, #ff9a9e, #fad0c4)',  
];

const containerBackgrounds = [
    'linear-gradient(135deg, #6a11cb, #2575fc)',  
    'linear-gradient(135deg, #ff416c, #ff4b2b)',  
    'linear-gradient(135deg, #00c6ff, #0072ff)', 
    'linear-gradient(135deg, #fc00ff, #fcb045)',  
    'linear-gradient(135deg, #ff5f6d, #ffc371)',  
];

function updateTaskCount() {
    const tasks = taskList.getElementsByTagName('li');
    taskCount.textContent = `Total Tasks: ${tasks.length}`;
}

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        messageDiv.textContent = 'Please enter a task.';
        messageDiv.style.color = 'red';
        return;
    }

    if (currentEditingTask) {
        currentEditingTask.querySelector('.task-text').textContent = taskText;
        messageDiv.textContent = 'To-Do item updated successfully.';
        messageDiv.style.color = 'green';
        currentEditingTask = null;
    } else {
        const li = document.createElement('li');
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';
        const taskTextNode = document.createElement('span');
        taskTextNode.className = 'task-text';
        taskTextNode.textContent = taskText;

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-pencil-alt';
        editIcon.style.cursor = 'pointer';
        editIcon.style.marginRight = '10px';

        editIcon.addEventListener('click', function() {
            taskInput.value = taskText;
            currentEditingTask = li;
            messageDiv.textContent = '';
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.className = 'delete-button';
        deleteBtn.addEventListener('click', function() {
            li.remove();
            updateTaskCount();
            messageDiv.textContent = 'To-Do item deleted successfully.';
            messageDiv.style.color = 'red';
        });

        taskContainer.appendChild(taskTextNode);
        taskContainer.appendChild(editIcon);
        li.appendChild(taskContainer);
        li.appendChild(deleteBtn);
        taskList.prepend(li);
        messageDiv.textContent = 'To-Do item created successfully.';
        messageDiv.style.color = 'green';
    }

    taskInput.value = '';
    updateTaskCount();
});

clearAllBtn.addEventListener('click', function() {
    taskList.innerHTML = '';
    currentEditingTask = null;
    taskInput.value = '';
    updateTaskCount();
    messageDiv.textContent = 'All tasks cleared successfully.';
    messageDiv.style.color = 'red';
});

toggleBackgroundBtn.addEventListener('click', function() {
    document.body.style.background = backgrounds[backgroundIndex];
    container.style.background = containerBackgrounds[containerBackgroundIndex];
    backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
    containerBackgroundIndex = (containerBackgroundIndex + 1) % containerBackgrounds.length;
});
