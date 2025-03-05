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

  const project = createProject(projectName);
  projects.push(project);

  // **Zapisujemy nowy projekt**
  setLocalStorage("projects", projects);
  setLocalStorage("projectId", project.id);

  // **Renderowanie nowego projektu**
  renderProject(project);
  openProject();

  // **Reset inputa i zamknięcie modala**
  projectNameInput.value = "";
  modalProject.close();
};

export default handleProjectSubmit;
