const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const dateInput = document.getElementById("task-date");
const list = document.getElementById("task-list");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = `<strong>${task.text}</strong><br><small>${formatDate(task.dateTime)}</small>`;
    if (task.completed) info.classList.add("completed");

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const newTask = {
    text: input.value,
    dateTime: dateInput.value,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  input.value = "";
  dateInput.value = "";
});

function formatDate(dt) {
  const date = new Date(dt);
  return date.toLocaleString();
}

renderTasks();
