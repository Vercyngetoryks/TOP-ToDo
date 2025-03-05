import { format } from "date-fns";

const renderProject = (project) => {
  const projectList = document.getElementById("project-list");

  // Zapobieganie duplikatom
  if (document.querySelector(`[data-id="${project.id}"]`)) return;

  const projectElement = document.createElement("li");
  projectElement.classList.add("project-element");
  projectElement.dataset.id = project.id;

  const projectTitle = document.createElement("p");
  projectTitle.classList.add("project-element-name");
  projectTitle.textContent = project.name;

  const projectDate = document.createElement("p");
  projectDate.classList.add("project-element-date");
  projectDate.textContent = format(new Date(project.createdAt), "dd.MM.yyyy");

  projectElement.append(projectTitle, projectDate);
  projectList.append(projectElement);
};

export default renderProject;
