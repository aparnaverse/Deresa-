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

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");

  editBtn.addEventListener("click", () => {
    editTask(li, span);
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
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  // Input field khaali karna
  taskInput.value = "";
  taskInput.focus();

  updateCounter();
}

// Task edit karne ka function
function editTask(li, span) {
  const currentText = span.textContent;

  // Input create karna
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;
  editInput.classList.add("edit-input");

  // Save button
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.classList.add("save-btn");

  // Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("cancel-btn");

  // Purane elements temporarily hide karna
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  span.style.display = "none";
  editBtn.style.display = "none";
  deleteBtn.style.display = "none";

  // Edit input aur buttons add karna
  li.appendChild(editInput);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);

  editInput.focus();

  // Save task
  saveBtn.addEventListener("click", () => {
    const updatedText = editInput.value.trim();

    if (updatedText === "") {
      alert("Task khaali nahi ho sakta!");
      return;
    }

    span.textContent = updatedText;

    editInput.remove();
    saveBtn.remove();
    cancelBtn.remove();

    span.style.display = "inline";
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
  });

  // Cancel editing
  cancelBtn.addEventListener("click", () => {
    editInput.remove();
    saveBtn.remove();
    cancelBtn.remove();

    span.style.display = "inline";
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
  });
}

// Baaki tasks ki ginti update karna
function updateCounter() {
  const allTasks = document.querySelectorAll("#taskList li");
  const pendingTasks = document.querySelectorAll(
    "#taskList li:not(.completed)"
  );

  counter.textContent =
    `${pendingTasks.length} tasks baaki hain (Total: ${allTasks.length})`;
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