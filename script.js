// Elements ko select karna
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

// Naya task add karne ka function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Kripya koi task likhein!");
    return;
  }

  // Naya list item (li) banate hain
  const li = document.createElement("li");

  // Task ka text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Click karne par task complete/incomplete toggle ho
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateCounter();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounter();
  });

  // Sab kuch li ke andar daalna
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Input field khaali karna
  taskInput.value = "";
  taskInput.focus();

  updateCounter();
}

// Baaki tasks ki ginti update karna
function updateCounter() {
  const allTasks = document.querySelectorAll("#taskList li");
  const pendingTasks = document.querySelectorAll("#taskList li:not(.completed)");
  counter.textContent = `${pendingTasks.length} tasks baaki hain (Total: ${allTasks.length})`;
}

// Button click par task add ho
addBtn.addEventListener("click", addTask);

// Enter key dabane par bhi task add ho
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Shuru mein counter set karna
updateCounter();