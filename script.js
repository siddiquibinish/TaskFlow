
const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('#taskinput');
const tasksList = document.querySelector('.tasks-list');
const searchInput = document.querySelector('.search-box input');
const filterTabs = document.querySelectorAll('.tab');

// Dashboard elements
const totalTasksDisplay = document.getElementById('totalTasks');
const activeTasksDisplay = document.getElementById('activeTasks');
const completedTasksDisplay = document.getElementById('completedTasks');
const progressDisplay = document.getElementById('progressPercentage');

// Local Storage se tasks load karein
let tasks = JSON.parse(localStorage.getItem('taskflow_data')) || [];

let currentFilter = 'all';
let searchQuery = '';

// ==========================================
// 1. SAVE TASKS
// ==========================================
function saveTasks() {
    localStorage.setItem('taskflow_data', JSON.stringify(tasks));
}

// ==========================================
// 2. RENDER TASKS
// ==========================================
function renderTasks() {
    tasksList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchQuery);

        const matchesFilter =
            currentFilter === 'all' ? true :
            currentFilter === 'active' ? !task.completed :
            currentFilter === 'completed' ? task.completed :
            true;

        return matchesSearch && matchesFilter;
    });

    // --- EMPTY STATE LOGIC ---
   if (tasks.length === 0) {
        // Situation 1: Koi task add nahi hua
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-clipboard"></i>
                <p>No tasks yet. Add a new task above to get started!</p>
            </div>
        `;
    } else if (filteredTasks.length === 0) {
        // Situation 2: Search ya filter se koi match nahi mila
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>No tasks found matching your current search or filter.</p>
            </div>
        `;
    } else {
        // Normal Situation: Tasks render karein (Aapka accessibility wala code)
        filteredTasks.forEach(task => {
            const taskCard = document.createElement('div');

            taskCard.className = `task-card ${
                task.completed ? 'completed' : ''
            }`;

            taskCard.dataset.id = task.id;

            taskCard.innerHTML = `
                <div class="task-header">
                    <div class="task-title-group">
                        <div class="radio-circle"></div>
                        <h3 class="task-title"></h3>
                    </div>

                    <button class="delete-btn" aria-label="Delete task">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>

                <div class="task-tags">
                    <span class="tag tag-blue">
                        <i class="fa-solid fa-tag"></i> User Task
                    </span>
                </div>
            `;

            // User input ko HTML ke bajaye text ke taur par insert karein
            taskCard.querySelector('.task-title').textContent = task.title;

            // Completed state ko keyboard aur screen readers ke liye bhi describe karein
            const completeButton = taskCard.querySelector('.radio-circle');
            completeButton.setAttribute('role', 'button');
            completeButton.setAttribute('tabindex', '0');
            completeButton.setAttribute(
                'aria-label',
                task.completed ? 'Mark task active' : 'Mark task completed'
            );

            tasksList.appendChild(taskCard);
        });
    }

    updateStats();
}

// ==========================================
// 3. UPDATE DASHBOARD STATISTICS
// ==========================================
function updateStats() {
    // Statistics hamesha poori tasks array se calculate hongi
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const activeTasks = totalTasks - completedTasks;

    const progressPercentage = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    if (totalTasksDisplay) {
        totalTasksDisplay.textContent = totalTasks;
    }

    if (activeTasksDisplay) {
        activeTasksDisplay.textContent = activeTasks;
    }

    if (completedTasksDisplay) {
        completedTasksDisplay.textContent = completedTasks;
    }

    if (progressDisplay) {
        progressDisplay.textContent = `${progressPercentage}%`;
    }

    // Filter badges
    const badgeAll = document.getElementById('badge-all');
    const badgeActive = document.getElementById('badge-active');

    if (badgeAll) {
        badgeAll.textContent = totalTasks;
    }

    if (badgeActive) {
        badgeActive.textContent = activeTasks;
    }
}

// ==========================================
// 4. ADD NEW TASK
// ==========================================
addTaskBtn.addEventListener('click', function() {
    const taskName = taskInput.value.trim();

    if (!taskName) {
        alert('Please enter a task name first!');
        return;
    }

    const newTask = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        title: taskName,
        completed: false
    };

    tasks.unshift(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = '';
    taskInput.focus();
});

// Enter press karne par bhi task add ho
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTaskBtn.click();
    }
});

// ==========================================
// 5. DELETE AND COMPLETE TASKS
// ==========================================
function handleTaskAction(event) {
    const deleteButton = event.target.closest('.delete-btn');
    const radioCircle = event.target.closest('.radio-circle');

    // Delete task
    if (deleteButton) {
        const taskCard = deleteButton.closest('.task-card');

        if (!taskCard) return;

        const taskId = taskCard.dataset.id;

        tasks = tasks.filter(task => task.id !== taskId);

        saveTasks();
        renderTasks();
        return;
    }

    // Complete / reactivate task
    if (radioCircle) {
        const taskCard = radioCircle.closest('.task-card');

        if (!taskCard) return;

        const taskId = taskCard.dataset.id;

        const task = tasks.find(task => task.id === taskId);

        if (!task) return;

        task.completed = !task.completed;

        saveTasks();
        renderTasks();
    }
}

tasksList.addEventListener('click', handleTaskAction);

// Radio circle ko keyboard se bhi operate kar sakein
tasksList.addEventListener('keydown', function(event) {
    if (
        event.target.matches('.radio-circle') &&
        (event.key === 'Enter' || event.key === ' ')
    ) {
        event.preventDefault();
        handleTaskAction(event);
    }
});

// ==========================================
// 6. SEARCH TASKS
// ==========================================
searchInput.addEventListener('input', function() {
    searchQuery = this.value.toLowerCase().trim();
    renderTasks();
});

// ==========================================
// 7. FILTER TABS
// ==========================================
filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        filterTabs.forEach(item => {
            item.classList.remove('active-tab');
        });

        this.classList.add('active-tab');

        currentFilter = this.dataset.filter || 'all';

        renderTasks();
    });
});

// ==========================================
// 8. INITIAL LOAD
// ==========================================
renderTasks();
