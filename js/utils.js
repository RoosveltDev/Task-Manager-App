const categoryColors = {
  Code: "#284ab5",
  Design: "#f8b862",
  Meeting: "#884ec5",
  Tests: "#f83567",
};

export function setTodayDate() {
  const today = new Date().toISOString().split("T")[0];
  const dateStart = document.getElementById("date-start");
  const dateEnd = document.getElementById("date-end");

  if (dateStart && dateEnd) {
    dateStart.value = today;
    dateEnd.value = today;
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const listTask = document.querySelector("#list-task");
  tasks.forEach((task) => {
    listTask.innerHTML += taskItem(task);
  });
}

export function taskItem(data) {
  const color = categoryColors[data.category] || "#000000";
  return `
      <li class="list-task__item">
        <div class="list-task__item__conteiner">
          <div class="list-task__item__information">
            <div class="list-task__item__icon" style="background-color: ${color};">
                <img class="list-task__icon" src="./assets/icons/icon-to-do-list.svg" alt="Icono de tarea">
            </div>
            <div class="list-task__item__details-text">
              <span class="list-task__item__details-text_tilte">${data.task}</span>
              <span class="list-task__item__details-text_date">${data.dateStart}</span>
            </div>
          </div>
          <div class="list-task__buttons">
            <div class="icons">
              <button type="button" class="list-task__button list-task__button--active">${data.category}</button>
              <button type="button" class="list-task__button list-task__button--active">${data.status}</button>
              <a href="#" class="list-task__edit" data-id="${data.id}" aria-label="Edit"><i class="fas fa-edit"></i></a>
              <a href="#" class="list-task__delete" data-id="${data.id}" aria-label="Delete"><i class="fas fa-trash"></i></a>
            </div>
          </div>
        </div>
      </li>
    `;
}
