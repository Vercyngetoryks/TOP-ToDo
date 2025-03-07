import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import renderTask from "./renderTask";
import addTask from "./addTask";

const handleTaskAction = (e) => {
  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  const projects = getLocalStorage("projects");
  const projectId = Number(getLocalStorage("projectId"));
  const project = projects.find((project) => project.id === projectId);
  if (!project) return;

  const taskId = Number(taskEl.dataset.id);
  const task = project.tasks.find((task) => task.id === taskId);
  if (!task) return;

  // **Obsługa usuwania zadania**
  if (e.target.closest(".task-delete-btn")) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    project.tasks = project.tasks.filter((t) => t.id !== taskId);
  }

  // **Obsługa edycji zadania**
  else if (e.target.closest(".task-edit-btn")) {
    const modalTask = document.getElementById("task-modal");
    const taskNameInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    const taskDateInput = document.getElementById("task-date");
    const taskPriorityInput = document.getElementById("task-priority");

    taskNameInput.value = task.name;
    taskDescInput.value = task.description || "";
    taskDateInput.value = task.date || "";
    taskPriorityInput.value = task.priority;

    modalTask.dataset.taskId = taskId;

    addTask();
    modalTask.showModal();
  }

  // **Obsługa zmiany statusu zadania**
  else if (e.target.closest(".task-status-btn")) {
    const statuses = ["pending", "in-progress", "completed"];
    const currentIndex = statuses.indexOf(task.status);
    task.status = statuses[(currentIndex + 1) % statuses.length]; // Cykl statusów
  }

  // **Zapisujemy zmiany do localStorage i renderujemy ponownie zadania**
  setLocalStorage("projects", projects);
  renderTask(project);
};

export default handleTaskAction;
