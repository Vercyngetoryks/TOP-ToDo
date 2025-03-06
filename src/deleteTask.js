import handleTaskDeleteClick from "./handleTaskDeleteClick";

function deleteTask() {
  const taskList = document.getElementById("task-list");
  taskList.removeEventListener("click", handleTaskDeleteClick);
  taskList.addEventListener("click", handleTaskDeleteClick);
}

export default deleteTask;
