import getStatusIcon from "./getStatusIcon";
import getStatusColor from "./getStatusColor";
import { differenceInDays, parseISO, startOfDay } from "date-fns";

const renderTask = (project) => {
  document.querySelector(".no-project")?.remove();
  const taskList = document.getElementById("task-list");
  const projectName = document.getElementById("current-project-title");
  const toDo = document.querySelector(".todo-container");

  taskList.innerHTML = ""; // Czyści stare zadania
  projectName.textContent = project.name;

  // **Jeśli lista zadań jest pusta, dodajemy komunikat**
  if (project.tasks.length === 0) {
    const noTask = document.createElement("div");
    noTask.classList.add("no-project");
    noTask.innerHTML = `<p>No tasks in this project</p>`;
    toDo.append(noTask);
    return; // **Zatrzymujemy dalsze działanie funkcji**
  }

  project.tasks.forEach((element) => {
    const task = document.createElement("li");
    task.classList.add("task");
    task.dataset.id = element.id; // Dodanie unikalnego ID dla zadania
    task.classList.add(`priority-${element.priority}`); // Dodanie klasy do stylizacji

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = element.name;

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    const taskDesc = document.createElement("p");
    taskDesc.textContent = element.description || "No description";

    const taskDate = document.createElement("p");
    if (element.date) {
      const dueDate = parseISO(element.date);
      const today = startOfDay(new Date());
      const daysLeft = differenceInDays(dueDate, today);

      if (daysLeft < 0) {
        taskDate.innerHTML = `Due: ${
          element.date
        } <span class="overdue">(${Math.abs(daysLeft)} days overdue!)</span>`;
      } else if (daysLeft === 0) {
        taskDate.innerHTML = `Due: ${element.date} <span class="today">(Today!)</span>`;
      } else {
        taskDate.innerHTML = `Due: ${element.date} <span class="days-left">(${daysLeft} days left)</span>`;
      }
    } else {
      taskDate.textContent = "No due date";
    }

    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${element.priority}`;

    const taskOptions = document.createElement("div");
    taskOptions.classList.add("task-options");

    const taskDelBtn = document.createElement("button");
    taskDelBtn.classList.add("task-delete-btn");
    taskDelBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="task-delete-btn-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        <span id="delete-task-btn-tooltip">Delete Task</span>
    `;

    const taskEditBtn = document.createElement("button");
    taskEditBtn.classList.add("task-edit-btn");
    taskEditBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="task-edit-btn-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        <span id="edit-task-btn-tooltip">Edit Task</span>
        `;

    const taskStatusBtn = document.createElement("button");
    taskStatusBtn.classList.add("task-status-btn");
    taskStatusBtn.innerHTML = `${getStatusIcon(element.status)}`;

    // Zmieniamy kolor tła
    task.style.backgroundColor = getStatusColor(element.status);

    // **Dodanie elementów do `task`**
    taskDetails.append(taskDate, taskPriority);
    taskContainer.append(taskTitle, taskDesc, taskDetails);
    taskOptions.append(taskStatusBtn, taskEditBtn, taskDelBtn);
    task.append(taskContainer, taskOptions);
    taskList.append(task);
  });
};

export default renderTask;
