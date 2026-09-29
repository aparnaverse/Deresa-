// =========================
// ELEMENTS
// =========================

const taskInput =
  document.getElementById("taskInput");

const priorityInput =
  document.getElementById("priorityInput");

const dueDateInput =
  document.getElementById("dueDateInput");

const addBtn =
  document.getElementById("addBtn");

const taskList =
  document.getElementById("taskList");

const counter =
  document.getElementById("counter");


// =========================
// GET DUE DATE STATUS
// =========================

function getDueDateStatus(task) {

  if (!task.dueDate) {
    return {
      text: "No due date",
      className: "no-date"
    };
  }

  // Completed tasks
  if (task.completed) {
    return {
      text: `✓ Completed • Due: ${formatDate(task.dueDate)}`,
      className: "completed-date"
    };
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dueDate =
    new Date(`${task.dueDate}T00:00:00`);

  dueDate.setHours(0, 0, 0, 0);


  // Overdue
  if (dueDate < today) {

    return {
      text: `🔴 Overdue • Due: ${formatDate(task.dueDate)}`,
      className: "overdue"
    };

  }


  // Due today
  if (dueDate.getTime() === today.getTime()) {

    return {
      text: `🟠 Due Today • ${formatDate(task.dueDate)}`,
      className: "due-today"
    };

  }


  // Upcoming
  return {
    text: `🟢 Upcoming • ${formatDate(task.dueDate)}`,
    className: "upcoming"
  };

}


// =========================
// FORMAT DATE
// =========================

function formatDate(dateString) {

  const date =
    new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

}


// =========================
// RENDER TASKS
// =========================

function renderTasks() {

  taskList.innerHTML = "";


  // Search + Filtered Tasks
  const filteredTasks =
    getFilteredTasks();


  filteredTasks.forEach(task => {

    const li =
      document.createElement("li");


    // Completed task
    if (task.completed) {

      li.classList.add("completed");

    }


    // =========================
    // TASK TEXT
    // =========================

    const taskText =
      document.createElement("span");

    taskText.textContent =
      task.text;

    taskText.classList.add(
      "task-text"
    );


    taskText.addEventListener(
      "click",
      () => {

        toggleTask(task.id);

        renderTasks();

      }
    );


    // =========================
    // TASK DETAILS
    // =========================

    const details =
      document.createElement("div");

    details.classList.add(
      "task-details"
    );


    // =========================
    // PRIORITY
    // =========================

    const priority =
      document.createElement("span");

    priority.classList.add(
      "priority",
      task.priority
    );

    priority.textContent =
      `Priority: ${task.priority}`;


    // =========================
    // DUE DATE
    // =========================

    const dueDate =
      document.createElement("span");

    const dueStatus =
      getDueDateStatus(task);

    dueDate.classList.add(
      "due-date",
      dueStatus.className
    );

    dueDate.textContent =
      dueStatus.text;


    details.appendChild(priority);

    details.appendChild(dueDate);


    // =========================
    // BUTTON CONTAINER
    // =========================

    const actions =
      document.createElement("div");

    actions.classList.add(
      "task-actions"
    );


    // =========================
    // EDIT BUTTON
    // =========================

    const editBtn =
      document.createElement("button");

    editBtn.textContent =
      "Edit";

    editBtn.classList.add(
      "edit-btn"
    );


    editBtn.addEventListener(
      "click",
      () => {

        const updatedText =
          prompt(
            "Edit task:",
            task.text
          );


        if (
          updatedText !== null &&
          updatedText.trim() !== ""
        ) {

          updateTask(
            task.id,
            updatedText.trim()
          );

          renderTasks();

        }

      }
    );


    // =========================
    // DELETE BUTTON
    // =========================

    const deleteBtn =
      document.createElement("button");

    deleteBtn.textContent =
      "Delete";

    deleteBtn.classList.add(
      "delete-btn"
    );


    deleteBtn.addEventListener(
      "click",
      () => {

        const confirmDelete =
          confirm(
            "Are you sure you want to delete this task?"
          );


        if (confirmDelete) {

          deleteTask(task.id);

          renderTasks();

        }

      }
    );


    // =========================
    // ADD BUTTONS
    // =========================

    actions.appendChild(editBtn);

    actions.appendChild(deleteBtn);


    // =========================
    // ADD TO LI
    // =========================

    li.appendChild(taskText);

    li.appendChild(details);

    li.appendChild(actions);

    taskList.appendChild(li);

  });


  updateCounter();

}


// =========================
// ADD TASK
// =========================

function addTask() {

  const taskText =
    taskInput.value.trim();

  const priority =
    priorityInput.value;

  const dueDate =
    dueDateInput.value;


  if (taskText === "") {

    alert(
      "Please enter a task!"
    );

    return;

  }


  createTask(
    taskText,
    priority,
    dueDate
  );


  renderTasks();


  // Reset inputs
  taskInput.value = "";

  priorityInput.value =
    "medium";

  dueDateInput.value = "";

  taskInput.focus();

}


// =========================
// COUNTER
// =========================

function updateCounter() {

  const total =
    tasks.length;

  const pending =
    tasks.filter(
      task => !task.completed
    ).length;


  counter.textContent =
    `${pending} tasks pending • Total: ${total}`;

}


// =========================
// EVENT LISTENERS
// =========================

addBtn.addEventListener(
  "click",
  addTask
);


taskInput.addEventListener(
  "keypress",
  event => {

    if (event.key === "Enter") {

      addTask();

    }

  }
);


// =========================
// INITIAL LOAD
// =========================

renderTasks();