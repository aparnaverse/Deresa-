// Elements ko select karna
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

// ===============================
// LOCAL STORAGE
// ===============================

// LocalStorage se tasks load karna
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Tasks ko LocalStorage me save karna
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// TASK RENDER
// ===============================

// Saare tasks screen par dikhana
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    // Naya list item
    const li = document.createElement("li");

    // Agar task completed hai
    if (task.completed) {
      li.classList.add("completed");
    }

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;

    // Complete / Incomplete toggle
    span.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;

      saveTasks();
      renderTasks();
    });

    // ===============================
    // EDIT BUTTON
    // ===============================

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", () => {
      editTask(index);
    });

    // ===============================
    // DELETE BUTTON
    // ===============================

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);

      saveTasks();
      renderTasks();
    });

    // Elements ko li me add karna
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCounter();
}

// ===============================
// ADD TASK
// ===============================

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please Enter Your Task...!");
    return;
  }

  // Task array me add karna
  tasks.push({
    text: taskText,
    completed: false
  });

  // LocalStorage me save
  saveTasks();

  // Screen update
  renderTasks();

  // Input clear
  taskInput.value = "";
  taskInput.focus();
}

// ===============================
// EDIT TASK
// ===============================

function editTask(index) {
  const updatedText = prompt(
    "Edit Your Task.:",
    tasks[index].text
  );

  // Cancel click kiya
  if (updatedText === null) {
    return;
  }

  // Empty task allow nahi
  if (updatedText.trim() === "") {
    alert("Task Can't be Empty!");
    return;
  }

  // Task update
  tasks[index].text = updatedText.trim();

  // LocalStorage update
  saveTasks();

  // Screen update
  renderTasks();
}

// ===============================
// COUNTER
// ===============================

function updateCounter() {
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    task => !task.completed
  ).length;

  counter.textContent =
    `${pendingTasks} Tasks are pending.(Total: ${totalTasks})`;
}

// ===============================
// EVENT LISTENERS
// ===============================

// Add button
addBtn.addEventListener("click", addTask);

// Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// ===============================
// INITIAL LOAD
// ===============================

// Page open hote hi tasks load honge
renderTasks();