export {};
enum priority {
  low = "low",
  medium = "medium",
  high = "high",
}

enum status {
  todo = "todo",
  inProgress = "inProgress",
  done = "done",
}
class task {
  id: number = Math.floor(Math.random() * 1000000);
  title: string = "";
  dueDate: Date = new Date();
  priority: priority = priority.low;
  description: string = "";
  status: status = status.todo;
}

loadTasks();
showTasks();
const titleInput = document.getElementById("task-title") as HTMLInputElement;
const dueDateInput = document.getElementById("task-date") as HTMLInputElement;
const prioritySelect = document.getElementById(
  "task-priority",
) as HTMLSelectElement;
const descriptionInput = document.getElementById(
  "task-description",
) as HTMLTextAreaElement;
const saveButton = document.getElementById("save-task") as HTMLButtonElement;
const modalTitle = document.getElementById("modal-title") as HTMLHeadingElement;
const newTaskButton = document.getElementById("new-task") as HTMLButtonElement;
let editingTaskKey: string | null = null;

function saveToLocalStorage<T>(key: string, value: T): void {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
}

function removeFromLocalStorage<T>(key: string): void {
  localStorage.removeItem(key);
}

function loadFromLocalStorage<T>(key: string | null): Record<string, T> | null {
  const tasks: Record<string, T> = {};
  if (key) {
    const serializedValue = localStorage.getItem(key);
    serializedValue ? (tasks[key] = JSON.parse(serializedValue)) : null;
    return serializedValue ? tasks : null;
  }
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const savedTask = localStorage.getItem(key!);
    if (savedTask) {
      tasks[key!] = JSON.parse(savedTask);
    }
  }
  console.log("Loaded tasks from localStorage:", tasks);
  return tasks;
}
saveButton.addEventListener("click", () => {
  if (editingTaskKey) {
    const savedTasks = loadFromLocalStorage<task>(editingTaskKey);
    if (!savedTasks) return;

    const savedTask = savedTasks[editingTaskKey];
    savedTask.title = titleInput.value;
    savedTask.dueDate = new Date(dueDateInput.value);
    savedTask.priority = prioritySelect.value as priority;
    savedTask.description = descriptionInput.value;
    saveToLocalStorage(editingTaskKey, savedTask);
  } else {
  console.log("Creating task...");
  const newTask = new task();
  newTask.id = Math.floor(Math.random() * 1000000);
  newTask.title = titleInput.value;
  newTask.dueDate = new Date(dueDateInput.value);
  newTask.priority = prioritySelect.value as priority;
  newTask.description = descriptionInput.value;
  newTask.status = status.todo;
  console.log(newTask);
  createTask(newTask);
  }
});

function createTask(task: task) {
  console.log(
    "Creating task:",
    task.title,
    task.dueDate,
    task.priority,
    task.description,
  );
  saveToLocalStorage(`${task.id}`, task);
}


function deleteTask(key: string) {
  console.log("Deleting task with key:", key);
  removeFromLocalStorage(key);
  showTasks();
}
(window as any).deleteTask = deleteTask;

function editTask(key: string) {
  console.log("Editing task with key:", key);
  const savedTasks = loadFromLocalStorage<task>(key);
  if (!savedTasks) return;

  const savedTask = savedTasks[key];
  editingTaskKey = key;
  titleInput.value = savedTask.title;
  dueDateInput.value = new Date(savedTask.dueDate).toISOString().split("T")[0];
  prioritySelect.value = savedTask.priority;
  descriptionInput.value = savedTask.description;
  modalTitle.innerText = "Edit task";
  saveButton.innerText = "Save changes";
}
(window as any).editTask = editTask;

function resetTaskModal() {
  editingTaskKey = null;
  (document.getElementById("task-form") as HTMLFormElement).reset();
  modalTitle.innerText = "Create task";
  saveButton.innerText = "Create task";
}
newTaskButton.addEventListener("click", resetTaskModal);

function loadTasks() {
  loadFromLocalStorage(null);
}
function showTasks(): void {
  const savedTasks = loadFromLocalStorage<task>(null);

  if (!savedTasks) return;

  const tasksArray = Object.values(savedTasks);

  const todoList = document.getElementById("todo-list")!;
  const progressList = document.getElementById("progress-list")!;
  const completedList = document.getElementById("completed-list")!;

  todoList.innerHTML = displayTasks(tasksArray, status.todo);

  progressList.innerHTML = displayTasks(tasksArray, status.inProgress);

  completedList.innerHTML = displayTasks(tasksArray, status.done);
}
function displayTasks(tasks: task[], selectedStatus: status): string {
  let tasksContainer = "";

  for (const currentTask of tasks) {
    if (currentTask.status !== selectedStatus) continue;

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

function startTask(key:string){
const savedTasks = loadFromLocalStorage(key)
if(!savedTasks){
    return;
}
else
{
    const savedTask = savedTasks[key] as task
    console.log(savedTask);
    savedTask.status = status.inProgress;
    saveToLocalStorage(key,savedTask)

}
showTasks();
}

(window as any).startTask = startTask

function finishTask(key:string){
const savedTasks = loadFromLocalStorage(key)
if(!savedTasks){
    return;
}
else
{
    const savedTask = savedTasks[key] as task
    console.log(savedTask);
    savedTask.status = status.done;
    saveToLocalStorage(key,savedTask)

}
showTasks();
}

(window as any).finishTask = finishTask
