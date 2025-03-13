import setLocalStorage from "./setLocalStorage";
import getLocalStorage from "./getLocalStorage";
import openProject from "./openProject";
import createTask from "./createTask";
import renderCalendar from "./calendarView";

const handleTaskSubmit = (e) => {
  e.preventDefault();

  // Pobranie ID aktualnego projektu
  const projectId = Number(getLocalStorage("projectId"));
  const projects = getLocalStorage("projects");
  const project = projects.find((project) => project.id === projectId);
  if (!project) {
    alert("Projekt nie został znaleziony:", projectId);
    return;
  }

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

  // **Sprawdzamy, czy to edycja**
  const taskId = Number(modalTask.dataset.taskId) || null;

  if (taskId) {
    // **Tryb edycji**
    const task = project.tasks.find((task) => task.id === taskId);
    if (!task) return;

    task.name = taskName;
    task.description = taskDesc;
    task.date = taskDate;
    task.priority = taskPriority;
  } else {
    // **Tryb tworzenia nowego zadania**
    const task = createTask(taskName, taskDesc, taskDate, taskPriority);
    project.tasks.push(task);
  }

  // **Zapis do `localStorage`**
  setLocalStorage("projects", projects);

  // **Resetujemy `dataset.taskId`, żeby kolejne otwarcie było dla nowego taska**
  delete modalTask.dataset.taskId;

  // **Zamykamy modal i odświeżamy widok projektu**
  modalTask.close();
  openProject();
  renderCalendar(new Date());
};
export default handleTaskSubmit;
