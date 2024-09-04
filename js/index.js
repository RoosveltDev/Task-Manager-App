// Create task button
const body = document.querySelector("body");
const listTask = document.querySelector("#list-task");
const listTaskButton = document.querySelector(".list-task__button");
const newTask = document.querySelector(".new-task");
const createTaskButton = document.querySelector(".list-task__create > button");
const newTaskHeaderImg = document.querySelector(".new-task__header-img");

// Variables
let CreateCategory = "";
let CreateStatus = "";

// Handlers
const HandlerClickCategory = (e) => {
  // Get category
  CreateCategory = e.textContent;

  // Remove active class from other buttons
  for (const button of e.parentNode.children)
    button.classList.remove("list-task__filter-button--active");

  e.classList.add("list-task__filter-button--active");
};

const HandlerClickStatus = (e) => {
  // Get status
  CreateStatus = e.textContent;

  // Remove active class from other buttons
  for (const button of e.parentNode.children) {
    button.classList.remove("list-task__filter-button--active");
  }

  e.classList.add("list-task__filter-button--active");
};

// Html template for task item
const taskItem = (data) =>
  `<li class="list-task__item">
      <div class="list-task__item__conteiner">
        <div class="list-task__item__information">
          <div
            class="list-task__item__icon"
            style="background-color: var(--color-tertiary)"
          ></div>
          <div class="list-task__item__details-text">
            <span class="list-task__item__details-text_tilte">
              ${data.task}
            </span>
            <span class="list-task__item__details-text_date">2 Days ago</span>
          </div>
        </div>
        <div class="list-task__item__more-options">⋮</div>
      </div>
    </li>`;

// Click event
listTaskButton.addEventListener("click", () => {
  const width = window.innerWidth;

  // Show new task form
  if (width <= 768) {
    listTask.classList.toggle("d-none")
  }
  body.classList.toggle("d-flex");
  newTask.classList.toggle("new-task__show");
});

createTaskButton.addEventListener("click", () => {
  const formData = {
    task: document.querySelector("#task").value,
    description: document.querySelector("#description").value,
    dateStart: document.querySelector("#date-start").value,
    dateEnd: document.querySelector("#date-end").value,
    category: CreateCategory,
    status: CreateStatus,
  };

  // Validate
  if (formData.category == "" || formData.status == "") {
    alert("Datos invalidos");
    return;
  }

  // Render task
  listTask.innerHTML += taskItem(formData);

  // Save in localstorage

  // Reset global data
  CreateCategory = "";
  CreateStatus = "";
});

newTaskHeaderImg.addEventListener("click", () => {
  // Show new task form
  body.classList.remove("d-flex");
  newTask.classList.remove("new-task__show");
});
