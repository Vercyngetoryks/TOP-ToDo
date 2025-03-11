import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import renderProject from "./renderProject";
import openProject from "./openProject";

const deleteProject = () => {
  const projects = getLocalStorage("projects");
  const projectId = Number(getLocalStorage("projectId"));
  if (!confirm("Are you sure you want to delete this project?")) return;
  const filteredProjects = projects.filter(
    (project) => project.id !== projectId
  );
  const projectList = document.getElementById("project-list");
  setLocalStorage("projects", filteredProjects);
  projectList.innerHTML = "";
  openProject();
  filteredProjects.forEach((project) => renderProject(project));
};

export default deleteProject;
