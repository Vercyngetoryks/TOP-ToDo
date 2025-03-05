import setLocalStorage from "./setLocalStorage";
import getLocalStorage from "./getLocalStorage";
import openProject from "./openProject";
import createTask from "./createTask";

const handleTaskSubmit = (e) => {
  e.preventDefault();

  const taskNameInput = document.getElementById("task-title");
  const taskDescInput = document.getElementById("task-desc");
  const taskDateInput = document.getElementById("task-date");
  const taskPriorityInput = document.getElementById("task-priority");
  const modalTask = document.getElementById("task-modal");

  const taskName = taskNameInput.value.trim();
  if (!taskName) return; // Ignoruj puste wpisy

  const taskDesc = taskDescInput.value.trim();
  const taskDate = taskDateInput.value;
  const taskPriority = taskPriorityInput.value;

  const task = createTask(taskName, taskDesc, taskDate, taskPriority);

  // Pobranie ID aktualnego projektu
  const projectId = Number(getLocalStorage("projectId"));
  const projects = getLocalStorage("projects");

  const project = projects.find((project) => project.id === projectId);

  if (!project) {
    console.error("Projekt nie został znaleziony:", projectId);
    return;
  }

  // Dodanie zadania do projektu i zapis do localStorage
  project.tasks.push(task);
  setLocalStorage("projects", projects);

  // Reset inputów
  taskNameInput.value = "";
  taskDescInput.value = "";
  taskDateInput.value = "";
  taskPriorityInput.value = "low";

  // Zamknięcie modala i odświeżenie widoku projektu
  modalTask.close();
  openProject();
};

export default handleTaskSubmit;
