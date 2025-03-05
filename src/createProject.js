const createProject = (name) => ({
  id: Date.now(),
  name,
  tasks: [],
  createdAt: Date.now(),
});

export default createProject;
