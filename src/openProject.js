import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import renderTask from "./renderTask";
import editProjectName from "./editProjectName";

function openProject() {
  const projects = getLocalStorage("projects");
  const projectName = document.getElementById("current-project-title");
  const toDo = document.querySelector(".todo-container");
  const todoHeader = document.querySelector(".todo-header");
  const editProjectBtn = document.querySelector(".edit-project-name-btn");
  let project;

  if (projects.length > 0) {
    if (todoHeader) todoHeader.classList.add("visible");
    let lastProjectId = getLocalStorage("projectId");
    project = projects.find((project) => project.id === lastProjectId);
    if (!project) {
      project = projects[0];
      setLocalStorage("projectId", project.id);
    }
    projectName.textContent = project.name;
    if (project.tasks && project.tasks.length > 0) {
      renderTask(project);
    } else {
      document.querySelector(".no-project")?.remove();
      const noTask = document.createElement("div");
      noTask.classList.add("no-project");
      noTask.innerHTML = `<p>No tasks in this project</p>`;
      document.querySelector(".create-project")?.remove();
      toDo.append(noTask);
    }
  } else {
    const createProject = document.createElement("div");
    createProject.classList.add("create-project");
    createProject.innerHTML = `<p>Create Project</p>`;
    toDo.append(createProject);
    if (todoHeader) todoHeader.classList.remove("visible");
  }

  editProjectBtn.removeEventListener("click", editProjectName);
  editProjectBtn.addEventListener("click", editProjectName);
}

export default openProject;
