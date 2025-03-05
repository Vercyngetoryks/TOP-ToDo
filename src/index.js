import "./styles.css";
import addProject from "./addProject";
import openProject from "./openProject";
import addTask from "./addTask";
import handleProjectClick from "./handleProjectClick";

addProject();
openProject();
addTask();

document
  .getElementById("project-list")
  .addEventListener("click", handleProjectClick);
