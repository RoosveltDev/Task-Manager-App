// Create task button
const body = document.querySelector("body");
const listTask = document.querySelector("#list-task");
const listTaskButton = document.querySelector(".list-task__button");
const newTask = document.querySelector(".new-task");
const createTaskButton = document.querySelector(".list-task__create > button");
const newTaskHeaderImg = document.querySelector(".new-task__header-img");

// Task list
let tasks = [];
let ID_TASK = 0;
const STORAGE_KEY = {
  TASKS: "TASKS",
};

// Variables
let CreateCategory = "";
let CreateStatus = "";

// Handlers
const HandlerClickCategory = (e) => {
  // Get category
  CreateCategory = e.textContent;

  // Remove active class from other buttons
  for (const button of e.parentNode.children)
    button.classList.remove("list-task__button--active");

  e.classList.add("list-task__button--active");
};

const HandlerClickStatus = (e) => {
  // Get status
  CreateStatus = e.textContent;

  // Remove active class from other buttons
  for (const button of e.parentNode.children) {
    button.classList.remove("list-task__button--active");
  }

  e.classList.add("list-task__button--active");
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
// document
//   .getElementById("button-new-task")
//   .addEventListener("click", function () {
//     document.querySelector(".list-task").classList.toggle("hidden");
//     document.querySelector(".new-task").classList.toggle("hidden");
//   });

// document
//   .getElementById("button-back-list-task")
//   .addEventListener("click", function () {
//     document.querySelector(".new-task").classList.toggle("hidden");
//     document.querySelector(".list-task").classList.toggle("hidden");
//   });

// createTaskButton.addEventListener("click", () => {
//   const formData = {
//     task: document.querySelector("#task").value,
//     description: document.querySelector("#description").value,
//     dateStart: document.querySelector("#date-start").value,
//     dateEnd: document.querySelector("#date-end").value,
//     category: CreateCategory,
//     status: CreateStatus,
//   };

//   // Validate
//   if (formData.category == "" || formData.status == "") {
//     alert("Datos invalidos");
//     return;
//   }

//   // Render task
//   listTask.innerHTML += taskItem(formData);

//   // Save in localstorage

//   // Reset global data
//   CreateCategory = "";
//   CreateStatus = "";
// });

// Lógica para manejar los botones de editar y eliminar
const editButtons = document.querySelectorAll(".list-task__edit");
const deleteButtons = document.querySelectorAll(".list-task__delete");

editButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const taskId = button.getAttribute("data-id");
    console.log(`Editar tarea con ID: ${taskId}`);
    modal.style.display = "block";
    // Aquí cargar los datos de la tarea en el modal
  });
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const taskId = button.getAttribute("data-id");
    console.log(`Eliminar tarea con ID: ${taskId}`);
    // Aquí eliminar la tarea de la lista y del almacenamiento
  });
});

// Obtener el modal
const modal = document.getElementById("modal");

// Obtener el botón que abre el modal
const btn = document.getElementById("button-new-task");

// Obtener el elemento <span> que cierra el modal
const span = document.getElementsByClassName("modal__close")[0];

// Cuando el usuario hace clic en el botón, abre el modal
btn.onclick = function () {
  modal.style.display = "block";
};

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function () {
  modal.style.display = "none";
};

// Cuando el usuario hace clic en cualquier lugar fuera del modal, cierra el modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Lógica para manejar la selección de botones
const categoryButtons = document.querySelectorAll(".modal__button--category");
const stateButtons = document.querySelectorAll(".modal__button--state");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) =>
      btn.classList.remove("modal__button--active")
    );
    button.classList.add("modal__button--active");
  });
});

stateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stateButtons.forEach((btn) =>
      btn.classList.remove("modal__button--active")
    );
    button.classList.add("modal__button--active");
  });
});

// Modal button
const modal__button = document.querySelector("#task-button-submit");

// Handle click on delete modal button
function DeleteTask(e) {
  console.log(e);
}

function EditTask(e) {
  console.log(e.target);
}

function CreateTask(params) {
  const li = document.createElement("li");
  li.classList.add("list-task__item");

  const div_conteiner = document.createElement("div");
  div_conteiner.classList.add("list-task__item__conteiner");

  const div_information = document.createElement("div");
  div_information.classList.add("list-task__item__information");

  const div_information__icon = document.createElement("div");
  div_information__icon.classList.add("list-task__item__icon");
  div_information__icon.style.backgroundColor = "var(--color-tertiary)";

  const div_information__details = document.createElement("div");
  div_information__details.classList.add("list-task__item__details-text");

  const span__title = document.createElement("span");
  span__title.classList.add("list-task__item__details-text_tilte");
  span__title.textContent = params.task;

  const span__date = document.createElement("span");
  span__date.classList.add("list-task__item__details-text_date");
  span__date.textContent = "2 days ago";

  const div_buttons = document.createElement("div");
  div_buttons.classList.add("list-task__buttons");

  const button_edit = document.createElement("a");
  button_edit.href = "#";
  // button_edit.id = `${ID_TASK}`;
  button_edit.title = "Editar";
  button_edit.dataset.id = params.id;
  button_edit.classList.add("list-task__edit");
  button_edit.textContent = "Editar";
  button_edit.onclick = EditTask;

  button_edit.appendChild(
    document.createElement("i").classList.add("fas", "fa-edit")
  );

  const button_delete = document.createElement("button");
  button_delete.href = "#";
  // button_delete.id = `${ID_TASK}`;
  button_delete.title = "Eliminar";
  button_delete.dataset.id = params.id;
  button_delete.classList.add("list-task__delete");
  button_delete.textContent = "Eliminar";
  button_delete.onclick = DeleteTask;

  button_delete.appendChild(
    document.createElement("i").classList.add("fas", "fa-trash")
  );

  div_options.appendChild(button_edit);
  div_options.appendChild(button_delete);

  div_information.appendChild(div_information__icon);
  div_information__details.append(span__title, span__date);
  div_information.appendChild(div_information__details);

  div_conteiner.append(div_information, div_options);

  li.appendChild(div_conteiner);

  return li;
}

// Handle click on modal button
modal__button.onclick = function (e) {
  e.preventDefault();

  // Create new task
  const taskData = {
    id: ID_TASK,
    task: document.querySelector("#task-name").value,
    description: document.querySelector("#task-description").value,
    dateStart: document.querySelector("#date-start").value,
    dateEnd: document.querySelector("#date-end").value,
    category: CreateCategory,
    status: CreateStatus,
  };

  // Render task
  listTask.appendChild(CreateTask(taskData));

  // Add to tasks list
  tasks.push(taskData);

  // Save localstorage
  localStorage.setItem(STORAGE_KEY.TASKS, JSON.stringify(tasks));

  // Increment id for task
  ID_TASK++;
};

// Load tasks from localstorage
document.onload = function () {
  const task_storage = localStorage.getItem(STORAGE_KEY.TASKS);
  if (task_storage == null) {
    alert("Sin tareas guardas");
    return;
  }

  tasks = JSON.parse(task_storage);

  for (const t of tasks) {
    listTask.appendChild(CreateTask(t));
  }
};
