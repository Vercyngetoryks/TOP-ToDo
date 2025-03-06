import handleTaskEditClick from "./handleTaskEditClick";

function editTask() {
  const taskList = document.getElementById("task-list");
  taskList.removeEventListener("click", handleTaskEditClick);
  taskList.addEventListener("click", handleTaskEditClick);
}

export default editTask;
