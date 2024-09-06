import {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
  taskItem,
  capitalizeFirstLetter,
  setTodayDate,
  taskItemEdit,
} from "./utils.js";

let CreateCategory = "";
let CreateStatus = "";
let editingTaskId = null;
let selectedCategoryFilter = null;
let selectedStateFilter = null;

export function initializeTasks() {
  const categoryButtons = document.querySelectorAll(".modal__button--category");
  const stateButtons = document.querySelectorAll(".modal__button--state");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) =>
        btn.classList.remove("modal__button--active")
      );
      button.classList.add("modal__button--active");
      CreateCategory = button.getAttribute("data-value");
    });
  });

  stateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      stateButtons.forEach((btn) =>
        btn.classList.remove("modal__button--active")
      );
      button.classList.add("modal__button--active");
      CreateStatus = button.getAttribute("data-value");
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
    addTaskEventListeners();
  });
}

export function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    id: editingTaskId || Date.now(),
    task: capitalizeFirstLetter(document.querySelector("#task-name").value),
    description: document.querySelector("#task-description").value,
    dateStart: document.querySelector("#date-start").value,
    dateEnd: document.querySelector("#date-end").value,
    category: CreateCategory,
    status: CreateStatus,
  };

  // Validar
  if (!formData.task.trim()) {
    alert("El nombre de la tarea es obligatorio.");
    return;
  }

  if (!formData.description.trim()) {
    alert("La descripción de la tarea es obligatoria.");
    return;
  }

  if (!formData.dateStart) {
    alert("La fecha de inicio es obligatoria.");
    return;
  }

  if (!formData.dateEnd) {
    alert("La fecha de finalización es obligatoria.");
    return;
  }

  if (formData.category == "") {
    alert("La categoría es obligatoria.");
    return;
  }

  if (formData.status == "") {
    alert("El estado es obligatorio.");
    return;
  }

  // Guardar en localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (editingTaskId) {
    // Actualizar tarea existente
    tasks = tasks.map((task) => (task.id === editingTaskId ? formData : task));
  } else {
    // Agregar nueva tarea
    tasks.push(formData);
  }

  saveTasksToLocalStorage(tasks);

  // Renderizar tareas
  const listTask = document.querySelector("#list-task");
  listTask.innerHTML = "";
  tasks.forEach((task) => {
    listTask.innerHTML += taskItem(task);
  });

  // Resetear datos globales
  CreateCategory = "";
  CreateStatus = "";
  editingTaskId = null; // Resetear el ID de edición

  // Limpiar el formulario
  const form = document.querySelector(".modal__form");
  form.reset();
  setTodayDate(); // Restablecer la fecha de hoy en los campos de fecha

  // Cerrar el modal
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  // Añadir eventos a los nuevos botones de editar y eliminar
  addTaskEventListeners();
}

function addTaskEventListeners() {
  const editButtons = document.querySelectorAll(".list-task__edit");
  const deleteButtons = document.querySelectorAll(".list-task__delete");

  editButtons.forEach((button) => {
    button.addEventListener("click", handleEditTask);
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteTask);
  });
}

function handleEditTask(event) {
  const taskId = event.target.closest(".list-task__edit").dataset.id;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.id == taskId);
  if (task) {
    let Category_Edit = task.category;
    let State_Edit = task.status;

    // Mostrar el modal
    const modal_edit = document.querySelector("#modal-edit");
    modal_edit.innerHTML = taskItemEdit(task);
    modal_edit.style.display = "block";

    const span = document.getElementsByClassName("modal__close__edit")[0];

    // Eventos del modal
    span.onclick = function () {
      modal_edit.style.display = "none";
      modal_edit.firstChild.remove();
    };

    modal_edit.onclick = function (event) {
      if (event.target == modal_edit) {
        modal_edit.style.display = "none";
        modal_edit.firstChild.remove();
      }
    };

    const category_edit = document.querySelectorAll(
      ".modal__button--category__edit"
    );
    category_edit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        category_edit.forEach((c_btn) => {
          c_btn.classList.remove("modal__button--active");
        });
        e.target.classList.add("modal__button--active");
        Category_Edit = e.target.dataset.value;
      });
    });

    const status_edit = document.querySelectorAll(
      ".modal__button--state__edit"
    );
    status_edit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        status_edit.forEach((c_btn) => {
          c_btn.classList.remove("modal__button--active");
        });
        e.target.classList.add("modal__button--active");
        State_Edit = e.target.dataset.value;
      });
    });

    const taskButtonSubmit__edit = document.querySelector(
      "#task-button-submit__edit"
    );
    taskButtonSubmit__edit.addEventListener("click", (e) => {
      e.preventDefault();

      const formData = {
        id: Number(taskId), // Usar el ID existente si estamos editando
        task: capitalizeFirstLetter(
          document.querySelector("#task-name__edit").value
        ),
        description: document.querySelector("#task-description__edit").value,
        dateStart: document.querySelector("#date-start__edit").value,
        dateEnd: document.querySelector("#date-end__edit").value,
        category: Category_Edit,
        status: State_Edit,
      };

      const ind = tasks.findIndex((task) => task.id == taskId);
      tasks[ind] = formData;

      saveTasksToLocalStorage(tasks);

      const listTask = document.querySelector("#list-task");
      listTask.innerHTML = "";
      tasks.forEach((task) => {
        listTask.innerHTML += taskItem(task);
      });

      // Limpiar el formulario
      const form = document.querySelector(".modal__form");
      form.reset();
      setTodayDate(); // Restablecer la fecha de hoy en los campos de fecha

      modal_edit.style.display = "none";
      modal_edit.firstChild.remove();

      addTaskEventListeners();
    });
  }
}

function handleDeleteTask(event) {
  const taskId = event.target.closest(".list-task__delete").dataset.id;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id != taskId);
  saveTasksToLocalStorage(tasks);

  // Remover la tarea del DOM
  event.target.closest(".list-task__item").remove();
}

export function initializeTaskFilters() {
  const categoryFilterButtons = document.querySelectorAll(
    ".list-task__filter-type:nth-child(1) .list-task__button"
  );
  const stateFilterButtons = document.querySelectorAll(
    ".list-task__filter-type:nth-child(2) .list-task__button"
  );

  categoryFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryFilterButtons.forEach((btn) =>
        btn.classList.remove("list-task__button--active")
      );
      button.classList.add("list-task__button--active");
      selectedCategoryFilter =
        button.textContent.trim() === "All" ? null : button.textContent.trim();
      filterTasks();
    });
  });

  stateFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      stateFilterButtons.forEach((btn) =>
        btn.classList.remove("list-task__button--active")
      );
      button.classList.add("list-task__button--active");
      selectedStateFilter =
        button.textContent.trim() === "All" ? null : button.textContent.trim();
      filterTasks();
    });
  });
}

function filterTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter((task) => {
    const categoryMatch = selectedCategoryFilter
      ? task.category === selectedCategoryFilter
      : true;
    const stateMatch = selectedStateFilter
      ? task.status === selectedStateFilter
      : true;
    return categoryMatch && stateMatch;
  });
  renderTasks(filteredTasks);
}

function renderTasks(tasks) {
  const listTask = document.querySelector("#list-task");
  listTask.innerHTML = "";
  tasks.forEach((task) => {
    listTask.innerHTML += taskItem(task);
  });
  addTaskEventListeners();
}
