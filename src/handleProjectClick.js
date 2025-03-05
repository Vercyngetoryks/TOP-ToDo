import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import renderTask from "./renderTask";

function handleProjectClick(e) {
  const projectEl = e.target.closest(".project-element");
  if (!projectEl) return;

  const projects = getLocalStorage("projects");

  const project = projects.find(
    (project) => project.id === Number(projectEl.dataset.id)
  );

  if (!project) {
    console.error("Nie znaleziono projektu o ID:", projectEl.dataset.id);
    console.error("Lista projektów w localStorage:", projects);
    return;
  }

  // **Zapisujemy ID nowego aktywnego projektu**
  setLocalStorage("projectId", project.id);

  // **Odświeżamy widok zadań**
  renderTask(project);
}

export default handleProjectClick;
