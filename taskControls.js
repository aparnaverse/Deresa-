// =========================
// SEARCH AND FILTER CONTROLS
// =========================


// Current Filter
let currentFilter = "all";


// Search Input
const searchInput =
  document.getElementById("searchInput");


// Filter Buttons
const filterButtons =
  document.querySelectorAll(".filter-btn");


// =========================
// GET FILTERED TASKS
// =========================

function getFilteredTasks() {

  const searchText =
    searchInput.value
      .toLowerCase()
      .trim();


  return tasks.filter(task => {

    // Search Match
    const matchesSearch =
      task.text
        .toLowerCase()
        .includes(searchText);


    // Filter Match
    let matchesFilter = true;


    if (currentFilter === "pending") {

      matchesFilter =
        !task.completed;

    }


    if (currentFilter === "completed") {

      matchesFilter =
        task.completed;

    }


    return (
      matchesSearch &&
      matchesFilter
    );

  });

}


// =========================
// SEARCH EVENT
// =========================

searchInput.addEventListener(
  "input",
  () => {

    renderTasks();

  }
);


// =========================
// FILTER BUTTON EVENTS
// =========================

filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      currentFilter =
        button.dataset.filter;


      filterButtons.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });


      button.classList.add(
        "active"
      );


      renderTasks();

    }
  );

});