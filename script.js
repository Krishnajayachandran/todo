const projects = []; // Store projects here

// Add a project
document.getElementById('NewProject').addEventListener('click', () => {
  const PROJECTTITLE = document.getElementById('PROJECTTITLE').value;
  if (PROJECTTITLE) {
    const project = {
      id: Date.now(),
      title: PROJECTTITLE,
      todos: [],
    };
    projects.push(project);
    renderProjects();
    document.getElementById('PROJECTTITLE').value = '';
  }
});

// Render projects
function renderProjects() {
  const projectsDiv = document.getElementById('projects');
  projectsDiv.innerHTML = ''; // Clear previous content

  projects.forEach(project => {
    // Calculate task summary
    const totalTasks = project.todos.length; // Total tasks in the project
    const pendingTasks = project.todos.filter(todo => !todo.completed).length; // Pending tasks

    // Create project div
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';
    projectDiv.innerHTML = `
      <h2>${project.title}</h2>
      <p><strong>Summary:</strong> ${pendingTasks} pending out of ${totalTasks} tasks</p>
      <input type="text" id="todo-${project.id}" placeholder="Enter todo">
      <button onclick="addTodo(${project.id})">Add Todo</button>
      <ul>
        ${project.todos
          .map(
            todo =>
              `<li>${todo.text} - ${todo.completed ? 'Completed' : 'Pending'}
                <button onclick="markCompleted(${project.id}, ${todo.id})">Complete</button>
              </li>`
          )
          .join('')}
      </ul>
    `;
    projectsDiv.appendChild(projectDiv); // Append project to projects div
  });
}


// Add a todo
function addTodo(projectId) {
  const todoInput = document.getElementById(`todo-${projectId}`);
  const todoText = todoInput.value;
  if (todoText) {
    const project = projects.find(p => p.id === projectId);
    project.todos.push({ id: Date.now(), text: todoText, completed: false });
    renderProjects();
  }
}

// Mark a todo as completed
function markCompleted(projectId, todoId) {
  const project = projects.find(p => p.id === projectId);
  const todo = project.todos.find(t => t.id === todoId);
  todo.completed = true;
  renderProjects();
}

