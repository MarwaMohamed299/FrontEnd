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
const modalTitle = document.getElementById("modal-title");
const newTaskButton = document.getElementById("new-task");
let editingTaskKey = null;
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
    if (editingTaskKey) {
        const savedTasks = loadFromLocalStorage(editingTaskKey);
        if (!savedTasks)
            return;
        const savedTask = savedTasks[editingTaskKey];
        savedTask.title = titleInput.value;
        savedTask.dueDate = new Date(dueDateInput.value);
        savedTask.priority = prioritySelect.value;
        savedTask.description = descriptionInput.value;
        saveToLocalStorage(editingTaskKey, savedTask);
    }
    else {
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
    }
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
    const savedTasks = loadFromLocalStorage(key);
    if (!savedTasks)
        return;
    const savedTask = savedTasks[key];
    editingTaskKey = key;
    titleInput.value = savedTask.title;
    dueDateInput.value = new Date(savedTask.dueDate).toISOString().split("T")[0];
    prioritySelect.value = savedTask.priority;
    descriptionInput.value = savedTask.description;
    modalTitle.innerText = "Edit task";
    saveButton.innerText = "Save changes";
}
window.editTask = editTask;
function resetTaskModal() {
    editingTaskKey = null;
    document.getElementById("task-form").reset();
    modalTitle.innerText = "Create task";
    saveButton.innerText = "Create task";
}
newTaskButton.addEventListener("click", resetTaskModal);
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
        <div class="task-top">
          <span></span>
          <div class="card-menu">
            <button class="icon-button edit-button" data-bs-toggle="modal"
            data-bs-target="#taskModal" onclick="editTask('${currentTask.id}')"
            title="Edit task" aria-label="Edit task">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="icon-button delete" onclick="deleteTask('${currentTask.id}')"
            title="Delete task" aria-label="Delete task">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

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
        <i class="fa-solid fa-play"></i> start
        </button>
        <button class="btn btn-white" onclick="finishTask('${currentTask.id}')">
        <i class="fa-solid fa-check"></i> Finish
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
