import { format } from "date-fns";
import setLocalStorage from "./setLocalStorage";
import getLocalStorage from "./getLocalStorage";
import openProject from "./openProject";

function addProject() {
  const projectList = document.getElementById("project-list");
  const taskList = document.getElementById("task-list");
  const modalProject = document.getElementById("project-modal");
  const projectForm = document.getElementById("project-form");
  const openProjectModalBtn = document.getElementById("new-project-btn");
  const closeModalBtn = document.querySelector(".close-modal");
  const projectNameInput = document.getElementById("project-name");

  let projects = getLocalStorage("projects") || [];

  // Funkcja do tworzenia nowego projektu
  const createProject = (name) => {
    return {
      id: Date.now(),
      name: name,
      tasks: [],
      createdAt: Date.now(),
    };
  };

  // **Renderowanie projektu w sidebarze (z unikalnym `data-id`)**
  const renderProject = (project) => {
    // Sprawdzenie, czy projekt już istnieje w DOM (zapobiega duplikatom)
    if (document.querySelector(`[data-id="${project.id}"]`)) return;

    const projectElement = document.createElement("li");
    projectElement.classList.add("project-element");
    projectElement.dataset.id = project.id; // ← Przypisanie ID

    const projectTitle = document.createElement("p");
    projectTitle.classList.add("project-element-name");
    projectTitle.textContent = project.name;

    const projectDate = document.createElement("p");
    projectDate.classList.add("project-element-date");
    projectDate.textContent = format(new Date(project.createdAt), "dd.MM.yyyy");

    projectElement.append(projectTitle, projectDate);
    projectList.append(projectElement);
  };

  // Obsługa otwierania modala
  openProjectModalBtn.addEventListener("click", () => {
    modalProject.showModal(); // Otwiera modal jako modal blokujący
  });

  // Obsługa zamykania modala przyciskiem
  closeModalBtn.addEventListener("click", () => {
    modalProject.close(); // Zamyka modal
  });

  // Obsługa zamykania modala przy kliknięciu na tło
  modalProject.addEventListener("click", (e) => {
    if (e.target === modalProject) modalProject.close();
  });

  // Obsługa dodawania nowego projektu
  const handleProjectSubmit = (e) => {
    e.preventDefault();

    const projectName = projectNameInput.value;
    if (!projectName) return; // Ignoruj puste wpisy

    const project = createProject(projectName);
    projects.push(project);

    // **Zapis nowego projektu do localStorage**
    setLocalStorage("projects", projects);
    setLocalStorage("projectId", project.id);

    renderProject(project);
    openProject();

    // Reset inputa i zamknięcie modala
    projectNameInput.value = "";
    taskList.textContent = "";
    modalProject.close();
  };

  // **Zapobiegamy wielokrotnemu dodawaniu eventListenera na `submit`**
  projectForm.removeEventListener("submit", handleProjectSubmit);
  projectForm.addEventListener("submit", handleProjectSubmit);

  // renderowanie danych po inicjalizacji aplikacji
  if (projects.length > 0) {
    projects.forEach((project) => {
      renderProject(project);
    });
  }
}

export default addProject;
