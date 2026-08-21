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
    loadFromLocalStorage(key);
  const savedTasks = loadFromLocalStorage<task>(null);
  if (!savedTasks) return;
}

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