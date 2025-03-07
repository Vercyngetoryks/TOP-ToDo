import handleTaskAction from "./handleTaskAction";

function handleTaskEvents() {
  const taskList = document.getElementById("task-list");
  taskList.removeEventListener("click", handleTaskAction);
  taskList.addEventListener("click", handleTaskAction);
}

export default handleTaskEvents;
