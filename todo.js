let todos = [];
//To retain the tasks even after page is refreshed
// Load todos from local storage when the page is loaded
window.onload = function() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        displayTodos();
    }
};

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        todos.push({ text: todoText, done: false });
        saveTodosToLocalStorage();
        displayTodos();
        todoInput.value = '';
    }
}
//call the function with stored tasks
function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//display the tasks
function displayTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
            <input type="checkbox" onchange="toggleDone(${index})" ${todo.done ? 'checked' : ''}>
            <span class="${todo.done ? 'done' : ''}">${todo.text}</span>
            <div class="todo-actions">
                <button onclick="editTodo(${index})">Edit</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            </div>
        `;
        todoList.appendChild(listItem);
    });
}

//delete tasks
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodosToLocalStorage();
    displayTodos();
}

//edit tasks
function editTodo(index) {
    const newText = prompt('Enter new text:');
    if (newText !== null && newText.trim() !== '') {
        todos[index].text = newText.trim();
        saveTodosToLocalStorage();
        displayTodos();
    }
}

function toggleDone(index) {
    todos[index].done = !todos[index].done;
    saveTodosToLocalStorage();
    displayTodos();
}