import getLocalStorage from "./getLocalStorage";
import addTask from "./addTask";

const handleTaskEditClick = (e) => {
  const modalTask = document.getElementById("task-modal");
  const taskNameInput = document.getElementById("task-title");
  const taskDescInput = document.getElementById("task-desc");
  const taskDateInput = document.getElementById("task-date");
  const taskPriorityInput = document.getElementById("task-priority");

  if (!e.target.closest(".task-edit-btn")) return;

  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  const projects = getLocalStorage("projects");
  const projectId = Number(getLocalStorage("projectId"));
  const project = projects.find((project) => project.id === projectId);
  if (!project) return;

  const taskId = Number(taskEl.dataset.id);

  const task = project.tasks.find((task) => task.id === taskId);
  if (!task) return;

  // **Ustawiamy pola formularza na wartości istniejącego zadania**
  taskNameInput.value = task.name;
  taskDescInput.value = task.description || "";
  taskDateInput.value = task.date || "";
  taskPriorityInput.value = task.priority;

  // **Ustawiamy `dataset.taskId`, żeby `handleTaskSubmit` wiedział, że edytujemy**
  modalTask.dataset.taskId = taskId;

  // **Otwieramy modal i aktywujemy `addTask`**
  addTask();
  modalTask.showModal();
};

export default handleTaskEditClick;
