import setLocalStorage from "./setLocalStorage";
import getLocalStorage from "./getLocalStorage";
import openProject from "./openProject";

const modalTask = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const openTaskModalBtn = document.getElementById("new-task-btn");
const closeModalBtn = document.querySelector(".close-modal-task");
const taskNameInput = document.getElementById("task-title");
const taskDescInput = document.getElementById("task-desc");
const taskDateInput = document.getElementById("task-date");
const taskPriorityInput = document.getElementById("task-priority");

function addTask() {
  // Obsługa dodawania nowego zadania
  const handleTaskSubmit = (e) => {
    e.preventDefault();

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

  // Zapobiegamy wielokrotnemu dodawaniu eventListenera
  taskForm.removeEventListener("submit", handleTaskSubmit);
  taskForm.addEventListener("submit", handleTaskSubmit);
}

// Obsługa otwierania i zamykania modala
openTaskModalBtn.addEventListener("click", () => modalTask.showModal());
closeModalBtn.addEventListener("click", () => modalTask.close());
modalTask.addEventListener("click", (e) => {
  if (e.target === modalTask) modalTask.close();
});

// Funkcja do tworzenia obiektu zadania
const createTask = (name, description, date, priority) => ({
  id: Date.now(), // Dodanie unikalnego ID dla zadania
  name,
  description,
  date,
  priority,
});

export default addTask;
