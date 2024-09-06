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
              <span class="list-task__item__details-text_date">${data.dateEnd}</span>
            </div>
            <div class="list-task__item__details-des">
              <p class="list-task__item__details-text_date">${data.description}</p>
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

export function taskItemEdit(data) {
  return `
          <div class="modal__content">
              <span class="modal__close modal__close__edit">&times;</span>
              <h2 class="modal__title">Edit Task</h2>
              <form class="modal__form">
                  <label for="task-name__edit" class="modal__label">Task Name:</label>
                  <input type="text" id="task-name__edit" class="modal__input" value='${
                    data.task
                  }' required>
  
                  <label for="task-description__edit" class="modal__label">Task Description:</label>
                  <textarea id="task-description__edit" class="modal__input" required>${
                    data.description
                  }</textarea>
  
                  <label for="date-start__edit" class="modal__label">Start date:</label>
                  <input type="date" id="date-start__edit" class="modal__input" value='${
                    data.dateStart
                  }' required>
  
                  <label for="date-end__edit" class="modal__label">Final date:</label>
                  <input type="date" id="date-end__edit" class="modal__input" value='${
                    data.dateEnd
                  }' required>
  
                  <label class="modal__label">Category:</label>
                  <div class="modal__button-group" id="task-category">
                      <button type="button" class="modal__button modal__button--category__edit ${
                        data.category == "Code" ? "modal__button--active" : null
                      }" data-value="Code">Code</button>
                      <button type="button" class="modal__button modal__button--category__edit ${
                        data.category == "Design"
                          ? "modal__button--active"
                          : null
                      }" data-value="Design">Design</button>
                      <button type="button" class="modal__button modal__button--category__edit ${
                        data.category == "Meeting"
                          ? "modal__button--active"
                          : null
                      }" data-value="Meeting">Meeting</button>
                      <button type="button" class="modal__button modal__button--category__edit ${
                        data.category == "Tests"
                          ? "modal__button--active"
                          : null
                      }" data-value="Tests">Tests</button>
                  </div>
  
                  <label class="modal__label">State:</label>
                  <div class="modal__button-group" id="task-state">
                      <button type="button" class="modal__button modal__button--state__edit ${
                        data.status == "Pending"
                          ? "modal__button--active"
                          : null
                      }" data-value="Pending">Pending</button>
                      <button type="button" class="modal__button modal__button--state__edit ${
                        data.status == "In Progress"
                          ? "modal__button--active"
                          : null
                      }" data-value="In Progress">In progress</button>
                      <button type="button" class="modal__button modal__button--state__edit ${
                        data.status == "Ready" ? "modal__button--active" : null
                      }" data-value="Ready">Ready</button>
                  </div>
  
                  <button type="submit" id="task-button-submit__edit" class="modal__button modal__button--submit">Edit Task</button>
              </form>
          </div>`;
}

export function formatDateToMMMYYYY(date) {
  const options = { year: "numeric", month: "short" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
