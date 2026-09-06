// LocalStorage key
const STORAGE_KEY = "deresaTasks";

// Tasks load karna
function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  return savedTasks
    ? JSON.parse(savedTasks)
    : [];
}

// Tasks save karna
function saveTasks(tasks) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
}