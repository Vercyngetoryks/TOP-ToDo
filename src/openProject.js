import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";

function openProject() {
  const projects = getLocalStorage("projects");
  const projectName = document.getElementById("current-project-title");
  const toDo = document.querySelector(".todo-container");
  const modalTask = document.getElementById("task-modal");
  const openTaskModalBtn = document.getElementById("new-task-btn");
  const closeModalBtn = document.querySelector(".close-modal-task");

  if (projects.length > 0) {
    let lastProjectId = getLocalStorage("projectId");
    let project = projects.find((project) => project.id === lastProjectId);
    if (!project) {
      // Jeśli ID nie istnieje w `projects`, wybierz pierwszy projekt
      project = projects[0];
      setLocalStorage("projectId", project.id); // Ustaw nowe ID w localStorage
    }
    projectName.textContent = project.name;
    if (project.tasks && project.tasks.length > 0) {
      renderTask(project);
    } else {
      document.querySelector(".no-project")?.remove();
      const noTask = document.createElement("div");
      noTask.classList.add("no-project");
      noTask.innerHTML = `
        <p>No tasks in this project</p>`;
      document.querySelector(".create-project")?.remove();
      toDo.append(noTask);
    }
  } else {
    const createProject = document.createElement("div");
    createProject.classList.add("create-project");
    createProject.innerHTML = `
    <p>Create Project</p>`;
    toDo.append(createProject);
  }

  // Obsługa otwierania modala
  openTaskModalBtn.addEventListener("click", () => {
    modalTask.showModal();
  });

  // Obsługa zamykania modala przyciskiem
  closeModalBtn.addEventListener("click", () => {
    modalTask.close(); // Zamyka modal
  });

  // Obsługa zamykania modala przy kliknięciu na tło
  modalTask.addEventListener("click", (e) => {
    if (e.target === modalTask) modalTask.close();
  });
}

const handleProjectClick = (e) => {
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

  setLocalStorage("projectId", project.id); // Ustaw nowe ID w localStorage
  renderTask(project);
};

document
  .getElementById("project-list")
  .removeEventListener("click", handleProjectClick);
document
  .getElementById("project-list")
  .addEventListener("click", handleProjectClick);

const renderTask = (project) => {
  document.querySelector(".no-project")?.remove();
  const taskList = document.getElementById("task-list");
  const projectName = document.getElementById("current-project-title");
  taskList.innerHTML = ""; // Czyści stare zadania
  project.tasks.forEach((element) => {
    const task = document.createElement("li");
    task.classList.add("task");
    task.textContent = element;
    taskList.append(task);
  });
  projectName.textContent = project.name;
};

export default openProject;
