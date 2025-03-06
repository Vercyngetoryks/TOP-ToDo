import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import renderTask from "./renderTask";

const handleTaskDeleteClick = (e) => {
  if (!e.target.closest(".task-delete-btn")) return;

  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  const projects = getLocalStorage("projects");
  const projectId = Number(getLocalStorage("projectId"));
  const project = projects.find((project) => project.id === projectId);
  if (!project) return;

  const taskId = Number(taskEl.dataset.id);

  // Dodajemy potwierdzenie usunięcia
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  project.tasks = project.tasks.filter((task) => task.id !== taskId);

  setLocalStorage("projects", projects);
  renderTask(project);
};

export default handleTaskDeleteClick;
