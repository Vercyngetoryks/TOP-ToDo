import handleTaskSubmit from "./handleTaskSubmit";

function addTask() {
  const modalTask = document.getElementById("task-modal");
  const taskForm = document.getElementById("task-form");
  const openTaskModalBtn = document.getElementById("new-task-btn");
  const closeModalBtn = document.querySelector(".close-modal-task");

  // **Obsługa otwierania i zamykania modala**
  openTaskModalBtn.addEventListener("click", () => modalTask.showModal());
  closeModalBtn.addEventListener("click", () => modalTask.close());
  modalTask.addEventListener("click", (e) => {
    if (e.target === modalTask) modalTask.close();
  });

  // **Obsługa `submit` formularza**
  taskForm.removeEventListener("submit", handleTaskSubmit);
  taskForm.addEventListener("submit", handleTaskSubmit);
}

export default addTask;
