let tasks = [
  {
    id: 1,
    title: "Прочитать теорию по JS",
    priority: "высокий",
    done: false,
  },
  {
    id: 2,
    title: "Написать функции из шага 4",
    priority: "средний",
    done: false,
  },
  {
    id: 3,
    title: "Сделать самостоятельное задание",
    priority: "низкий",
    done: false,
  },
];

let nextId = 4;
let currentFilter = "all";

function createTask(title, priority) {
  return {
    id: nextId++,
    title: title,
    priority: priority,
    done: false,
  };
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.done);
  }
  if (currentFilter === "done") {
    return tasks.filter((task) => task.done);
  }
  return tasks;
}

function countActive() {
  return tasks.filter((task) => !task.done).length;
}

const tasksList = document.getElementById("tasksList");
const counter = document.getElementById("counter");
const inputTitle = document.getElementById("inputTitle");
const inputPriority = document.getElementById("inputPriority");
const btnAdd = document.getElementById("btnAdd");
const errorMessage = document.getElementById("errorMessage");

function renderTasks() {
  const filtered = getFilteredTasks();
  const activeCount = countActive();
  counter.textContent = `Осталось: ${activeCount} из ${tasks.length}`;
  if (filtered.length === 0) {
    tasksList.innerHTML = '<p class ="empty-text">Задач нет!</p>';
    return;
  }
  tasksList.innerHTML = filtered.map((task) => createTaskHTML(task)).join("");
}

function createTaskHTML(task) {
  const cardClass = task.done ? "task-card done" : "task-card";
  const checked = task.done ? "checked" : "";
  return `
    <div class="${cardClass}" data-id="${task.id}">
    <input type="checkbox" class="task-checkbox" ${checked}
        onchange="handleToggle(${task.id})">
        <div class="task-info">
        <p class="task-title">${task.title}</p>
        <span class="task-priority ${task.priority}">${task.priority}</span>
        </div>
        <button onclick="handleDelete(${task.id})">Удалить</button>
        </div>
        `;
}

function handleAdd() {
  const title = inputTitle.value.trim();
  const priority = inputPriority.value;
  errorMessage.textContent = "";
  if (!title) {
    errorMessage.textContent = "Введите название задачи";
    inputTitle.focus();
    return;
  }
  const newTask = createTask(title, priority);
  tasks.push(newTask);
  inputTitle.value = "";
  renderTasks();
}

function handleDelete(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function handleToggle(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
  }
  renderTasks();
}

function handleFilterChange(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
}

btnAdd.addEventListener("click", handleAdd);

inputTitle.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleAdd();
  }
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    handleFilterChange(this.dataset.filter);
  });
});

renderTasks();
