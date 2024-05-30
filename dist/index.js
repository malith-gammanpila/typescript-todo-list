"use strict";
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.appendChild(wrapper);
const textInput = document.createElement('input');
textInput.type = 'text';
textInput.placeholder = 'Enter something here';
wrapper.appendChild(textInput);
const button = document.createElement('button');
button.textContent = 'Add';
wrapper.appendChild(button);
const list = document.createElement('ul');
wrapper.appendChild(list);
const storedTodos = localStorage.getItem('todos');
const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
const todos = parsedTodos;
const renderTodo = (todo) => {
    const listItem = document.createElement('li');
    const liWrapper = document.createElement('div');
    liWrapper.style.display = 'flex';
    const textSpan = document.createElement('span');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        todo.done = checkbox.checked;
        textSpan.style.textDecoration = todo.done ? 'line-through' : 'none';
        localStorage.setItem('todos', JSON.stringify(todos));
    });
    textSpan.textContent = todo.text;
    checkbox.checked = todo.done;
    textSpan.style.textDecoration = todo.done ? 'line-through' : 'none';
    liWrapper.appendChild(textSpan);
    liWrapper.appendChild(checkbox);
    listItem.appendChild(liWrapper);
    list.appendChild(listItem);
};
const renderTodos = (todos) => {
    list.innerHTML = '';
    todos.forEach(renderTodo);
};
renderTodos(todos);
button.addEventListener('click', () => {
    const text = textInput.value;
    textInput.value = ''; // reset the input field
    const todo = {
        text,
        done: false,
    };
    todos.push(todo);
    renderTodo(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
});
