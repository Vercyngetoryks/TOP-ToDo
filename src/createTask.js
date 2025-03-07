const createTask = (name, description, date, priority) => ({
  id: Date.now(), // Unikalne ID
  name,
  description,
  date,
  priority,
  status: "pending", // Dodajemy domyślną wartość dla statusu
});

export default createTask;
