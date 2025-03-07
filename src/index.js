import "./styles.css";
import addProject from "./addProject";
import openProject from "./openProject";
import addTask from "./addTask";
import handleProjectClick from "./handleProjectClick";
import editTask from "./editTask";
import deleteTask from "./deleteTask";
import toggleTaskStatus from "./toggleTaskStatus";

addProject();
openProject();
addTask();
editTask();
deleteTask();
toggleTaskStatus();

document
  .getElementById("project-list")
  .addEventListener("click", handleProjectClick);
