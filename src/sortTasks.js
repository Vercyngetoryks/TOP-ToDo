const sortTasks = (tasks, criteria) => {
  return tasks.sort((a, b) => {
    if (criteria === "priority") {
      const order = { high: 3, medium: 2, low: 1 };
      return order[b.priority] - order[a.priority]; // Sortowanie malejąco
    }
    if (criteria === "status") {
      const order = { pending: 1, "in-progress": 2, completed: 3 };
      return order[a.status] - order[b.status]; // Sortowanie rosnąco
    }
    if (criteria === "dueDate") {
      return new Date(a.date) - new Date(b.date); // Najbliższy deadline na górze
    }
    return 0;
  });
};

export default sortTasks;
