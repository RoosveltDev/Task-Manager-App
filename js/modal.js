import { setTodayDate } from "./utils.js";

export function initializeModal() {
  const modal = document.getElementById("modal");
  const btn = document.getElementById("button-new-task");
  const span = document.getElementsByClassName("modal__close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
    setTodayDate();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
