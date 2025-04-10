const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const taskCount = document.getElementById('task-count');

let todos = JSON.parse(localStorage.getItem('devTodos')) || [];

function saveTodos() {
  localStorage.setItem('devTodos', JSON.stringify(todos));
}

function updateTaskCount() {
  const remaining = todos.filter(todo => !todo.completed).length;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''}`;
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'todo-checkbox';

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) span.classList.add('done');

    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
  });
  updateTaskCount();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    input.value = '';
    saveTodos();
    renderTodos();
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') input.value = '';
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
});

renderTodos();
