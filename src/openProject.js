import getLocalStorage from "./getLocalStorage";
import setLocalStorage from "./setLocalStorage";
import addTask from "./addTask";

function openProject() {
  const projects = getLocalStorage("projects");
  const projectName = document.getElementById("current-project-title");
  const toDo = document.querySelector(".todo-container");
  let project;

  if (projects.length > 0) {
    let lastProjectId = getLocalStorage("projectId");
    project = projects.find((project) => project.id === lastProjectId);
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
  projectName.textContent = project.name;

  // **Jeśli lista zadań jest pusta, dodajemy komunikat**
  if (project.tasks.length === 0) {
    const noTask = document.createElement("div");
    noTask.classList.add("no-project");
    noTask.innerHTML = `<p>No tasks in this project</p>`;
    taskList.append(noTask);
    return; // **Zatrzymujemy dalsze działanie funkcji**
  }

  project.tasks.forEach((element) => {
    const task = document.createElement("li");
    task.classList.add("task");
    task.dataset.id = element.id; // Dodanie unikalnego ID dla zadania
    task.classList.add(`priority-${element.priority}`); // Dodanie klasy do stylizacji

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = element.name;

    const taskDesc = document.createElement("p");
    taskDesc.textContent = element.description || "No description";

    const taskDate = document.createElement("p");
    taskDate.textContent = element.date
      ? `Due: ${element.date}`
      : "No due date";

    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${element.priority}`;

    // **Dodanie elementów do `task`**
    task.append(taskTitle, taskDesc, taskDate, taskPriority);
    taskList.append(task);
  });
};

export default openProject;
