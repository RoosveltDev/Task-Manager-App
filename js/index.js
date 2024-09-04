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
document
    .getElementById("button-new-task")
    .addEventListener("click", function() {
        document.querySelector(".list-task").classList.toggle("hidden");
        document.querySelector(".new-task").classList.toggle("hidden");
    });

document
    .getElementById("button-back-list-task")
    .addEventListener("click", function() {
        document.querySelector(".new-task").classList.toggle("hidden");
        document.querySelector(".list-task").classList.toggle("hidden");
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