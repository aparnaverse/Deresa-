// LocalStorage se tasks load
let tasks = loadTasks();


// =========================
// CREATE TASK
// =========================

function createTask(text, priority, dueDate) {

  const newTask = {
    id: Date.now(),
    text: text,
    priority: priority,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(newTask);

  saveTasks(tasks);
}


// =========================
// COMPLETE TASK
// =========================

function toggleTask(taskId) {

  tasks = tasks.map(task => {

    if (task.id === taskId) {
      task.completed = !task.completed;
    }

    return task;
  });

  saveTasks(tasks);
}


// =========================
// DELETE TASK
// =========================

function deleteTask(taskId) {

  tasks = tasks.filter(task =>
    task.id !== taskId
  );

  saveTasks(tasks);
}


// =========================
// EDIT TASK
// =========================

function updateTask(taskId, updatedText) {

  tasks = tasks.map(task => {

    if (task.id === taskId) {
      task.text = updatedText;
    }

    return task;
  });

  saveTasks(tasks);
}