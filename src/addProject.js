import handleProjectSubmit from "./handleProjectSubmit";
import getLocalStorage from "./getLocalStorage";
import renderProject from "./renderProject";

function addProject() {
  const modalProject = document.getElementById("project-modal");
  const projectForm = document.getElementById("project-form");
  const openProjectModalBtn = document.getElementById("new-project-btn");
  const closeModalBtn = document.querySelector(".close-modal");

  let projects = getLocalStorage("projects") || [];

  // **Obsługa otwierania modala**
  openProjectModalBtn.addEventListener("click", () => {
    modalProject.showModal();
  });

  // **Obsługa zamykania modala**
  closeModalBtn.addEventListener("click", () => modalProject.close());
  modalProject.addEventListener("click", (e) => {
    if (e.target === modalProject) modalProject.close();
  });

  // **Obsługa `submit` formularza**
  projectForm.removeEventListener("submit", handleProjectSubmit);
  projectForm.addEventListener("submit", handleProjectSubmit);

  // **Renderowanie zapisanych projektów po starcie**
  projects.forEach((project) => renderProject(project));
}

export default addProject;
