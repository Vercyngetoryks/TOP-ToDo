import getLocalStorage from "./getLocalStorage";

const editProjectName = (e) => {
  if (e.target.closest(".edit-project-name-btn")) {
    const modalProject = document.getElementById("project-modal");
    const projectNameInput = document.getElementById("project-name");
    const projects = getLocalStorage("projects");
    const projectId = getLocalStorage("projectId");
    const project = projects.find((project) => project.id === projectId);

    if (!project) return;

    projectNameInput.value = project.name;

    modalProject.dataset.projectId = projectId;

    modalProject.showModal();
  }
};

export default editProjectName;
