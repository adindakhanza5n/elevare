let tasks = [];
let editIndex = null;

// CREATE
function addTask() {
  const titleInput = document.getElementById("taskTitle");
  const descInput = document.getElementById("taskDesc");
  const deadlineInput = document.getElementById("taskDeadline");

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const deadline = deadlineInput.value;

  if (title === "") {
    alert("Judul tugas tidak boleh kosong!");
    return;
  }

  const taskData = { 
    title, 
    desc, 
    deadline, 
    completed: false 
  };

  if (editIndex === null) {
    tasks.push(taskData);
  } else {
    taskData.completed = tasks[editIndex].completed;
    tasks[editIndex] = taskData;
    editIndex = null;
  }

  // reset input
  titleInput.value = "";
  descInput.value = "";
  deadlineInput.value = "";

  renderTasks();
}

// READ
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-info ${task.completed ? "completed" : ""}">
        <span class="task-title">${task.title}</span>
        ${task.desc ? `<span class="task-desc">${task.desc}</span>` : ""}
        ${task.deadline ? `<span class="task-deadline">Deadline: ${task.deadline}</span>` : ""}
      </div>
      <div>
        <button class="done-btn" onclick="toggleDone(${tasks.indexOf(task)})">✔</button>
        <button class="edit-btn" onclick="editTask(${tasks.indexOf(task)})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${tasks.indexOf(task)})">Hapus</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// UPDATE
function editTask(index) {
  const task = tasks[index];
  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDesc").value = task.desc;
  document.getElementById("taskDeadline").value = task.deadline;
  editIndex = index;
}

// TOGGLE DONE
function toggleDone(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
