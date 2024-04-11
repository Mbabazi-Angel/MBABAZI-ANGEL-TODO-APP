let todos = [];

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        todos.push({ text: todoText, done: false });
        displayTodos();
        todoInput.value = '';
    }
}

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

function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodos();
}

function editTodo(index) {
    const newText = prompt('Enter new text:');
    if (newText !== null && newText.trim() !== '') {
        todos[index].text = newText.trim();
        displayTodos();
    }
}

function toggleDone(index) {
    todos[index].done = !todos[index].done;
    displayTodos();
}

displayTodos();

