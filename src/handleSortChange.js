import sortTasks from "./sortTasks";
import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import renderTask from "./renderTask";

const handleSortChange = (e) => {
  const selectedSort = e.target.value;
  const projectId = Number(getLocalStorage("projectId"));
  const projects = getLocalStorage("projects");
  const project = projects.find((project) => project.id === projectId);
  if (!project) return;

  project.tasks = sortTasks(project.tasks, selectedSort);

  setLocalStorage("projects", projects); // Zapisujemy sortowanie
  renderTask(project);
};

export default handleSortChange;
