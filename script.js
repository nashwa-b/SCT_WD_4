
let lists = [{ name: "Default", tasks: [] }];
let currentListIndex = 0;



function addTask() {
  const input = document.getElementById("task-input");
  const date = document.getElementById("task-date");
  const priority = document.getElementById("task-priority");
  if (input.value.trim() === "") return;

  const desc = document.getElementById("task-desc");
  const task = {
    id: Date.now(),
    text: input.value,
    desc: desc.value,
    date: date.value,
    priority: priority.value,
    completed: false
  };

  lists[currentListIndex].tasks.push(task);
  input.value = "";
  date.value = "";
  priority.value = "Medium";
  renderTasks();
}



function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  const tasks = lists[currentListIndex].tasks;
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");
    li.innerHTML = `
      <div>
        <strong>${task.text}</strong> <span class="priority">[${task.priority}]</span><br/>
        <small>${task.date ? new Date(task.date).toLocaleString() : ""}</small>
      </div>
      <div>
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
    li.innerHTML += `<em>${task.desc ? task.desc : ""}</em><br/>`;
    list.appendChild(li);
  });
}


function toggleTask(id) {
  const tasks = lists[currentListIndex].tasks;
  lists[currentListIndex].tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}



function editTask(id) {
  const newText = prompt("Edit task:");
  const newDate = prompt("Edit date (YYYY-MM-DDTHH:MM):");
  const newPriority = prompt("Edit priority (High, Medium, Low):");
  const newDesc = prompt("Edit description:");
  if (newText !== null) {
    const tasks = lists[currentListIndex].tasks;
    lists[currentListIndex].tasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText, desc: newDesc || task.desc, date: newDate || task.date, priority: newPriority || task.priority } : task
    );
    renderTasks();
  }
}


function deleteTask(id) {
  lists[currentListIndex].tasks = lists[currentListIndex].tasks.filter(task => task.id !== id);
  renderTasks();
}

function renderLists() {
  const select = document.getElementById("list-select");
  select.innerHTML = "";
  lists.forEach((list, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = list.name;
    select.appendChild(option);
  });
  select.value = currentListIndex;
}

function addList() {
  const input = document.getElementById("new-list-input");
  const name = input.value.trim();
  if (!name) return;
  lists.push({ name, tasks: [] });
  currentListIndex = lists.length - 1;
  input.value = "";
  renderLists();
  renderTasks();
}

document.getElementById("add-list-btn").onclick = addList;
document.getElementById("list-select").onchange = function(e) {
  currentListIndex = parseInt(e.target.value);
  renderTasks();
};

// Initial render
renderLists();
renderTasks();
