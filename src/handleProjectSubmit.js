import setLocalStorage from "./setLocalStorage";
import getLocalStorage from "./getLocalStorage";
import openProject from "./openProject";
import createProject from "./createProject";
import renderProject from "./renderProject";

const handleProjectSubmit = (e) => {
  e.preventDefault();

  const projectNameInput = document.getElementById("project-name");
  const modalProject = document.getElementById("project-modal");

  let projects = getLocalStorage("projects") || [];

  const projectName = projectNameInput.value.trim();
  if (!projectName) return;

  // **Sprawdzamy, czy to edycja**
  const projectId = Number(modalProject.dataset.projectId) || null;

  let project;

  if (projectId) {
    // **Tryb edycji**
    project = projects.find((project) => project.id === projectId);
    if (!project) return;

    project.name = projectName;
  } else {
    project = createProject(projectName);
    projects.push(project);
    setLocalStorage("projectId", project.id); // Nowy projekt powinien być aktywny
    renderProject(project);
  }

  // **Zapisujemy nowy projekt**
  setLocalStorage("projects", projects);

  // **Odświeżamy widok**
  openProject();

  // **Reset inputa i zamknięcie modala**
  projectNameInput.value = "";
  delete modalProject.dataset.projectId; // Usuwamy flagę edycji
  modalProject.close();
};

export default handleProjectSubmit;
