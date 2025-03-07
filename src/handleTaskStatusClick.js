import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import renderTask from "./renderTask";
import getStatusColor from "./getStatusColor";

const handleTaskStatusClick = (e) => {
  if (!e.target.closest(".task-status-btn")) return;

  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  const projects = getLocalStorage("projects");
  const projectId = Number(getLocalStorage("projectId"));
  const project = projects.find((project) => project.id === projectId);
  if (!project) return;

  const taskId = Number(taskEl.dataset.id);

  const task = project.tasks.find((task) => task.id === taskId);
  if (!task) return;

  const statuses = ["pending", "in-progress", "completed"];

  const currentIndex = statuses.indexOf(task.status);

  task.status = statuses[(currentIndex + 1) % statuses.length]; // Cykl statusów

  setLocalStorage("projects", projects);
  renderTask(project);
};

export default handleTaskStatusClick;
