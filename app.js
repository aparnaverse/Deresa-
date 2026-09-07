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


    if (task.completed) {

      li.classList.add(
        "completed"
      );

    }


    // TASK TEXT
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


    // TASK DETAILS
    const details =
      document.createElement("div");

    details.classList.add(
      "task-details"
    );


    // PRIORITY
    const priority =
      document.createElement("span");

    priority.classList.add(
      "priority",
      task.priority
    );

    priority.textContent =
      `Priority: ${task.priority}`;


    // DUE DATE
    const dueDate =
      document.createElement("span");

    dueDate.classList.add(
      "due-date"
    );

    dueDate.textContent =
      task.dueDate
        ? `Due: ${task.dueDate}`
        : "No due date";


    details.appendChild(priority);
    details.appendChild(dueDate);


    // EDIT BUTTON
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


    // DELETE BUTTON
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

        deleteTask(task.id);

        renderTasks();

      }
    );


    // ADD TO LI
    li.appendChild(taskText);
    li.appendChild(details);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

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
    `${pending} tasks pending (Total: ${total})`;

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