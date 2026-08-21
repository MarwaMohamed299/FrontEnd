var priority;
(function (priority) {
    priority["low"] = "low";
    priority["medium"] = "medium";
    priority["high"] = "high";
})(priority || (priority = {}));
var status;
(function (status) {
    status["todo"] = "todo";
    status["inProgress"] = "inProgress";
    status["done"] = "done";
})(status || (status = {}));
class task {
    id = Math.floor(Math.random() * 1000000);
    title = "";
    dueDate = new Date();
    priority = priority.low;
    description = "";
    status = status.todo;
}
loadTasks();
showTasks();
const titleInput = document.getElementById("task-title");
const dueDateInput = document.getElementById("task-date");
const prioritySelect = document.getElementById("task-priority");
const descriptionInput = document.getElementById("task-description");
const saveButton = document.getElementById("save-task");
function saveToLocalStorage(key, value) {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
}
function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}
function loadFromLocalStorage(key) {
    const tasks = {};
    if (key) {
        const serializedValue = localStorage.getItem(key);
        serializedValue ? (tasks[key] = JSON.parse(serializedValue)) : null;
        return serializedValue ? tasks : null;
    }
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const savedTask = localStorage.getItem(key);
        if (savedTask) {
            tasks[key] = JSON.parse(savedTask);
        }
    }
    console.log("Loaded tasks from localStorage:", tasks);
    return tasks;
}
saveButton.addEventListener("click", () => {
    console.log("Creating task...");
    const newTask = new task();
    newTask.id = Math.floor(Math.random() * 1000000);
    newTask.title = titleInput.value;
    newTask.dueDate = new Date(dueDateInput.value);
    newTask.priority = prioritySelect.value;
    newTask.description = descriptionInput.value;
    newTask.status = status.todo;
    console.log(newTask);
    createTask(newTask);
});
function createTask(task) {
    console.log("Creating task:", task.title, task.dueDate, task.priority, task.description);
    saveToLocalStorage(`${task.id}`, task);
}
function deleteTask(key) {
    console.log("Deleting task with key:", key);
    removeFromLocalStorage(key);
    showTasks();
}
window.deleteTask = deleteTask;
function editTask(key) {
    console.log("Editing task with key:", key);
    loadFromLocalStorage(key);
    const savedTasks = loadFromLocalStorage(null);
    if (!savedTasks)
        return;
}
function loadTasks() {
    loadFromLocalStorage(null);
}
function showTasks() {
    const savedTasks = loadFromLocalStorage(null);
    if (!savedTasks)
        return;
    const tasksArray = Object.values(savedTasks);
    const todoList = document.getElementById("todo-list");
    const progressList = document.getElementById("progress-list");
    const completedList = document.getElementById("completed-list");
    todoList.innerHTML = displayTasks(tasksArray, status.todo);
    progressList.innerHTML = displayTasks(tasksArray, status.inProgress);
    completedList.innerHTML = displayTasks(tasksArray, status.done);
}
function displayTasks(tasks, selectedStatus) {
    let tasksContainer = "";
    for (const currentTask of tasks) {
        if (currentTask.status !== selectedStatus)
            continue;
        tasksContainer += `
      <article class="task-card">
        <h3>${currentTask.title}</h3>

        <p class="description">
         #${currentTask.id}
        </p>

        <p class="description">
          ${currentTask.description}
        </p>


        <div class="badges">
          <span class="pill priority-${currentTask.priority}">
            ${currentTask.priority}
          </span>

          <span class="pill status-${currentTask.status}">
            ${currentTask.status}
          </span>
        </div>

        <p class="due">
          Due: ${new Date(currentTask.dueDate).toLocaleDateString()}
        </p>


        <button class="btn btn-info" onclick="startTask('${currentTask.id}')">
        start
        </button>
        <button class="btn btn-white" onclick="finishTask('${currentTask.id}')">
        Finish
        </button>
         <button class="edit-button btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#taskModal" onclick="editTask('${currentTask.id}')">
        Edit
        </button>
        <button class="delete-button btn btn-danger" onclick="deleteTask('${currentTask.id}')">
        Delete
        </button>

      </article>

    `;
    }
    return tasksContainer;
}
function startTask(key) {
    const savedTasks = loadFromLocalStorage(key);
    if (!savedTasks) {
        return;
    }
    else {
        const savedTask = savedTasks[key];
        console.log(savedTask);
        savedTask.status = status.inProgress;
        saveToLocalStorage(key, savedTask);
    }
    showTasks();
}
window.startTask = startTask;
function finishTask(key) {
    const savedTasks = loadFromLocalStorage(key);
    if (!savedTasks) {
        return;
    }
    else {
        const savedTask = savedTasks[key];
        console.log(savedTask);
        savedTask.status = status.done;
        saveToLocalStorage(key, savedTask);
    }
    showTasks();
}
window.finishTask = finishTask;
export {};
