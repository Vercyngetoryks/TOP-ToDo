import handleTaskStatusClick from "./handleTaskStatusClick";

const toggleTaskStatus = () => {
  const taskList = document.getElementById("task-list");
  taskList.removeEventListener("click", handleTaskStatusClick);
  taskList.addEventListener("click", handleTaskStatusClick);
};

export default toggleTaskStatus;
