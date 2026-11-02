interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
let currentFilter: string = "all";

const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const itemsLeft = document.getElementById("itemsLeft") as HTMLElement;
const clearCompletedBtn = document.getElementById("clearCompletedBtn") as HTMLButtonElement;
const clearAllBtn = document.getElementById("clearAllBtn") as HTMLButtonElement;
const filterBtns = document.querySelectorAll(".filter-btn");

// Add Todo Function
function addTodo(): void {
  const text: string = todoInput.value.trim();
  if (text === "") return;

  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  todoInput.value = "";
  renderTodos();
}

// Render Todos Function using Array methods (.filter, .map)
function renderTodos(): void {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true; // "all"
  });

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${todo.id}" class="toggle-checkbox">
        <span class="task-text" data-id="${todo.id}">${todo.text}</span>
      </div>
      <button class="delete-btn" data-id="${todo.id}">🗑️</button>
    `;

    todoList.appendChild(li);
  });

  // Update items left count
  const activeCount = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = `${activeCount} items left`;
}

// Event delegation for toggling, deleting, and editing
todoList.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const id = Number(target.getAttribute("data-id"));

  if (target.classList.contains("toggle-checkbox")) {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    renderTodos();
  }

  if (target.classList.contains("delete-btn")) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
});

// Double click to edit feature (Tip: double-click a todo to edit)
todoList.addEventListener("dblclick", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("task-text")) {
    const id = Number(target.getAttribute("data-id"));
    const currentText = target.textContent || "";
    
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";
    
    target.replaceWith(input);
    input.focus();

    input.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const newText = input.value.trim();
        if (newText !== "") {
          todos = todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo);
        }
        renderTodos();
      }
    });
  }
});

// Filter button events
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter") || "all";
    renderTodos();
  });
});

// Clear completed & Clear all buttons
clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
});

clearAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

// Event listeners for adding tasks
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") addTodo();
});