import "./styles.css";
import addProject from "./addProject";
import openProject from "./openProject";
import addTask from "./addTask";
import handleProjectClick from "./handleProjectClick";
import handleTaskEvents from "./handleTaskEvents";
import handleSortChange from "./handleSortChange";

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
