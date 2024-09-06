import { initializeModal } from "./modal.js";
import {
  initializeTasks,
  handleFormSubmit,
  initializeTaskFilters,
} from "./tasks.js";
import { setTodayDate } from "./utils.js";

// Inicializar el modal
initializeModal();

// Inicializar las tareas
initializeTasks();

// Inicializar los filtros de tareas
initializeTaskFilters();

// Obtener el formulario y añadir un evento de submit
const form = document.querySelector(".modal__form");
form.addEventListener("submit", handleFormSubmit);

// Establecer la fecha de hoy en los campos de fecha al cargar la página
document.addEventListener("DOMContentLoaded", setTodayDate);
