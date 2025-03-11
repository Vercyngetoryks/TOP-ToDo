import "./styles.css";
import addProject from "./addProject";
import openProject from "./openProject";
import addTask from "./addTask";
import handleProjectClick from "./handleProjectClick";
import handleTaskEvents from "./handleTaskEvents";
import handleSortChange from "./handleSortChange";
import deleteProject from "./deleteProject";

addProject();
openProject();
addTask();
handleTaskEvents();

document
  .getElementById("project-list")
  .addEventListener("click", handleProjectClick);

document
  .getElementById("sort-tasks")
  .addEventListener("change", handleSortChange);

document
  .getElementById("delete-project-btn")
  .addEventListener("click", deleteProject);
