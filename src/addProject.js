import { format } from "date-fns";
import setLocalStorage from "./setLocalStorage";
import getLocalStorage from "./getLocalStorage";
import openProject from "./openProject";

function addProject() {
  const projectList = document.getElementById("project-list");
  const modalProject = document.getElementById("project-modal");
  const openProjectModalBtn = document.getElementById("new-project-btn");
  const closeModalBtn = document.querySelector(".close-modal");
  const projectNameInput = document.getElementById("project-name");

  let projects = getLocalStorage("projects") || [];
  let selectedProjectId;

  // Funkcja do tworzenia nowego projektu
  const createProject = (name) => {
    return {
      id: Date.now(),
      name: name,
      tasks: [],
      createdAt: Date.now(),
    };
  };

  // Renderowanie projektu w sidebarze
  const renderProject = (project) => {
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
  modalProject.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = projectNameInput.value;
    if (!projectName) return; // Ignoruj puste wpisy

    const project = createProject(projectName);
    projects.push(project);
    selectedProjectId = project.id;

    renderProject(project);
    setLocalStorage("projects", projects);
    setLocalStorage("projectId", selectedProjectId);

    // Reset inputa
    projectNameInput.value = "";

    openProject();

    modalProject.close();
  });

  // renderowanie danych po inicjalizacji aplikacji
  if (projects.length > 0) {
    projects.forEach((project) => {
      renderProject(project);
    });
  }
}

export default addProject;
